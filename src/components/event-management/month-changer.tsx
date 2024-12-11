import React, { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import { setCurrentMonth } from "@/redux/app-slice/app-slice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

function MonthChanger() {
  const dispatch = useDispatch<AppDispatch>();
  const { currentMonth } = useSelector((state: RootState) => state.appReducer);
  const handlePrevMonth = useCallback(() => {
    const prevMonth = dayjs(currentMonth).subtract(1, "month").toISOString();
    dispatch(setCurrentMonth(prevMonth));
  }, [currentMonth, dispatch]);

  const handleNextMonth = useCallback(() => {
    const nextMonth = dayjs(currentMonth).add(1, "month").toISOString();
    dispatch(setCurrentMonth(nextMonth));
  }, [currentMonth, dispatch]);
  return (
    <div className="flex items-center space-x-4 p-4 absolute ml-[50%] -translate-x-[50%]">
      <ChevronLeft onClick={handlePrevMonth} className="cursor-pointer" />
      <span className="font-semibold text-lg min-w-[9rem] text-center text-loco-black-foreground">
        {dayjs(currentMonth).format("MMMM YYYY")}
      </span>
      <ChevronRight onClick={handleNextMonth} className="cursor-pointer" />
    </div>
  );
}

export default MonthChanger;
