import { ReactNode } from "react";
import { SIGNIN_PATH, SIGNUP_PATH } from "./routes-constant";
import SignUpFormContainer from "@/auth/container/SignUpFormContainer";
import SignInFormContainer from "@/auth/container/SignInFormContainer";


export interface RouteOptions {
  key: string;
  path: string;
  element: ReactNode;
  isProtected: boolean;
  includeLayout: boolean;
}

export const routes: RouteOptions[] = [
  {
    key: "signup",
    path: SIGNUP_PATH,
    element: <SignUpFormContainer/>,
    isProtected: false,
    includeLayout: true,
  },
  {
    key: "sigin",
    path: SIGNIN_PATH,
    element: <SignInFormContainer/>,
    isProtected: false,
    includeLayout: true,
  },
];