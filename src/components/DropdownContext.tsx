import { useState } from "react";
import Select from "react-select";
import "../index.css";
import { treeCuttingLayer } from "../layers";
import { primaryLabelColor } from "../uniqueValues";
import GenerateDropdownData from "npm-dropdown-package";
import { locationKeys } from "../interfaceKeys";
import type { SelectedLocation } from "../interfaceKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function DropdownData() {
  const queryClient = useQueryClient();

  const [cpackageSelected, setCpackageSelected] = useState<null | any>(null);
  const [stationSelected, setStationSelected] = useState<null | any>(null);
  const [stationList, setStationList] = useState<any>([]);

  const { data: cpackageList } = useQuery<any>({
    queryKey: ["dropdownData"], // Do not add lotLayer as a dependency. The dropdown list will not be updated properly.
    queryFn: async () => {
      const dropdownData = new GenerateDropdownData(
        [treeCuttingLayer],
        ["Package", "Station1"],
      );
      return await dropdownData.dropDownQuery();
    },
    staleTime: Infinity, // never refetch in the backround. If not Inifity, it will refetch.
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  function updateDropdownListValues(
    cp_obj_field: SelectedLocation["cpackage"],
    station_obj_field: SelectedLocation["station"],
  ) {
    return queryClient.setQueryData<SelectedLocation>(locationKeys.selected, {
      cpackage: cp_obj_field,
      station: station_obj_field,
    });
  }

  const handleContractPackageChange = (obj: any) => {
    updateDropdownListValues(obj.field1, undefined);
    setCpackageSelected(obj);
    setStationList(obj.field2);
    setStationSelected(null);
  };

  const handleStationChange = (obj: any) => {
    updateDropdownListValues(cpackageSelected?.field1, obj.name);
    setStationSelected(obj);
  };

  // Style CSS
  const customstyles = {
    option: (styles: any, { isFocused, isSelected }: any) => {
      // const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isFocused
          ? "#555555"
          : isSelected
            ? "#2b2b2b"
            : "#2b2b2b",
        color: "#ffffff",
      };
    },

    control: (defaultStyles: any) => ({
      ...defaultStyles,
      backgroundColor: "#2b2b2b",
      borderColor: "#949494",
      height: 35,
      width: "170px",
      color: "#ffffff",
    }),
    singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "#fff" }),
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        margin: "auto",
        padding: "5px",
        borderRadius: "5px",
        zIndex: 999,
      }}
    >
      <b
        style={{
          color: primaryLabelColor,
          marginTop: "auto",
          marginBottom: "auto",
          marginRight: 10,
          fontSize: "0.9vw",
        }}
      >
        Contract Package
      </b>
      <Select
        placeholder="Select CP"
        value={cpackageSelected}
        options={cpackageList && cpackageList}
        onChange={handleContractPackageChange}
        getOptionLabel={(x: any) => x.field1}
        styles={customstyles}
      />
      <br />
      <b
        style={{
          color: primaryLabelColor,
          marginTop: "auto",
          marginBottom: "auto",
          marginRight: 10,
          marginLeft: 10,
          fontSize: "0.9vw",
        }}
      >
        Station
      </b>
      <Select
        placeholder="Select Station"
        value={stationSelected}
        options={stationList && stationList}
        onChange={handleStationChange}
        getOptionLabel={(x: any) => x.name}
        styles={customstyles}
      />
    </div>
  );
}
