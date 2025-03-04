// containers/SignInFormContainer.tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/auth/authSlice";
import { SignInRequest } from "@/auth/types/signin-type";
import { SignInFormView } from "../components/SignInFormView";
import { useSignInUserMutation } from "../api/signInApi";

const SignInFormContainer: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInRequest>();
  const dispatch = useDispatch();
  const [loginUser, { isLoading, error }] = useSignInUserMutation();

  const onSubmit: SubmitHandler<SignInRequest> = async (data) => {
    try {
      const userData = await loginUser(data).unwrap();
      dispatch(setCredentials(userData));  // Save user & token in Redux store
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData.user));
      localStorage.setItem("profile_image_url", userData.user.profile_image_url);
      // Redirect user or handle post-login logic
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <SignInFormView
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      isLoading={isLoading}
      apiError={error}
    />
  );
};

export default SignInFormContainer;
