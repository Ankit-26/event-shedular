"use client";
import EventList from "@/components/event-management/event-List";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";

function Events() {
  const { events } = useSelector((state: RootState) => state.appReducer);
  const isMobile = useIsMobile();

  return (
    <div className="flex  flex-col h-full">
      <h1 className="text-xl font-bold mb-6">All Events</h1>
      <div className="shadow border flex-1 p-5 w-full rounded-lg flex flex-col overflow-hidden">
        <ul
          className={cn(
            "list-none flex-1 flex flex-col gap-5 overflow-y-scroll ",
            isMobile && "scroll-hidden"
          )}
        >
          {Object.entries(events)
            .sort((date1, date2) => {
              return dayjs(date1[0]).isBefore(dayjs(date2[0])) ? 1 : -1;
            })
            .map(([date, value]) => (
              <li key={date}>
                <EventList date={date} eventsList={value} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Events;
