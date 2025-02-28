import { ReactNode } from "react";
import { SIGNUP_PATH } from "./routes-constant";
import SignUpFormContainer from "@/auth/container/SignUpFormContainer";

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
];