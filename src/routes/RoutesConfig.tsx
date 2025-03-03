import { ReactNode } from "react";
import { HOME_PATH, SIGNIN_PATH, SIGNUP_PATH, SHOW_ALL_PETS, SHOW_ADOPT_PET_REQUEST } from "./routes-constant";
import SignUpFormContainer from "@/auth/container/SignUpFormContainer";
import SignInFormContainer from "@/auth/container/SignInFormContainer";
import Home from "@/feature/landing/components/Home";
import ShowAllPets from "@/feature/Pets/containers/ShowAllPets";
import ShowAdoptRequestContainer from "@/feature/AdoptPet/container/ShowAdoptRequestContainer";

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
  {
    key: "all_pets",
    path: SHOW_ALL_PETS,
    element: <ShowAllPets/>,
    isProtected: false,
    layout: LayoutType.HOME
  },
  {
    key: "/show_adoptions",
    path: SHOW_ADOPT_PET_REQUEST,
    element: <ShowAdoptRequestContainer/>,
    isProtected: false,
    layout: LayoutType.HOME
  },
];