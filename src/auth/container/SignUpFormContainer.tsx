// containers/SignUpFormContainer.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRegisterUserMutation } from '@/auth/api/signUpApi';
import { useDispatch } from 'react-redux';
import { SignUpRequest } from '@/auth/types/signup-type';
import { SignUpFormView } from '../components/SignUpFormView';
import { setUserAfterSignup } from '../authSlice';

const SignUpFormContainer: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpRequest>();
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<SignUpRequest> = async (data) => {
    try {
      const userData = await registerUser(data).unwrap();
      dispatch(setUserAfterSignup(userData));      // Redirect or perform additional actions upon successful registration
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <SignUpFormView
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      isLoading={isLoading}
      apiError={error}
    />
  );
};

export default SignUpFormContainer;
