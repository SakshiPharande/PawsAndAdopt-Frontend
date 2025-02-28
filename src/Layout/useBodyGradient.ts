import { useEffect } from "react";

const useBodyGradient = () => {
  useEffect(() => {
    document.body.classList.add("bg-gradient-to-br", "from-amber-50", "to-rose-100");
    return () => {
      document.body.classList.remove("bg-gradient-to-br", "from-amber-50", "to-rose-100");
    };
  }, []);
};

export default useBodyGradient;
