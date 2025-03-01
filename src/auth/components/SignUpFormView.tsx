// components/SignUpFormView.tsx
import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SignUpRequest } from '@/auth/types/signup-type';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignUpFormViewProps extends React.ComponentProps<"form"> {
  register: UseFormRegister<SignUpRequest>;
  errors: FieldErrors<SignUpRequest>;
  isLoading: boolean;
  apiError: any;
}

export const SignUpFormView: React.FC<SignUpFormViewProps> = ({
  className,
  onSubmit,
  register,
  errors,
  isLoading,
  apiError,
  ...props
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 to-rose-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className={cn("w-full max-w-5xl", className)}>
      <Card className="overflow-hidden shadow-xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={onSubmit} {...props}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-2 flex items-center">
                  <h1 className="text-3xl font-bold text-amber-800">Paws&Adopt</h1>
                </div>
                <p className="text-balance text-muted-foreground">
                  Join our community and find your perfect companion
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first_name" className="text-amber-900">First Name</Label>
                  <Input
                    id="first_name"
                    type="text"
                    className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                    {...register('first_name', { required: 'First name is required' })}
                  />
                  {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last_name" className="text-amber-900">Last Name</Label>
                  <Input
                    id="last_name"
                    type="text"
                    className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                    {...register('last_name', { required: 'Last name is required' })}
                  />
                  {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-amber-900">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mobile_no" className="text-amber-900">Mobile No</Label>
                  <Input
                    id="mobile_no"
                    type="tel"
                    className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                    {...register('phone_no', { required: 'Mobile number is required' })}
                  />
                  {errors.phone_no && <p className="text-red-500 text-xs">{errors.phone_no.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-amber-900">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                    {...register('password', { required: 'Password is required' })}
                  />
                  {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm_password" className="text-amber-900">Confirm Password</Label>
                  <Input
                    id="confirm_password"
                    type="password"
                    className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                    {...register('password_confirmation', { required: 'Please confirm your password' })}
                  />
                  {errors.password_confirmation && <p className="text-red-500 text-xs">{errors.password_confirmation.message}</p>}
                </div>
              </div>
              {apiError && <p className="text-red-500 text-center">Registration failed: {apiError.message}</p>}
              <Button 
                type="submit" 
                className="w-full bg-amber-600 hover:bg-amber-700 text-white" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </Button>
              <div className="text-center text-sm">
                Have an account already?{" "}
                <a href="#" className="text-amber-600 underline underline-offset-4 hover:text-amber-800">
                  Sign In
                </a>
              </div>
            </div>
          </form>
         <div className="relative hidden bg-amber-100 md:block">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/images/SignUpPets.jpg"
              alt="Adorable pet"
              className="absolute inset-0 h-full w-full object-contain"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-600/50 to-rose-300/30"></div>
          </div>
        </div>

        </CardContent>
      </Card>
      <div className="mt-4 text-balance text-center text-xs text-amber-800 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-amber-600">
        By clicking Sign Up, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  </div>
  
  );
};
