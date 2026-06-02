import { createContext } from "react";

type MyDropdownContextType = {
  contractpackages: any;
  stations: any;
  chartPanelwidth: any;
  updateContractPackage: any;
  updateStations: any;
  updateChartPanelwidth: any;
};

const initialState = {
  contractpackages: undefined,
  stations: undefined,
  chartPanelwidth: undefined,
  updateContractPackage: undefined,
  updateStations: undefined,
  updateChartPanelwidth: undefined,
};

export const MyContext = createContext<MyDropdownContextType>({
  ...initialState,
});
