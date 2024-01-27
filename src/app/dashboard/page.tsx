"use client";
import { Button } from "@/src/components/ui/button";
import { toast } from "@/src/components/ui/use-toast";
import { useAuthContext } from "@/src/context/useAuthContext";
import axios from "axios";
import React from "react";

const DashboardPage = () => {
  const { token, user } = useAuthContext();
  const onClicks = async () => {
    try {
      const data = {
        donation_date: new Date().toISOString(),
        user_id: "65b3cb49ff205f2ea669d825",
      };
      const res = await axios.post("/api/donate/donation-appointment", data);
      if (res.data.status === 200) {
        toast({
          title: "Success",
          description: res.data.message,
        });
        return;
      }
      toast({
        title: "OOP!",
        description: res.data.message,
      });
      return;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };
  return (
    <div>
      <Button onClick={onClicks}>Make Request- {user?.mobileNo}</Button>
    </div>
  );
};

export default DashboardPage;
