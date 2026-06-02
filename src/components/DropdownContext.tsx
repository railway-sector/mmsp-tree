import { useEffect, useState, use } from "react";
import Select from "react-select";
import "../index.css";
import { treeCuttingLayer } from "../layers";
import { primaryLabelColor } from "../uniqueValues";
import { MyContext } from "../contexts/MyContext";
import GenerateDropdownData from "npm-dropdown-package";

export function DropdownData() {
  const { updateContractPackage, updateStations } = use(MyContext);

  // For dropdown filter
  const [initContractPacakge, setInitContractPacakge] = useState<any>([]);
  const [contractPackage, setContractPackage] = useState<any>(null);
  const [station, setStation] = useState<any>(null);
  const [stationList, setStationList] = useState([]);

  useEffect(() => {
    const dropdownData = new GenerateDropdownData(
      [treeCuttingLayer],
      ["Package", "Station1"],
    );

    dropdownData.dropDownQuery().then((response: any) => {
      setInitContractPacakge(response);
    });
  }, []);

  const handleContractPackageChange = (obj: any) => {
    setContractPackage(obj);
    setStationList(obj.field2);
    setStation(null);
    updateContractPackage(obj.field1);
  };

  const handleStationChange = (obj: any) => {
    setStation(obj);
    updateStations(obj.name);
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
        value={contractPackage}
        options={initContractPacakge}
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
        value={station}
        options={stationList}
        onChange={handleStationChange}
        getOptionLabel={(x: any) => x.name}
        styles={customstyles}
      />
    </div>
  );
}
