import { createContext } from "react";
import { LoginModelType } from "../models";
import { RegisterModelType } from "../models/register-model";
export type UserType = {
  id: string;
  email: string;
  name: string;
  role: string;
  address: string;
  mobileNo: string;
  createdAt: string;
  age: number;
};
export type AuthContextType = {
  token: string | null;
  isLoggedIn: boolean;
  login: (data: LoginModelType) => void;
  signUp: (data: RegisterModelType) => void;
  logout: () => void;
  user: UserType | null;
  isLoading: boolean;
};
const AuthContext = createContext<AuthContextType | null>({
  token: null,
  isLoggedIn: false,
  login: (data: LoginModelType) => {},
  signUp: (data: RegisterModelType) => {},
  logout: () => {},
  user: null,
  isLoading: false,
});

export default AuthContext;
