"use client";
import EventSheduleLayout from "@/layouts/event-shedule-layout";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function layout({ children }: Props) {
  return <EventSheduleLayout>{children}</EventSheduleLayout>;
}

export default layout;
