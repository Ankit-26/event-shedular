import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AppState,
  MenuTabs,
  NewEventPayload,
  updateEventPayload,
} from "./type";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

const initialState: AppState = {
  currentMonth: dayjs().toISOString(),
  events: {
    "2024-12-05": [{ id: "1", description: "UX Webinar" }],
    "2024-12-10": [{ id: "2", description: "Workshops Webinar" }],
    "2024-12-14": [{ id: "3", description: "UI Webinar" }],
    "2024-12-19": [{ id: "4", description: "Figma Basic Course" }],
    "2024-12-22": [{ id: "5", description: "Figma Advanced Course" }],
    "2024-12-24": [{ id: "6", description: "UX Research Course" }],
    "2024-12-25": [
      { id: "7", description: "Another Event" },
      { id: "9", description: "One More Event" },
      { id: "10", description: "Another Event" },
      { id: "11", description: "One More Event" },
      { id: "12", description: "Another Event" },
      { id: "13", description: "One More Event" },
      { id: "14", description: "Another Event" },
      { id: "15", description: "One More Event" },
    ],
  },
  activeMenuItem: MenuTabs.Month,
  updatingEvent: null,
  openEventCreationModal: false,
  selectedAddEventDate: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentActiveMenu: (state, action: PayloadAction<MenuTabs>) => {
      state.activeMenuItem = action.payload;
    },
    setCurrentMonth: (state, action: PayloadAction<string>) => {
      state.currentMonth = action.payload;
    },
    setEvents: (state, action: PayloadAction<NewEventPayload>) => {
      const date = action.payload.date;
      if (date in state.events) {
        state.events[date].push({
          id: uuidv4(),
          description: action.payload.description,
        });
      } else {
        state.events[date] = [
          {
            id: uuidv4(),
            description: action.payload.description,
          },
        ];
      }
    },
    setSelectedAddEventDate: (state, action: PayloadAction<string | null>) => {
      state.selectedAddEventDate = action.payload;
    },
    setUpdatingEvent: (
      state,
      action: PayloadAction<updateEventPayload | null>
    ) => {
      state.updatingEvent = action.payload;
    },
    updateEvent: (state, action: PayloadAction<updateEventPayload>) => {
      const date = action.payload.date;
      if (date in state.events) {
        const eventIndex = state.events[date].findIndex(
          (event) => event.id === action.payload.id
        );
        if (eventIndex !== -1) {
          state.events[date][eventIndex].description =
            action.payload.description;
        }
      } else {
        state.events[date] = [
          {
            id: action.payload.id,
            description: action.payload.description,
          },
        ];
      }
    },
    setOpenCloseEventCreationModal: (state, action: PayloadAction<boolean>) => {
      state.openEventCreationModal = action.payload;
    },
  },
});

export const {
  setCurrentActiveMenu,
  setCurrentMonth,
  updateEvent,
  setEvents,
  setOpenCloseEventCreationModal,
  setUpdatingEvent,
  setSelectedAddEventDate,
} = appSlice.actions;
export default appSlice.reducer;
