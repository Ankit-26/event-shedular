import EventList, {
  EventListType,
} from "@/components/event-management/event-List";
import MonthChanger from "@/components/event-management/month-changer";
import TextTooltip from "@/components/text-tooltip";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  setOpenCloseEventCreationModal,
  setSelectedAddEventDate,
  setUpdatingEvent,
} from "@/redux/app-slice/app-slice";
import { updateEventPayload } from "@/redux/app-slice/type";
import { AppDispatch } from "@/redux/store";
import dayjs from "dayjs";
import { Plus } from "lucide-react";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

interface CalendarGridProps {
  currentMonth: string;
  events: Record<
    string,
    {
      id: string;
      description: string;
    }[]
  >;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  events,
}) => {
  const isMobile = useIsMobile();
  const dispatch = useDispatch<AppDispatch>();
  const startOfMonth = dayjs(currentMonth).startOf("month");
  const endOfMonth = dayjs(currentMonth).endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");
  const [mobileViewEventListData, setMobileViewEventListData] =
    useState<EventListType | null>(null);

  const days = useMemo(() => {
    const daysArray: dayjs.Dayjs[] = [];
    let day = startDate;

    while (!day.isAfter(endDate, "day")) {
      daysArray.push(day);
      day = day.add(1, "day");
    }
    return daysArray;
  }, [startDate, endDate]);

  const rows = Math.ceil(days.length / 7);

  const handleCreateEvent = useCallback(
    (date?: string) => {
      dispatch(setOpenCloseEventCreationModal(true));

      if (isMobile && mobileViewEventListData) {
        dispatch(setSelectedAddEventDate(mobileViewEventListData.date));
      } else if (date) {
        dispatch(setSelectedAddEventDate(date));
      }
    },
    [dispatch, isMobile, mobileViewEventListData]
  );

  const handleEditEvent = useCallback(
    (event: updateEventPayload) => {
      dispatch(setUpdatingEvent(event));
      dispatch(setOpenCloseEventCreationModal(true));
    },
    [dispatch]
  );

  const handleSetMobileViewEventListData = useCallback(
    (data: EventListType) => {
      setMobileViewEventListData(data);
    },
    []
  );

  useEffect(() => {
    setMobileViewEventListData(null);
  }, [currentMonth]);

  const renderDayEvents = useCallback(
    (dayEvents: { id: string; description: string }[], dayKey: string) => {
      return dayEvents.map((event, idx) => (
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleEditEvent({
              date: dayKey,
              id: event.id,
              description: event.description,
            });
          }}
          key={idx}
          className="mt-1 text-xs bg-red-100 p-1 text-black font-normal rounded cursor-pointer w-[90%]"
        >
          <TextTooltip tooltipContent={event.description}>
            {event.description}
          </TextTooltip>
        </div>
      ));
    },
    [handleEditEvent]
  );

  const renderDays = useCallback(() => {
    return days.map((day, index) => {
      const dayKey = day.format("YYYY-MM-DD");
      const dayEvents = events[dayKey] || [];

      return (
        <div
          onDoubleClick={() => handleCreateEvent(dayKey)}
          onClick={() =>
            handleSetMobileViewEventListData({
              date: day.format("YYYY-MM-DD"),
              eventsList: dayEvents,
            })
          }
          key={index}
          className={cn(
            `p-10 pt-2 pb-2 max-sm:pr-2 flex-1  pl-2 border-r border-b border-gray-300 last:border-r-0 transition-all ${
              day.isSame(currentMonth, "month")
                ? "bg-white hover:bg-blue-50"
                : "bg-gray-100 text-gray-400"
            }`,
            day.day() === 6 && "text-loco-blue font-bold border-r-0"
          )}
        >
          <div className="flex gap-2 items-center ">
            <span>{day.format("D")}</span>
            {isMobile && dayEvents.length > 0 && (
              <span className="p-1 rounded-full bg-loco-warn"></span>
            )}
          </div>
          {!isMobile && (
            <div
              className={`flex-1 flex flex-col gap-1 min-h-0 ${
                rows === 6 ? "h-[3.5em]" : "h-[4.5em]"
              } overflow-y-auto`}
            >
              {renderDayEvents(dayEvents, dayKey)}
            </div>
          )}
        </div>
      );
    });
  }, [
    currentMonth,
    days,
    events,
    handleCreateEvent,
    handleSetMobileViewEventListData,
    isMobile,
    renderDayEvents,
    rows,
  ]);

  return (
    <div className="h-full flex flex-col">
      {isMobile && (
        <div className="flex justify-between items-center p-2 border-t py-6 ">
          <MonthChanger />
        </div>
      )}
      <div className=" w-full border-y sm:border flex-1 flex flex-col rounded-lg overflow-y-scroll">
        <CalenderHeader />
        <div
          style={{
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
          className={`grid grid-cols-7  flex-1 overflow-hidden  min-h-0`}
        >
          {renderDays()}
        </div>
      </div>
      {isMobile && (
        <div className="m-2 flex h-[50%] flex-col ">
          {mobileViewEventListData &&
          mobileViewEventListData.eventsList &&
          mobileViewEventListData.eventsList.length > 0 ? (
            <div className="w-full h-full overflow-y-scroll scroll-hidden my-3 mr-3">
              <EventList
                date={mobileViewEventListData.date || ""}
                eventsList={mobileViewEventListData.eventsList}
              />
            </div>
          ) : (
            <div className="w-full h-full  justify-center items-center  gap-4 flex flex-col text-center text-loco-black-foreground">
              <span className="text-xl font-medium">No events</span>
            </div>
          )}
        </div>
      )}
      {isMobile && (
        <Button
          variant={"primary-blue"}
          className="font-medium m-2"
          onClick={() => handleCreateEvent()}
          size={isMobile ? "sm" : "lg"}
        >
          <Plus size={32} />
          Create Event
        </Button>
      )}
    </div>
  );
};
export default CalendarGrid;

const CalenderHeader = memo(() => (
  <div className="grid grid-cols-7 border-b border-gray-300">
    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
      <div
        key={day}
        className="text-center font-bold p-2 border-r border-gray-300 last:border-r-0"
      >
        {day}
      </div>
    ))}
  </div>
));

CalenderHeader.displayName = "CalenderHeader";
