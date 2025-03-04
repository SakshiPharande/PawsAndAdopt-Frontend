import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; //  Used for redirection
import { setCredentials } from "@/auth/authSlice";
import { SignInRequest } from "@/auth/types/signin-type";
import { SignInFormView } from "../components/SignInFormView";
import { useSignInUserMutation } from "../api/signInApi";
import { toast } from "sonner"; //  Using Sonner for toasts

const SignInFormContainer: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInRequest>();
  const dispatch = useDispatch();
  const navigate = useNavigate(); //  Used for redirection after login
  const [loginUser, { isLoading, error }] = useSignInUserMutation();

  const onSubmit: SubmitHandler<SignInRequest> = async (data) => {
    try {
      const userData = await loginUser(data).unwrap();
      dispatch(setCredentials(userData));
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData.user));
      localStorage.setItem("profile_image_url", userData.user.profile_image_url);

      //  Show success toast using Sonner
      toast.success(`Welcome back, ${userData.user.first_name}!`);

      //  Redirect to dashboard (/)
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);

      //  Show error toast using Sonner
      toast.error("Login failed. Invalid credentials. Please try again.");
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
