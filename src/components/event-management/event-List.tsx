import {
  setOpenCloseEventCreationModal,
  setUpdatingEvent,
} from "@/redux/app-slice/app-slice";
import { updateEventPayload } from "@/redux/app-slice/type";
import { AppDispatch } from "@/redux/store";
import dayjs from "dayjs";
import { Edit } from "lucide-react";
import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";

export type EventListType = {
  date: string;
  eventsList: { id: string; description: string }[];
};

const EventList = memo(({ date, eventsList }: EventListType) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleEditEvent = useCallback(
    (event: updateEventPayload) => {
      dispatch(setUpdatingEvent(event));
      dispatch(setOpenCloseEventCreationModal(true));
    },
    [dispatch]
  );
  return (
    <div className="flex flex-col md:flex-row gap-3 items-start py-2 border-white rounded-md">
      <span className="w-[35%] max-sm:w-full text-xl max-sm:text-lg font-semibold text-loco-black-foreground">
        {dayjs(date).format("dddd, MMMM D, YYYY")}
      </span>
      <ul className="flex flex-col gap-3 list-none w-full">
        {eventsList.map((event) => (
          <li
            className="bg-loco-blue-foreground  p-2 w-[50%] max-sm:w-full max-w-full text-sm border-b-loco-blue hover:border-loco-blue transition-all flex items-center justify-between border-b-2"
            key={event.id}
          >
            <span className="text-loco-blue">{event.description}</span>
            <Edit
              size={16}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleEditEvent({
                  date: date,
                  id: event.id,
                  description: event.description,
                });
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
});

EventList.displayName = "EventList";
export default EventList;
