"use client";

import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOpenCloseEventCreationModal } from "@/redux/app-slice/app-slice";
import { AppDispatch, RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { viewTabsList } from "./config";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import AddUpdateEventModal from "@/components/event-management/event-management-modal";
import { useIsMobile } from "@/hooks/use-mobile";
import MonthChanger from "@/components/event-management/month-changer";

const MainHeader: React.FC = () => {
  const isMobile = useIsMobile();
  const dispatch = useDispatch<AppDispatch>();
  const { openEventCreationModal } = useSelector(
    (state: RootState) => state.appReducer
  );
  const router = useRouter();
  const path = usePathname();

  const handleCreateEvent = useCallback(() => {
    dispatch(setOpenCloseEventCreationModal(true));
  }, [dispatch]);

  return (
    <div
      className={cn(
        "flex relative w-full justify-between items-center bg-white  border-b",
        isMobile && "py-3"
      )}
    >
      <h1 className="text-loco-black-foreground max-sm:w-full font-mono text-3xl px-5  font-bold max-sm:text-2xl max-sm:text-center ">
        Event Shedular
      </h1>
      {!isMobile && <MonthChanger />}
      {!isMobile && (
        <div className="flex gap-5 h-full">
          <ul className="flex h-full  flex-wrap text-lg  font-semibold text-center ">
            {viewTabsList.map((tab, key) => {
              return (
                <li
                  key={key}
                  onClick={() => {
                    router.push(tab.route);
                  }}
                  className={cn(
                    "!cursor-pointer flex items-center px-3 h-full border-b-2 border-b-loco-black-foreground rounded-t-lg text-loco-black-foreground transition-all hover:bg-gray-50",
                    { "border-b-loco-blue text-loco-blue": path === tab.route }
                  )}
                >
                  {tab.label}
                </li>
              );
            })}
          </ul>
          <div className="p-4">
            <Button
              variant={"primary-blue"}
              className="font-medium"
              onClick={handleCreateEvent}
              size={isMobile ? "sm" : "lg"}
            >
              <Plus size={32} />
              Create Event
            </Button>
          </div>
        </div>
      )}
      <AddUpdateEventModal openModal={openEventCreationModal} />
    </div>
  );
};
export default MainHeader;
