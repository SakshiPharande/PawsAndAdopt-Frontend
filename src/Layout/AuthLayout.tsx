import { ReactNode } from "react";
import useBodyGradient from "./useBodyGradient";


interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  useBodyGradient();

  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;