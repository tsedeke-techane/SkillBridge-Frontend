"use client";
import { useRouter } from "next/navigation";
import { Input } from "@/app/[locale]/components/ui/input";
import { Label } from "@/app/[locale]/components/ui/label";
//import Link from "next/link"; 
import { Button } from "@/app/[locale]/components/ui/button";
import Image from "next/image";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import useSignIn from "@/app/[locale]/components/hooks/useSignIn";
import { useState } from "react";


  const SignIn: React.FC = () => {
  const [show, setShow] = useState(false);
  const handlePasswordToggle = () => {
    setShow(!show);
  };
  const router = useRouter();
  const { handleChange, errors, values, handleSubmit, isLoading, apiError } = useSignIn();
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
          alt='Form Image'
          fill
          className='object-cover object-[center_30%]'
          priority
          sizes='(max-width: 768px) 100vw, 50vw'
        />
      </div>

      <div className='md:w-1/2 w-full flex flex-col justify-center p-4'>
        <h1 className='py-5 text-center mb-3 uppercase font-[700] md:text-5xl text-2xl text-[#2196F3]'>
          ✋Welcome back!
        </h1>

        <form
          onSubmit={handleSubmit}
          className='space-y-3 w-full max-w-md mx-auto'
        >
          <div>
            <Label
              htmlFor='email'
              className='font-[500] text-[#181818] p-2 w-full mt-2'
            >
              Email
            </Label>
            <Input
              type='email'
              name='email'
              id='email'
              onChange={handleChange}
              value={values.email}
              className={`${
                errors.email ? "border-red-500" : "border border-blue-500"
              }`}
              placeholder='Enter your email'
            />
            {errors.email && (
              <p className='text-red-500 text-sm'>{errors.email}</p>
            )}
          </div>

          <div>
            <Label
              htmlFor='password'
              className='font-[500] text-[#181818] p-2 w-full mt-2'
            >
              Password
            </Label>
            <div className='relative'>
              <Input
                type={show ? "text" : "password"}
                name='password'
                id='password'
                value={values.password}
                onChange={handleChange}
                placeholder='***********'
                className={`${
                  errors.password ? "border-red-500" : "border border-blue-500"
                }`}
              />
              <span
                onClick={handlePasswordToggle}
                className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-black'
              >
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {errors.password && (
              <p className='text-red-500 text-sm'>{errors.password}</p>
            )}
          </div>

          {apiError && (
            <div className="text-red-600 bg-red-100 border border-red-400 p-3 rounded-md mt-4 text-sm" role="alert">
              {apiError}
            </div>
          )}

          <div className='flex justify-between mt-2 '>
            <div className='flex items-center gap-2'>
              <input 
                type='checkbox' 
                name='rememberMe' 
                checked={values.rememberMe} 
                onChange={handleChange}
              />
              <p className='text-[#8C8C8C] font-[500]'>Remember me</p>
            </div>
          </div>

          <div className='flex flex-col justify-center items-center gap-3'>
            <Button 
              type="submit" 
              className='bg-sky-500 hover:bg-blue-500 transition text-white w-full py-2 text-lg font-semibold'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
          <p className='text-center text-[#595959] font-[400] mt-4 cursor-pointer'>
            Don't Have an account?
            <span
              className='text-blue-600'
              onClick={() => router.push("/signup")}
            >
              {" "}
              Sign up for Free !
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignIn;