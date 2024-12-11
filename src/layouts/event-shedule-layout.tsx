import MainHeader from "@/sections/header/main-header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function EventSheduleLayout({ children }: Props) {
  return (
    <div className="flex flex-col h-screen max-h-screen w-full overflow-hidden ">
      <MainHeader />
      <div className="sm:mx-16 sm:my-5  flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default EventSheduleLayout;
