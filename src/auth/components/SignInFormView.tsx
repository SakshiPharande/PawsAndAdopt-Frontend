// components/SignInFormView.tsx
import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInRequest } from '../types/signin-type';

interface SignInFormViewProps extends React.ComponentProps<"form"> {
  register: UseFormRegister<SignInRequest>;
  errors: FieldErrors<SignInRequest>;
  isLoading: boolean;
  apiError: any;
}

export const SignInFormView: React.FC<SignInFormViewProps> = ({
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
                  <h1 className="text-3xl font-bold text-amber-800">Paws&Adopt</h1>
                  <p className="text-balance text-muted-foreground">
                    Sign in to continue
                  </p>
                </div>
                <div className="grid gap-4">
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
                    <Label htmlFor="password" className="text-amber-900">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                      {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                  </div>
                </div>
                {apiError && <p className="text-red-500 text-center">Login failed: {apiError.message}</p>}
                <Button 
                  type="submit" 
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
                <div className="text-center text-sm">
                  Don't have an account? {" "}
                  <a href="#" className="text-amber-600 underline underline-offset-4 hover:text-amber-800">
                    Sign Up
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
                <div className="absolute inset-0 bg-gradient-to-t from-amber-600/50 to-rose-300/30"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mt-4 text-balance text-center text-xs text-amber-800 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-amber-600">
          By signing in, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};
