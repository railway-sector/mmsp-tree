import { createContext } from "react";

type MyDropdownContextType = {
  cpackage: any;
  updateCpackage: any;
  station: any;
  updateStation: any;
};

const initialState = {
  cpackage: undefined,
  updateCpackage: undefined,
  station: undefined,
  updateStation: undefined,
};

export const MyContext = createContext<MyDropdownContextType>({
  ...initialState,
});
