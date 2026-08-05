import { useState, useEffect, useCallback } from "react";
import "./index.css";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@esri/calcite-components/dist/components/calcite-shell";
import MapDisplay from "./components/MapDisplay";
import ActionPanel from "./components/ActionPanel";
import Header from "./components/Header";
import MainChart from "./components/ChartMain";
import { authenticate } from "./autho";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MyContext } from "./contexts/MyContext";

//--- Create a client
const queryClient = new QueryClient();

export function App(): React.JSX.Element {
  //-------------------------------//
  //     Viewer Authentication     //
  //-------------------------------//
  const [loggedInState, setLoggedInState] = useState<boolean>(false);
  useEffect(() => {
    authenticate(setLoggedInState, "jU5UPrnUJtfGz40F");
  }, []);

  //-------------------------------//
  //        Create Context         //
  //-------------------------------//
  const [cpackage, setCpackage] = useState<any>();
  const updateCpackage = useCallback((newcp: any) => {
    setCpackage(newcp);
  }, []);

  const [station, setStation] = useState<any>();
  const updateStation = useCallback((newstation: any) => {
    setStation(newstation);
  }, []);

  return (
    <>
      {loggedInState === true && (
        <calcite-shell
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #555",
            "--calcite-color-background": "#2b2b2b",
          }}
        >
          <MyContext
            value={{ cpackage, updateCpackage, station, updateStation }}
          >
            <QueryClientProvider client={queryClient}>
              <ActionPanel />
              <MapDisplay />
              <MainChart />
              <Header />
            </QueryClientProvider>
          </MyContext>
        </calcite-shell>
      )}
    </>
  );
}

export default App;
