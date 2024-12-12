import React, { useCallback, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { updateEventPayload } from "@/redux/app-slice/type";
import {
  setEvents,
  setOpenCloseEventCreationModal,
  setSelectedAddEventDate,
  setUpdatingEvent,
  updateEvent,
} from "@/redux/app-slice/app-slice";

const eventSchema = z.object({
  date: z
    .date({
      required_error: "Date is required",
    })
    .nullable()
    .refine((date) => date !== null, "Please select a date"),
  description: z.string().min(1, "Description is required"),
});

type EventForm = z.infer<typeof eventSchema>;

const AddUpdateEventModal = ({ openModal }: { openModal: boolean }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { updatingEvent, selectedAddEventDate } = useSelector(
    (state: RootState) => state.appReducer
  );
  const form = useForm<EventForm>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      date: dayjs().toDate(),
      description: "",
    },
  });

  useEffect(() => {
    if (updatingEvent) {
      form.setValue("date", dayjs(updatingEvent.date).toDate());
      form.setValue("description", updatingEvent.description);
    }
    if (selectedAddEventDate) {
      form.setValue("date", dayjs(selectedAddEventDate).toDate());
    }
  }, [updatingEvent, selectedAddEventDate]);

  const onSubmit = useCallback(
    (data: EventForm) => {
      if (updatingEvent) {
        dispatch(
          updateEvent({
            date: dayjs(data.date).format("YYYY-MM-DD"),
            id: (updatingEvent as updateEventPayload).id,
            description: data.description,
          })
        );
      } else {
        dispatch(
          setEvents({
            date: dayjs(data.date).format("YYYY-MM-DD"),
            description: data.description,
          })
        );
      }
      form.reset();
      dispatch(setOpenCloseEventCreationModal(false));
    },
    [updatingEvent, dispatch, form]
  );

  const handleCLoseModal = useCallback(
    (open: boolean) => {
      dispatch(setOpenCloseEventCreationModal(open));
      if (!open) {
        form.reset();
        dispatch(setUpdatingEvent(null));
        dispatch(setSelectedAddEventDate(null));
      }
    },
    [form, dispatch]
  );

  return (
    <Dialog open={openModal} onOpenChange={handleCLoseModal}>
      <DialogContent aria-describedby="event-modal">
        <DialogHeader>
          <DialogTitle>
            {updatingEvent ? "Update Event" : "Add Event"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 mt-5"
          >
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger className="!ring-0" asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal ring-0",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        classNames={{
                          day_selected:
                            "bg-loco-blue-foreground hover:!bg-loco-blue-foreground",
                          day_today: cn(
                            dayjs(field.value).isSame(dayjs(), "day") && ""
                          ),
                        }}
                        selected={field.value}
                        onSelect={(selected) => field.onChange(selected)}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Event Description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant={"primary-blue"}
                disabled={
                  form.getValues("description").length === 0 &&
                  !form.formState.isDirty
                }
                type="submit"
              >
                {updatingEvent ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default AddUpdateEventModal;
