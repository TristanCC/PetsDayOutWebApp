// contexts/PresentCountContext.js
import { createContext } from "react";

export const PresentCountContext = createContext({
  presentCount: 0,
  setPresentCount: () => {}
});