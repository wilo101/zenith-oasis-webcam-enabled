import { createContext } from "react";

export type LayoutContextValue = {
  requestTour: () => void;
} | null;

const LayoutContext = createContext<LayoutContextValue>(null);

export default LayoutContext;

