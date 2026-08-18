import { use, useMemo, useState } from "react";
import Select from "react-select";
import "../index.css";
import GenerateDropdownData from "dropdown-pkg-arcgis";
import { treeCuttingLayer } from "../layers";
import { MyContext } from "../contexts/MyContext";
import { useQuery } from "@tanstack/react-query";

const theme = {
  bg: "#2b2b2b",
  bgDisabled: "#232323",
  border: "#444444",
  borderHover: "#5a5a5a",
  borderFocus: "#6aa9ff",
  text: "#ffffff",
  textMuted: "#9a9a9a",
  optionFocused: "#3a3a3a",
  optionSelected: "#353535",
};

const customStyles = {
  container: (s: any) => ({ ...s, width: "200px" }),
  control: (s: any, { isDisabled, isFocused }: any) => ({
    ...s,
    backgroundColor: isDisabled ? theme.bgDisabled : theme.bg,
    borderColor: isFocused ? theme.borderFocus : theme.border,
    borderRadius: "6px",
    minHeight: "36px",
    boxShadow: "none",
    opacity: isDisabled ? 0.6 : 1,
    "&:hover": {
      borderColor: isFocused ? theme.borderFocus : theme.borderHover,
    },
  }),
  placeholder: (s: any) => ({ ...s, color: theme.textMuted }),
  singleValue: (s: any) => ({ ...s, color: theme.text }),
  input: (s: any) => ({ ...s, color: theme.text }),
  indicatorSeparator: (s: any) => ({ ...s, backgroundColor: theme.border }),
  dropdownIndicator: (s: any) => ({
    ...s,
    color: theme.textMuted,
    "&:hover": { color: theme.text },
  }),
  clearIndicator: (s: any) => ({
    ...s,
    color: theme.textMuted,
    "&:hover": { color: theme.text },
  }),
  menu: (s: any) => ({
    ...s,
    backgroundColor: theme.bg,
    border: `1px solid ${theme.border}`,
    overflow: "hidden",
  }),
  option: (s: any, { isFocused, isSelected }: any) => ({
    ...s,
    backgroundColor: isFocused
      ? theme.optionFocused
      : isSelected
        ? theme.optionSelected
        : theme.bg,
    color: theme.text,
    cursor: "pointer",
  }),
};

export default function DropdownData() {
  const { updateCpackage, updateStation } = use(MyContext);

  const [cpSelected, setCpSelected] = useState<null | any>(null);
  const [stationSelected, setstationSelected] = useState<null | any>(null);

  const { data: cpackageList } = useQuery<any>({
    queryKey: ["dropdownData"], // Do not add lotLayer as a dependency. The dropdown list will not be updated properly.
    queryFn: async () => {
      const dropdownData = new GenerateDropdownData(
        [treeCuttingLayer],
        ["Package", "Station1"],
      );
      return await dropdownData.dropDownQuery();
    },
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  //--- Avoid returning empty objects when the component is re-rendered.
  const stationList = useMemo(() => cpSelected?.field2 ?? [], [cpSelected]);

  //--- Update contract package
  const handleCpackageChange = (obj: any) => {
    updateCpackage(obj?.field1 ?? null);
    updateStation(null);
    setCpSelected(obj);
    setstationSelected(null);
  };

  //--- Update Land Type
  const handleLandtypeChange = (obj: any) => {
    updateStation(obj?.name ?? null);
    setstationSelected(obj);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        margin: "auto",
        gap: "7px",
        marginRight: "15%",
        marginTop: "5px",
      }}
    >
      <Select
        placeholder="Select CP"
        value={cpSelected}
        options={cpackageList && cpackageList}
        onChange={handleCpackageChange}
        getOptionLabel={(x: any) => x.field1}
        isClearable
        styles={customStyles}
      />
      <br />
      <Select
        placeholder="Select Station"
        value={stationSelected}
        options={stationList && stationList}
        onChange={handleLandtypeChange}
        getOptionLabel={(x: any) => x.name}
        isClearable
        styles={customStyles}
      />
    </div>
  );
}
