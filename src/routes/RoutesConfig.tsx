import { ReactNode } from "react";
import { HOME_PATH, SIGNIN_PATH, SIGNUP_PATH } from "./routes-constant";
import SignUpFormContainer from "@/auth/container/SignUpFormContainer";
import SignInFormContainer from "@/auth/container/SignInFormContainer";
import Home from "@/feature/landing/components/Home";

// Enum for layout types
export enum LayoutType {
  HOME = "HomeLayout",
  AUTH = "AuthLayout",
  NONE = "None", 
}

export interface RouteOptions {
  key: string;
  path: string;
  element: ReactNode;
  isProtected: boolean;
  // includeLayout: boolean;
  layout: LayoutType;
}

export const routes: RouteOptions[] = [
  {
    key: "home",
    path: HOME_PATH,
    element: <Home />, 
    isProtected: false,
    layout: LayoutType.HOME,
  },
  {
    key: "signup",
    path: SIGNUP_PATH,
    element: <SignUpFormContainer/>,
    isProtected: false,
    layout: LayoutType.AUTH
  },
  {
    key: "sigin",
    path: SIGNIN_PATH,
    element: <SignInFormContainer/>,
    isProtected: false,
    layout: LayoutType.AUTH
  },
];