"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SignUpProps {
    fullName: string; 
    email: string;
    password: string;
    confirmPassword: string;
}

const useSignUp = (
    initalValue: SignUpProps = {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    }
) => {
    const [values, setValues] = useState<SignUpProps>(initalValue);
    const [errors, setErrors] = useState<Partial<SignUpProps>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const router = useRouter();

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const validateError = (values: SignUpProps) => {
        const errors: Partial<SignUpProps> = {};

        if (!values.fullName) errors.fullName = "Full Name is Required";
        if (!values.email) errors.email = "Email is Required";
        if (!values.password) errors.password = "Password is Required";
        if (values.password !== values.confirmPassword) errors.confirmPassword = "Password Does Not Match";

        return errors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((preValues: SignUpProps) => ({ ...preValues, [name]: value }));
        if (errors[name as keyof SignUpProps]) {
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[name as keyof SignUpProps];
                return newErrors;
            });
        }
        setApiError(null);
    };

    const resetForm = () => {
        setValues(initalValue);
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
                const response = await fetch(`${API_BASE_URL}/auth/register-student`, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: values.fullName,
                        email: values.email,
                        password: values.password,
                    }),
                });

                const responseData = await response.json(); 

                if (response.ok) { 
                    router.push('/login');
                    resetForm();
                } else {
                    let errorMessage = 'Registration failed. Please try again.';
                    if (response.status === 409) {
                        errorMessage = responseData.message || 'User with this email already exists.';
                    } else if (response.status === 400) {
                        errorMessage = responseData.message || 'Validation error. Please check your inputs.';
                    } else if (responseData.message) {
                        errorMessage = responseData.message;
                    }
                    setApiError(errorMessage);
                }
            } catch (error) {
                console.error("Error during registration:", error);
                setApiError("An unexpected error occurred. Please check your network and try again.");
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
        apiError
    };
};

export default useSignUp;
