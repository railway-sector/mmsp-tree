import { use, useMemo, useState } from "react";
import Select from "react-select";
import "../index.css";
import { treeCuttingLayer } from "../layers";
import GenerateDropdownData from "npm-dropdown-package";
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
  container: (s: any) => ({ ...s, width: "180px" }),
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

export function DropdownData() {
  const { updateCpackage, updateStation } = use(MyContext);
  const [cpackageSelected, setCpackageSelected] = useState<null | any>(null);
  const [stationSelected, setStationSelected] = useState<null | any>(null);

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

  const stationList = useMemo(
    () => cpackageSelected?.field2 ?? [],
    [cpackageSelected],
  );

  const handleContractPackageChange = (obj: any) => {
    updateCpackage(obj?.field1 ?? null);
    setCpackageSelected(obj);
    setStationSelected(null);
  };

  const handleStationChange = (obj: any) => {
    updateStation(obj?.name ?? null);
    setStationSelected(obj);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        // margin: "auto",
        marginTop: "5px",
        gap: "12px",
      }}
    >
      <Select
        placeholder="Select CP"
        value={cpackageSelected}
        options={cpackageList && cpackageList}
        onChange={handleContractPackageChange}
        getOptionLabel={(x: any) => x.field1}
        isClearable
        styles={customStyles}
      />
      <br />
      <Select
        placeholder="Select Station"
        value={stationSelected}
        options={stationList && stationList}
        onChange={handleStationChange}
        getOptionLabel={(x: any) => x.name}
        isClearable
        styles={customStyles}
      />
    </div>
  );
}
