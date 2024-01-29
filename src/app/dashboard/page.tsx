"use client";

import React, { useState } from "react";
import BloodStockDialog from "@/src/components/blood-stock-dialog";
import { Button } from "@/src/components/ui/button";
import MakeBloodRequestDialog from "@/src/components/make-blood-request-dialog";

const DashboardPage = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Click</Button>
      <MakeBloodRequestDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default DashboardPage;
