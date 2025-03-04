import { useEffect } from "react";

const useBodyGradient = () => {
  useEffect(() => {
    document.body.classList.add("bg-gradient-to-br", "from-[#E4D3E7]", "to-[#D1B0D2]");
    return () => {
      document.body.classList.remove("bg-gradient-to-br", "from-[#E4D3E7]", "to-[#D1B0D2]");
    };
  }, []);
};

export default useBodyGradient;
