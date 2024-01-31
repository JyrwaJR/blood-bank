import { Mail } from "./components/mail";
import React from "react";

export default function MailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='flex-col h-screen flex'>
        <Mail navCollapsedSize={4}>{children}</Mail>
      </div>
    </>
  );
}
