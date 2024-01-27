import { useContext } from "react";
import AuthContext from "./auth-context";

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return authContext;
};
