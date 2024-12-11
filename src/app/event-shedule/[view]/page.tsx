import { routes } from "@/config-global";
import Events from "@/sections/views/evnt-view/events-view";
import MonthCalender from "@/sections/views/calender-view/month-view";
import React from "react";

async function page({ params }: { params: Promise<{ view: string }> }) {
  const { view } = await params;
  const renderView = routes.eventShedule.events.endsWith(view) ? (
    <Events />
  ) : (
    <MonthCalender />
  );
  return <>{renderView}</>;
}

export default page;
