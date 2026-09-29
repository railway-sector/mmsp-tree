import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";

// ============================================================
// DEFINITIONS
// ============================================================

// Fields
export const lotStatusField = "StatusNVS3";
export const treeCuttingStatusField = "TCP_Proces";
export const treeCompensationStatusField = "Tree_Compe";
export const treeStatisticField = "OBJECTID";

// Lot statuses
export const lotStatuses = [
  { code: 1, label: "Paid",                       color: "#70AD47" },
  { code: 2, label: "For Payment Processing",     color: "#0070FF" },
  { code: 3, label: "For Legal Pass",             color: "#FFFF00" },
  { code: 4, label: "For Appraisal/Offer to Buy", color: "#FFAA00" },
  { code: 5, label: "For Expro",                  color: "#FF0000" },
  { code: 6, label: "with WOP Fully Turned-over", color: "#00734C" },
  { code: 7, label: "ROWUA/TUA",                  color: "#55FF00" },
  { code: 8, label: "Signed ROWUA/TUA",           color: "#B2CFB2" },
];

// Tree cutting statuses
export const treeCuttingStatuses = [
  { code: 1, label: "For TCP Application",                color: "#71ab48" },
  { code: 2, label: "Submitted to DENR",                  color: "#5e4fa2" },
  { code: 3, label: "With Permit - Not yet cut",          color: "#ffff00" },
  { code: 4, label: "With Permit - Not yet earth-balled", color: "#ffaa00" },
  { code: 5, label: "Cut",                                color: "#0073ff" },
  { code: 6, label: "Earthballed",                        color: "#3288bd" },
  { code: 7, label: "TCP Expired",                        color: "#ff0000" },
];

// Tree compensation statuses
export const treeCompensationStatuses = [
  { code: 1,  label: "For Appraisal",                                      color: "#ffff00" },
  { code: 2,  label: "For Serving of RfD/OtC",                             color: "#ff5500" },
  { code: 3,  label: "Served RfD/OtC",                                     color: "#ff73df" },
  { code: 4,  label: "For Legal Pass",                                     color: "#00a884" },
  { code: 5,  label: "For Payment Processing/Obligation/Signing of ACRCT", color: "#0073ff" },
  { code: 6,  label: "For Check Issuance",                                 color: "#ffaa00" },
  { code: 7,  label: "Paid",                                               color: "#3288bd" },
  { code: 8,  label: "No Compensation",                                    color: "#71ab48" },
  { code: 9,  label: "For Donation",                                       color: "#0073ff" },
  { code: 10, label: "Expro",                                              color: "#5e4fa2" },
  { code: 11, label: "Right of Way Usage Agreement (ROWUA)",               color: "#ff0000" },
];

// ============================================================
// RENDERERS
// ============================================================

// Lots: status colors, hatch for Public Land (no status)
const lotLayerRenderer = new UniqueValueRenderer({
  field: lotStatusField,
  uniqueValueInfos: lotStatuses.map(({ code, label, color }) => ({
    value: code,
    label,
    symbol: new SimpleFillSymbol({
      color,
      outline: { color: "#ffffff", width: 0.5 },
    }),
  })),
  defaultSymbol: new SimpleFillSymbol({
    style: "backward-diagonal",
    color: "#d9d9d9",
    outline: { color: "#d9d9d9", width: 0.5 },
  }),
  defaultLabel: "Public Land",
});

// Trees: shared marker per status color
const treeStatusSymbol = (color: string) =>
  new SimpleMarkerSymbol({
    size: 5,
    color,
    outline: { width: 0.5, color: "gray" },
  });

const treeCuttingRenderer = new UniqueValueRenderer({
  field: treeCuttingStatusField,
  uniqueValueInfos: treeCuttingStatuses.map(({ code, label, color }) => ({
    value: code,
    label,
    symbol: treeStatusSymbol(color),
  })),
});

const treeCompensationRenderer = new UniqueValueRenderer({
  field: treeCompensationStatusField,
  uniqueValueInfos: treeCompensationStatuses.map(({ code, label, color }) => ({
    value: code,
    label,
    symbol: treeStatusSymbol(color),
  })),
});

const commemorativeTreeRenderer = new SimpleRenderer({
  symbol: new SimpleMarkerSymbol({
    size: 10,
    color: "#FFFF00",
    outline: { width: 0.5, color: "white" },
  }),
});

// ============================================================
// POPUPS
// ============================================================

const lotPopupTemplate = new PopupTemplate({
  title: "{Package} — {Type}",
  content: [
    {
      type: "fields",
      fieldInfos: [
        { fieldName: "OWNER", label: "Land Owner" },
        { fieldName: lotStatusField, label: "Status" },
        { fieldName: "Package", label: "Package" },
        { fieldName: "Type", label: "Type" },
        { fieldName: "Station1", label: "Station" },
      ],
    },
  ],
});

const treePopupTemplate = new PopupTemplate({
  lastEditInfoEnabled: false,
  content: [
    {
      type: "fields",
      fieldInfos: [
        { fieldName: "Scientific", label: "Scientific Name" },
        { fieldName: "Common_Nam", label: "Common Name" },
        { fieldName: "TreeStatus", label: "Tree Status" },
        { fieldName: "Recom", label: "Recommendation" },
        { fieldName: "City" },
        { fieldName: "Id", label: "Tree ID" },
        { fieldName: "TCP_Process", label: "Tree Cutting" },
        { fieldName: "Remarks2", label: "Remarks" },
        { fieldName: "Compensation", label: "Status of Tree Compensation" },
        { fieldName: "Conservation", label: "Conservation Status" },
      ],
    },
  ],
});

const commemorativeTreePopupTemplate = new PopupTemplate({
  lastEditInfoEnabled: false,
  content: [
    {
      type: "fields",
      fieldInfos: [{ fieldName: "Common_Nam", label: "Common name" }],
    },
  ],
});

// ============================================================
// LABELS & CLUSTERING
// ============================================================

// Lot number, visible past 1:10,000
const lotCnLabelClass = new LabelClass({
  labelExpressionInfo: { expression: "$feature.CN" },
  symbol: new TextSymbol({
    color: "#000000",
    haloColor: "#ffffff",
    haloSize: 1,
    font: { size: 9, family: "sans-serif" },
  }),
  minScale: 10000,
  maxScale: 0,
});

const commemorativeTreeLabelClass = new LabelClass({
  symbol: new TextSymbol({
    color: "white",
    font: { size: 12, weight: "bold" },
  }),
  labelPlacement: "above-center",
  labelExpressionInfo: { expression: "$feature.Common_Nam" },
});

// Groups nearby trees into numbered circles
const treeClusterConfig: any = {
  type: "cluster",
  clusterRadius: "100px",
  popupTemplate: {
    title: "Cluster summary",
    content: "This cluster represents {cluster_count} trees.",
    fieldInfos: [
      {
        fieldName: "cluster_count",
        format: { places: 0, digitSeparator: true },
      },
    ],
  },
  clusterMinSize: "24px",
  clusterMaxSize: "60px",
  labelingInfo: [
    {
      deconflictionStrategy: "none",
      labelExpressionInfo: {
        expression: "Text($feature.cluster_count, '#,###')",
      },
      symbol: {
        type: "text",
        color: "white",
        haloColor: "black",
        haloSize: "1px",
        font: { weight: "bold", family: "Noto Sans", size: "12px" },
      },
      labelPlacement: "center-center",
    },
  ],
};

// ============================================================
// LAYERS
// ============================================================

// --- Lots (standalone, hidden by default) ---
export const lotLayer = new FeatureLayer({
  portalItem: {
    id: "93790e8102f84713a69e562da12bb415",
    portal: { url: "https://gis.railway-sector.com/portal" },
  },
  outFields: [lotStatusField, "OWNER", "Package", "Type", "Station1", "CN"],
  layerId: 31,
  title: "Acquisition Status",
  renderer: lotLayerRenderer,
  popupTemplate: lotPopupTemplate,
  labelingInfo: [lotCnLabelClass],
  labelsVisible: true,
  listMode: "show",
  visible: false,
});

// --- Boundary ---
export const constructionBoundaryLayer = new FeatureLayer({
  portalItem: {
    id: "0c172b82ddab44f2bb439542dd75e8ae",
    portal: { url: "https://gis.railway-sector.com/portal" },
  },
  outFields: [],
  layerId: 4,
  title: "Construction Boundary",
  opacity: 1,
  popupEnabled: false,
  listMode: "show",
  visible: true,
});

// Label scale is set in the portal item
export const stationBoxLayer = new FeatureLayer({
  portalItem: {
    id: "52d4f29105934e3f95f6b39c7e5fba6e",
    portal: { url: "https://gis.railway-sector.com/portal" },
  },
  outFields: [],
  layerId: 2,
  title: "Station Box",
  opacity: 0.7,
  popupEnabled: false,
  listMode: "show",
});

export const boundaryGroupLayer = new GroupLayer({
  title: "Boundary",
  visibilityMode: "independent",
  layers: [constructionBoundaryLayer, stationBoxLayer],
  visible: true,
  listMode: "show",
});

// --- Trees (one shown at a time) ---
export const treeCuttingLayer = new FeatureLayer({
  portalItem: {
    id: "4475f1bb9ad04dbda552879188ac1b6c",
    portal: { url: "https://gis.railway-sector.com/portal" },
  },
  elevationInfo: { mode: "on-the-ground" },
  featureReduction: treeClusterConfig,
  title: "Tree Cutting",
  visible: true,
  renderer: treeCuttingRenderer,
  popupTemplate: treePopupTemplate,
});

export const treeCompensationLayer = new FeatureLayer({
  portalItem: {
    id: "4475f1bb9ad04dbda552879188ac1b6c",
    portal: { url: "https://gis.railway-sector.com/portal" },
  },
  featureReduction: treeClusterConfig,
  title: "Tree Compensation",
  renderer: treeCompensationRenderer,
  visible: false,
  popupTemplate: treePopupTemplate,
});

export const commemorativeTreeLayer = new FeatureLayer({
  portalItem: {
    id: "4475f1bb9ad04dbda552879188ac1b6c",
    portal: { url: "https://gis.railway-sector.com/portal" },
  },
  definitionExpression: "Remarks2 = 'Commemorative'",
  elevationInfo: { mode: "on-the-ground" },
  layerId: 1,
  title: "Commemorative Trees",
  renderer: commemorativeTreeRenderer,
  labelingInfo: [commemorativeTreeLabelClass],
  visible: false,
  popupTemplate: commemorativeTreePopupTemplate,
});

export const treeGroupLayer = new GroupLayer({
  title: "Trees",
  visible: true,
  visibilityMode: "exclusive",
  layers: [commemorativeTreeLayer, treeCompensationLayer, treeCuttingLayer],
});

// --- Land acquisition date table (no geometry) ---
export const DateTable = new FeatureLayer({
  portalItem: {
    id: "a084d9cae5234d93b7aa50f7eb782aec",
    portal: { url: "https://gis.railway-sector.com/portal" },
  },
  outFields: ["category", "date"],
});