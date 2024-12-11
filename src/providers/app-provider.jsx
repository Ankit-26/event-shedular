"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

function AppProvider({ children }) {
  return (
    <Provider store={store}>
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </Provider>
  );
}

export default AppProvider;
