"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SignInProps {
    email: string;
    password: string;
    rememberMe: boolean;
}

let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: any) => void; }[] = [];

const processQueue = (error: any | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const useSignIn = (
    initalValues: SignInProps = {
        email: "",
        password: "",
        rememberMe: false
    }
) => {
    const [values, setValues] = useState<SignInProps>(initalValues);
    const [errors, setErrors] = useState<Partial<SignInProps>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const router = useRouter();

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const getAccessToken = (): string | null => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('accessToken');
        }
        return null;
    };

    const getRefreshToken = (): string | null => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('refreshToken');
        }
        return null;
    };

    interface Tokens {
        accessToken: string;
        refreshToken: string;
    }

    const setTokens = ({ accessToken, refreshToken }: Tokens): void => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('refreshToken', refreshToken);
        }
    };

    const clearAuthData = (): void => {
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
            sessionStorage.removeItem('currentUser');
        }
    };

    const redirectToLogin = (): void => {
        clearAuthData();
        if (typeof window !== 'undefined') {
            router.push('/signin');
        }
    };

    const authenticatedFetch = async (
        input: RequestInfo | URL,
        init?: RequestInit
    ): Promise<Response> => {
        let headers = new Headers(init?.headers);
        const accessToken = getAccessToken();

        if (accessToken && !headers.has('Authorization')) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }

        const config: RequestInit = { ...init, headers };

        try {
            let response = await fetch(input, config);

            if (response.status === 401) {
                const originalRequest = { input, config };
                const refreshToken = getRefreshToken();

                if (!refreshToken) {
                    redirectToLogin();
                    return Promise.reject(new Error("No refresh token available. Redirecting to login."));
                }

                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    }).then(token => {
                        if (token) {
                            (originalRequest.config.headers as Headers).set('Authorization', `Bearer ${token}`);
                            return fetch(originalRequest.input, originalRequest.config);
                        }
                        throw new Error("Token refresh failed in queue. Redirecting.");
                    }).catch(err => {
                        return Promise.reject(err);
                    });
                }

                isRefreshing = true;

                try {
                    const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, { 
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ refreshToken }),
                    });

                    if (refreshResponse.ok) {
                        const data = await refreshResponse.json();
                        const newAccessToken = data.accessToken;
                        const newRefreshToken = data.refreshToken;

                        if (newAccessToken && newRefreshToken) {
                            setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken });
                            (originalRequest.config.headers as Headers).set('Authorization', `Bearer ${newAccessToken}`);

                            processQueue(null, newAccessToken);
                            return fetch(originalRequest.input, originalRequest.config);
                        } else {
                            throw new Error("Token refresh response did not contain new access or refresh tokens.");
                        }
                    } else {
                        throw new Error("Refresh token invalid or expired.");
                    }
                } catch (refreshError) {
                    console.error("Failed to refresh token:", refreshError);
                    clearAuthData();
                    redirectToLogin();
                    processQueue(refreshError);
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            return response;
        } catch (error) {
            console.error("API client network error:", error);
            return Promise.reject(error);
        }
    };

    const validateError = (values: SignInProps) => {
        const errors: Partial<SignInProps> = {};
        if (!values.email) errors.email = "Email is Required";
        if (!values.password) errors.password = "Password is Required";
        return errors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setValues((preValues: SignInProps) => ({ ...preValues, [name]: newValue }));
        if (errors[name as keyof SignInProps]) {
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[name as keyof SignInProps];
                return newErrors;
            });
        }
        setApiError(null);
    };

    const resetForm = () => {
        setValues(initalValues);
        setErrors({});
        setApiError(null);
    };

    const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setApiError(null);

        const validationErrors = validateError(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/auth/login-student`, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: values.email,
                        password: values.password,
                    }),
                });

                if (!response.ok) {
                    let errorMessage = 'Login failed. Please try again.';
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.message || `Error ${response.status}: ${response.statusText}`;
                    } catch (jsonParseError) {
                        const textResponse = await response.text();
                        console.error("API did not return JSON for login error. Full response:", textResponse);
                        errorMessage = `Server responded with status ${response.status} ${response.statusText}. Please check backend logs and URL.`;
                    }
                    setApiError(errorMessage);
                } else {
                    const responseData = await response.json();

                    if (!responseData.accessToken || !responseData.refreshToken) {
                        setApiError("Login successful, but missing tokens.");
                        return;
                    }

                    setTokens({
                        accessToken: responseData.accessToken,
                        refreshToken: responseData.refreshToken
                    });

                    if (responseData.user) {
                        sessionStorage.setItem('currentUser', JSON.stringify(responseData.user));
                    }

                    resetForm();
                    router.push('/courses');
                }

            } catch (networkError) {
                console.error("Error during sign-in:", networkError);
                setApiError("Failed to connect to the server. Please check your internet connection or try again later.");
            } finally {
                setIsLoading(false);
            }
        } else {
            setApiError("Invalid Submission: Please correct the errors and try again.");
        }
    };

    return {
        handleChange,
        errors,
        values,
        resetForm,
        handleSubmit,
        isLoading,
        apiError,
        authenticatedFetch
    };
};

export default useSignIn;
