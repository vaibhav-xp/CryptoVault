import { useEffect } from "react";
import useWallet from "./useWallet";
import { usePathname, useRouter } from "next/navigation";

const useAuth = () => {
  const router = useRouter();
  const { password } = useWallet();
  const path = usePathname();

  const requiredAuth = () => {
    // Check for the authentication token in localStorage
    const protectedRoutes = ["/", "/send"];
    const token = localStorage.getItem("cryptoVault");

    // Redirect to the welcome page if no token is found
    if (!token) {
      return router.push("/welcome");
    }

    // Redirect to the password setup page if no password is set
    if (!password) {
      return router.push("/password");
    }

    if (protectedRoutes.includes(path)) return router.push(path);
  };

  useEffect(() => {
    requiredAuth();
  }, [router, requiredAuth]);
};

export default useAuth;
