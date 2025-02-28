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
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={onSubmit} {...props}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Paws&Adopt</h1>
                <p className="text-balance text-muted-foreground">
                  Create your account
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    type="text"
                    {...register('first_name', { required: 'First name is required' })}
                  />
                  {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    type="text"
                    {...register('last_name', { required: 'Last name is required' })}
                  />
                  {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mobile_no">Mobile No</Label>
                  <Input
                    id="mobile_no"
                    type="tel"
                    {...register('phone_no', { required: 'Mobile number is required' })}
                  />
                  {errors.phone_no && <p className="text-red-500">{errors.phone_no.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register('password', { required: 'Password is required' })}
                  />
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                  <Input
                    id="confirm_password"
                    type="password"
                    {...register('password_confirmation', { required: 'Please confirm your password' })}
                  />
                  {errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation.message}</p>}
                </div>
              </div>
              {apiError && <p className="text-red-500">Registration failed: {apiError.message}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </Button>
              <div className="text-center text-sm">
                Have an account already?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign In
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking Sign Up, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};
