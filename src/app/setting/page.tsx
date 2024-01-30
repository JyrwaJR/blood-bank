"use client";
import { useAuthContext } from "@/src/context/useAuthContext";
import React from "react";

const SettingPage = () => {
  const { isLoggedIn } = useAuthContext();
  return (
    <div className={isLoggedIn ? "block" : "hidden"}>
      {"is logged in: " + isLoggedIn}
    </div>
  );
};

export default SettingPage;
