"use client";

import React, { useState } from "react";
import BloodStockDialog from "@/src/components/blood-stock-dialog";
import { Button } from "@/src/components/ui/button";

const DashboardPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Click</Button>
      <BloodStockDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default DashboardPage;
