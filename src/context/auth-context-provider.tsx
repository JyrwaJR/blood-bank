"use client";
import React, { useEffect } from "react";
import AuthContext, { UserType } from "./auth-context";
import axios from "axios";
import { toast } from "../components/ui/use-toast";
import { RegisterModelType } from "../models/register-model";
import { LoginModelType } from "../models";
import { useRouter } from "next/navigation";
import NavBar from "../components/nav";

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<null | UserType>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [token, setToken] = React.useState<string | null>(null);
  const router = useRouter();
  const loginFn = async ({ data }: { data: LoginModelType }) => {
    try {
      const res = await axios.post("/api/auth", data);
      if (res.data.status === 200) {
        toast({
          title: "Login Successfully",
          description: res.data.message,
        });
        setIsLoggedIn(true);
        verifyToken();
        router.push("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: res.data.message,
        });
      }
    } catch (error) {
      throw error;
    }
  };
  const signUpFn = async ({ data }: { data: RegisterModelType }) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/auth/register", data);

      if (res.data.status === 200) {
        toast({
          title: "Register Successfully",
          description: res.data.message,
        });
        setIsLoading(false);
        return;
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: res.data.message,
        });
        setIsLoading(false);
        return;
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const logoutFn = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/auth/logout");
      if (res.data.status === 200) {
        setUser(null);
        setIsLoggedIn(false);
        setToken(null);
        toast({
          title: "Logout Success",
          description: "You have successfully logged out",
        });
        verifyToken();
        router.push("/");
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      return;
    } catch (error: any) {
      setUser(null);
      setIsLoggedIn(false);
      setToken(null);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error.message,
      });
      setIsLoading(false);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyToken = async () => {
    try {
      const res = await axios.post("/api/verify-token");
      if (res.data.status === 200) {
        setToken(res.data.token);
        setUser(res.data.data);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error.message,
      });
    }
  };
  useEffect(() => {
    if (!isLoggedIn) {
      verifyToken();
    }
  }, [isLoggedIn]);
  return (
    <AuthContext.Provider
      value={{
        isLoading: isLoading,
        isLoggedIn: isLoggedIn,
        user: user,
        token: token,
        login: (data: LoginModelType) => loginFn({ data }),
        signUp: (data: RegisterModelType) => signUpFn({ data }), // signUpFn({ data: data }
        logout: logoutFn,
      }}
    >
      {!!token && <NavBar />}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
