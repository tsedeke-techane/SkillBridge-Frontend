"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import useSignUp from "@/app/[locale]/components/hooks/useSignUp";
import { Input } from "@/app/[locale]/components/ui/input";
import { Label } from "@/app/[locale]/components/ui/label";
import { Button } from "@/app/[locale]/components/ui/button";

const SignUp: React.FC = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { handleChange, errors, values, handleSubmit, isLoading, apiError } = useSignUp();
  const handlePasswordToggle = () => setShow((prev) => !prev);
  const handleGoBack = () => {
    router.back();
  };

  return (
    <section className='min-h-screen flex flex-col md:flex-row overflow-hidden relative'>

      <button
        onClick={handleGoBack}
        className='absolute top-4 left-4 z-10 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-md cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200'
        aria-label="Go back"
      >
        <ArrowLeft size={24} />
      </button>

      <div className='w-full md:w-1/2 min-h-[300px] md:min-h-screen relative overflow-hidden'>
        <Image
          src='/Formimage.png'
          alt='Form Illustration'
          fill
          className='object-cover object-[center_30%]'
          priority
          sizes='(max-width: 768px) 100vw, 50vw'
        />
      </div>

      <div className='md:w-1/2 w-full flex flex-col justify-center p-4'>
        <h1 className='py-5 text-center mb-3 uppercase font-bold md:text-4xl text-2xl text-[#2196F3]'>
          Create Your Account!
        </h1>

        <form
          onSubmit={handleSubmit}
          className='space-y-3 w-full max-w-md mx-auto'
        >


          <div>
            <Label
              htmlFor='fullName'
              className='text-[#181818] p-2 w-full mt-2'
            >
              Full Name
            </Label>
            <Input
              type='text'
              name='fullName'
              id='fullName'
              className={
                errors.fullName ? "border-red-500" : "border border-blue-500"
              }
              value={values.fullName}
              onChange={handleChange}
              placeholder='Enter your full name'
            />
            {errors.fullName && (
              <p className='text-red-500 text-sm'>{errors.fullName}</p>
            )}
          </div>


          <div>
            <Label
              htmlFor='email'
              className='font-medium text-[#181818] p-2 w-full mt-2'
            >
              Email
            </Label>
            <Input
              type='email'
              name='email'
              id='email'
              className={
                errors.email ? "border-red-500" : "border border-blue-500"
              }
              value={values.email}
              onChange={handleChange}
              placeholder='Enter your email'
            />
            {errors.email && (
              <p className='text-red-500 text-sm'>{errors.email}</p>
            )}
          </div>


          <div className='relative w-full'>
            <Label
              htmlFor='password'
              className='font-medium text-[#181818] p-2 w-full mt-2'
            >
              Password
            </Label>
            <Input
              type={show ? "text" : "password"}
              name='password'
              id='password'
              className={
                errors.password ? "border-red-500" : "border border-blue-500"
              }
              value={values.password}
              onChange={handleChange}
              placeholder='***********'
            />
            <span
              onClick={handlePasswordToggle}
              className='absolute right-4 top-2/3 mt-1 -translate-y-1/2 cursor-pointer text-black'
            >
              {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {errors.password && (
              <p className='text-red-500 text-sm'>{errors.password}</p>
            )}
          </div>

          <div>
            <Label
              htmlFor='confirmPassword'
              className='font-medium text-[#181818] p-2 w-full mt-2'
            >
              Confirm Password
            </Label>
            <Input
              type={show ? "text" : "password"}
              name='confirmPassword'
              id='confirmPassword'
              className={
                errors.confirmPassword
                  ? "border-red-500"
                  : "border border-blue-500"
              }
              value={values.confirmPassword}
              onChange={handleChange}
              placeholder='***********'
            />
            {errors.confirmPassword && (
              <p className='text-red-500 text-sm'>{errors.confirmPassword}</p>
            )}
          </div>

          {apiError && (
            <div className="text-red-600 bg-red-100 border border-red-400 p-3 rounded-md mt-4 text-sm" role="alert">
              {apiError}
            </div>
          )}

          <div className='flex flex-col justify-center items-center gap-3'>
            <Button
              type='submit'
              className='bg-sky-500 hover:bg-blue-500 transition text-white w-full py-2 text-lg font-semibold'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>

          <p className='text-center text-[#595959] font-normal mt-4'>
            Have an account?
            <span
              className='text-blue-600 cursor-pointer ml-1'
              onClick={() => router.push("/login")}
            >
              Sign in!
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;