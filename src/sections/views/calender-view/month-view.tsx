"use client";
import React from "react";
import CalendarGrid from "./calender-grid";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const MonthCalendar: React.FC = () => {
  const { currentMonth, events } = useSelector(
    (state: RootState) => state.appReducer
  );

  return <CalendarGrid currentMonth={currentMonth} events={events} />;
};

export default MonthCalendar;
