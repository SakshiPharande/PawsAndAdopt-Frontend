import { ReactNode } from "react";
import { SIGNUP_PATH } from "./routes-constant";
import { SignUpFormView } from "@/auth/components/SignUpFormView";

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
    element: <SignUpFormView />,
    isProtected: false,
    includeLayout: false,
  },
];