import React from "react";
import { Button } from "./ui/button";
import { useAuthContext } from "../context/useAuthContext";
import { toast } from "./ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const { token, isLoggedIn } = useAuthContext();
  const router = useRouter();
  const onLogout = async () => {
    try {
      const res = await axios.post("/api/auth/logout");
      if (res.data.status === 200) {
        toast({
          title: "Logout Success",
          description: res.data.message,
        });
        router.push("/");
        return;
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
      });
    }
  };
  return (
    <nav>
      <div className='p-4'>
        <div className='align-center justify-between flex'>
          <div>
            {/* <h1 className='text-2xl font-bold'>Blood Bank</h1> */}
            <h1 className='text-2xl font-bold'>
              {isLoggedIn ? "true" : "false"}
            </h1>
          </div>
          <div>{!!token && <Button onClick={onLogout}>Logout</Button>}</div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
