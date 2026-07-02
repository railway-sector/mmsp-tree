import Collection from "@arcgis/core/core/Collection";
import ActionButton from "@arcgis/core/support/actions/ActionButton";

export const cpField = "Package";
export const stationField = "Station1";
export type statisticsType = "count" | "sum";
export type TypeFieldType = "number" | "string";

// For Tree Cutting Pie Chart
export const treeCuttinStatusField = "TCP_Proces";
export const treeCuttingStatusLabels: string[] = [
  "For TCP Application",
  "Submitted to DENR",
  "With Permit-Not Yet Cut",
  "With Permit-Not Yet Earthballed",
  "Cut",
  "Earthballed",
  "TCP Expired",
];

export const treeCuttingStatusValues = [1, 2, 3, 4, 5, 6, 7];
export const colorsCutting = [
  "#71ab48",
  "#5e4fa2",
  "#ffff00",
  "#ffaa00",
  "#0073ff",
  "#3288bd",
  "#ff0000",
];

export const treeCuttingTypes = treeCuttingStatusLabels.map(
  (label: any, index: any) => {
    return Object.assign({
      category: label,
      value: treeCuttingStatusValues[index],
      color: colorsCutting[index],
    });
  },
);

// For Tree Compensation Chart
export const treeCompensationStatusField = "Tree_Compe";
export const treeCompensationStatusLabels: string[] = [
  "For Appraisal",
  "For Serving of RfD/OtC",
  "Served RfD/OtC",
  "For Legal Pass",
  "For Payment Processing/Obligation/Signing of ACRCT",
  "For Check Issuance",
  "Paid",
  "No Compensation",
  "For Donation",
  "Expro",
  "Right of Way Usage Agreement (ROWUA)",
];

export const colorsCompen = [
  "#ffff00",
  "#ff5500",
  "#ff73df",
  "#00a884",
  "#0073ff",
  "#ffaa00",
  "#3288bd",
  "#71ab48",
  "#0073ff",
  "#5e4fa2",
  "#ff0000",
  "#e1e1e1",
];
export const treeCompensationStatusValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const treeCompensationTypes = treeCompensationStatusLabels.map(
  (label: any, index: any) => {
    return Object.assign({
      category: label,
      value: treeCompensationStatusValues[index],
      color: colorsCompen[index],
    });
  },
);

// Layter list
export async function defineActions(event: any) {
  const { item } = event;
  await item.layer.when();

  if (item.title === "Commemorative Trees") {
    item.actionsSections = new Collection([
      new Collection([
        new ActionButton({
          title: "Zoom to Points",
          icon: "zoom-in-fixed",
          id: "full-extent-commemo-trees",
        }),
        new ActionButton({
          title: "Highlight Points",
          icon: "flash",
          id: "highlight-commemo-trees",
        }),
      ]),
    ]);
  }

  if (item.layer.type !== "group") {
    item.panel = {
      content: "legend",
      open: true,
    };
  }

  item.title === "Land Acquisition" ||
  item.title === "Commemorative Trees" ||
  item.title === "Tree Compensation"
    ? (item.visible = false)
    : (item.visible = true);
}

export const primaryLabelColor = "#9ca3af";
export const valueLabelColor = "#d1d5db";
