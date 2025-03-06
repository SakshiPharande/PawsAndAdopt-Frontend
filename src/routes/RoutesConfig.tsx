import { ReactNode } from "react";
import { HOME_PATH, SIGNIN_PATH, SIGNUP_PATH, SHOW_ALL_PETS, SHOW_ADOPT_PET_REQUEST, SEND_DONATE_PET_REQUEST, SHOW_DONATE_PET_REQUEST, FILL_DONATION_FORM, USER_PROFILE } from "./routes-constant";
import SignUpFormContainer from "@/auth/container/SignUpFormContainer";
import SignInFormContainer from "@/auth/container/SignInFormContainer";
import Home from "@/feature/landing/components/Home";
import ShowAllPets from "@/feature/Pets/containers/ShowAllPets";
import ShowAdoptRequestContainer from "@/feature/AdoptPet/container/ShowAdoptRequestContainer";
import DonationPage from "@/feature/DonatePet/components/DonationPage";
import ShowDonateRequestContainer from "@/feature/DonatePet/container/ShowDonateRequestContainer";
import DonationForm from "@/feature/DonatePet/components/DonationForm";
import Profile from "@/feature/landing/components/Profile";

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
    isProtected: true,
    layout: LayoutType.HOME
  },
  {
    key: "/donation",
    path: SEND_DONATE_PET_REQUEST,
    element: <DonationPage/>,
    isProtected: true,
    layout: LayoutType.HOME
  },
  {
    key: "/show_donations",
    path: SHOW_DONATE_PET_REQUEST,
    element: <ShowDonateRequestContainer/>,
    isProtected: true,
    layout: LayoutType.HOME
  },
  {
    key: "/donation_form/:petId",
    path: FILL_DONATION_FORM,
    element: <DonationForm/>,
    isProtected: true,
    layout: LayoutType.HOME
  },
  {
    key: "/profile",
    path: USER_PROFILE,
    element: <Profile/>,
    isProtected: true,
    layout: LayoutType.HOME
  },
];