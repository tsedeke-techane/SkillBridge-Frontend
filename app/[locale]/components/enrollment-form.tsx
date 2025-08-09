"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/app/[locale]/components/ui/button";
import { Input } from "@/app/[locale]/components/ui/input";
import { Label } from "@/app/[locale]/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/app/[locale]/components/ui/radio-group";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/[locale]/components/ui/alert-dialog";
import { Mail, Phone } from "lucide-react";

interface EnrollmentFormProps {
  courseName: string;
  onClose: () => void;
}

export default function EnrollmentForm({
  courseName,
  onClose,
}: EnrollmentFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    paymentOption: "one-time",
    transactionId: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentOptionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentOption: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Check if all fields are filled
    if (
      formData.fullName &&
      formData.email &&
      formData.phone &&
      formData.transactionId
    ) {
      // Show success dialog
      setShowSuccessDialog(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='space-y-4 py-4'>
        <div className='space-y-2'>
          <Label htmlFor='fullName'>Full Name</Label>
          <Input
            id='fullName'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
            placeholder='Enter your full name'
            className={
              isSubmitted && !formData.fullName ? "border-red-500" : ""
            }
          />
          {isSubmitted && !formData.fullName && (
            <p className='text-sm text-red-500'>Full name is required</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='email'>Email Address</Label>
          <Input
            id='email'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter your email address'
            className={isSubmitted && !formData.email ? "border-red-500" : ""}
          />
          {isSubmitted && !formData.email && (
            <p className='text-sm text-red-500'>Email address is required</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='phone'>Phone Number</Label>
          <Input
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            placeholder='Enter your phone number'
            className={isSubmitted && !formData.phone ? "border-red-500" : ""}
          />
          {isSubmitted && !formData.phone && (
            <p className='text-sm text-red-500'>Phone number is required</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='courseName'>Course Name</Label>
          <Input id='courseName' value={courseName} readOnly disabled />
        </div>

        <div className='space-y-2'>
          <Label>Payment Option</Label>
          <RadioGroup
            value={formData.paymentOption}
            onValueChange={handlePaymentOptionChange}
            className='flex flex-col space-y-1'
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='one-time' id='payment-one-time' />
              <Label htmlFor='payment-one-time'>One-time payment</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='monthly' id='payment-monthly' />
              <Label htmlFor='payment-monthly'>Monthly subscription</Label>
            </div>
          </RadioGroup>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='transactionId'>Transaction ID</Label>
          <Input
            id='transactionId'
            name='transactionId'
            value={formData.transactionId}
            onChange={handleChange}
            placeholder='Enter your payment transaction ID'
            className={
              isSubmitted && !formData.transactionId ? "border-red-500" : ""
            }
          />
          {isSubmitted && !formData.transactionId && (
            <p className='text-sm text-red-500'>Transaction ID is required</p>
          )}
        </div>

        <div className='flex justify-end gap-2 pt-4'>
          <Button type='button' variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button type='submit'>Submit</Button>
        </div>
      </form>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enrollment Successful!</AlertDialogTitle>
            <AlertDialogDescription>
              <p className='mb-4'>
                A verification email will be sent once we verify your payment.
              </p>
              <div className='bg-gray-100 dark:bg-gray-800 p-4 rounded-md space-y-2 mb-4'>
                <p className='font-medium'>Additional Information:</p>
                <p>
                  If payment verification is not completed within 48 hours, you
                  should contact us at:
                </p>
                <div className='flex items-center gap-2'>
                  <Mail className='h-4 w-4 text-blue-500' />
                  <a
                    href='mailto:john@gmail.com'
                    className='text-blue-500 hover:underline'
                  >
                    john@gmail.com
                  </a>
                </div>
                <div className='flex items-center gap-2'>
                  <Phone className='h-4 w-4 text-blue-500' />
                  <a
                    href='tel:+2512345436'
                    className='text-blue-500 hover:underline'
                  >
                    +251 2345 4365
                  </a>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={onClose}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
