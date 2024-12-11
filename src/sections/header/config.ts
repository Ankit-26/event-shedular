import { routes } from "@/config-global";

export const viewTabsList: Record<string, string>[] = [
  {
    label: "Month",
    route: routes.eventShedule.month,
  },

  {
    label: "Events",
    route: routes.eventShedule.events,
  },
];
