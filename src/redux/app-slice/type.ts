export type AppState = {
  currentMonth: string;
  events: Record<string, { description: string; id: string }[]>;
  activeMenuItem: MenuTabs;
  updatingEvent: null | { date: string; description: string };
  openEventCreationModal: boolean;
  selectedAddEventDate: string | null;
};

export type NewEventPayload = {
  date: string;
  description: string;
};

export type updateEventPayload = {
  date: string;
  id: string;
  description: string;
};

export enum MenuTabs {
  Month = "MONTH",
  EVENTS = "EVENTS",
}
