import Collection from "@arcgis/core/core/Collection";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import ActionButton from "@arcgis/core/support/actions/ActionButton";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";

//----------------------------------------------//
//              portalItem                      //
//----------------------------------------------//
const portalItem_url = { url: "https://gis.railway-sector.com/portal" };

export const portalItems = (id: any) => {
  return { id: id, portal: portalItem_url };
};

//----------------------------------------------//
//              Chart Parameters                //
//----------------------------------------------//
export const chart_width = "26vw";
export const chart_box_width = 250;

export const construction_status = [
  "To be Constructed",
  "Under Construction",
  "Completed",
];

export const labelColor = "#9ca3af";
export const valueColor = "#d1d5db";

//----------------------------------------------//
//            Alignment Layers                  //
//----------------------------------------------//
//--- STATION LAYER ---//
export const station_labels = new LabelClass({
  labelExpressionInfo: { expression: "$feature.Station1" },
  symbol: {
    type: "text",
    color: "black",
    haloColor: "white",
    haloSize: 1,
    font: { size: 10, weight: "bold" },
  },
});

//--- CONSTRUCTION BOUNDARY ---//
export const c_boundary_renderer = new UniqueValueRenderer({
  field: "MappingBoundary",
  uniqueValueInfos: [
    {
      value: 1,
      label: "",
      symbol: new SimpleFillSymbol({
        style: "none",
        outline: { width: 2.5, color: [255, 255, 255], style: "short-dash" },
      }),
    },
  ],
});

export const cpField = "Package";
export const stationField = "Station1";
export type statisticsType = "count" | "sum";
export type TypeFieldType = "number" | "string";

//----------------------------------------------//
//          Lot Layer Parameters                //
//----------------------------------------------//
export const lot_id_f = "Id";
export const lot_status_f = "StatusNVS3";
export const lot_xho_f = "not_yet";
export const lot_ho_f = "HandedOver";
export const lot_hod_f = "HandOverDate";
export const lot_hoy_f = "HandedOverYear";
export const cp_f = "Package";
export const lot_type_f = "Type";
export const lot_section_f = "Station1";
export const lot_remarks_f = "REMARKS";
export const lot_issue_f = "Issue";

export const lot_status_q = [
  { value: 1, category: "Paid", color: "#70ad47" },
  { value: 2, category: "For Payment Processing", color: "#0070ff" },
  { value: 3, category: "For Legal Pass", color: "#ffff00" },
  { value: 4, category: "For Appraisal/Offer to Buy", color: "#ffaa00" },
  { value: 5, category: "For Expro", color: "#ff0000" },
  { value: 6, category: "with WOP Fully Turned-over", color: "#00734c" },
  { value: 7, category: "ROWUA/TUA", color: "#55ff00" },
  { value: 8, category: "Signed ROWUA/TUA", color: "#C1E1C1" },
];

export const lot_symbol = new SimpleFillSymbol({
  color: [0, 0, 0, 0],
  style: "solid",
  outline: { color: [110, 110, 110], width: 0.7 },
});

export const lot_uniqueV: any = lot_status_q.map((f: any) => {
  return {
    value: f.value,
    label: f.category,
    symbol: new SimpleFillSymbol({ color: f.color }),
  };
});

export const lot_status_renderer = new UniqueValueRenderer({
  field: lot_status_f,
  defaultSymbol: lot_symbol,
  uniqueValueInfos: lot_uniqueV,
});

export const lot_id_label = new LabelClass({
  symbol: new TextSymbol({ color: "black", font: { size: 8 } }),
  labelExpressionInfo: { expression: "$feature.CN" },
});

export const lot_popup = {
  title: "<p>{Id}</p>",
  lastEditInfoEnabled: false,
  returnGeometry: true,
  content: [
    {
      type: "fields",
      fieldInfos: [
        { fieldName: "OWNER", label: "Land Owner" },
        { fieldName: "Station1" },
        { fieldName: "StatusNVS3", label: "<p>Status of Land Acquisition</p>" },
        { fieldName: "HandOverDate", label: "Handed-over date" },
      ],
    },
  ],
};

//---------------------------------------------//
//        Tree Cutting & Compensation          //
//---------------------------------------------//
//--- COMMON PARAMETERS ---//
export const tree_sci_name_f = "Scientific";
export const tree_com_name_f = "Common_Nam";
const outlineColor = "gray";

export const tree_popup = {
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
};

// Feature reduction
export const clusterConfig: any = {
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
//--- TREE CUTTING LAYER ---//
//--- Status Query
export const treec_status_f = "TCP_Proces";
export const treec_status_q = [
  { value: 1, category: "For TCP Application", color: "#71ab48" },
  { value: 2, category: "Submitted to DENR", color: "#5e4fa2" },
  { value: 3, category: "With Permit - Not yet cut", color: "#ffff00" },
  {
    value: 4,
    category: "With Permit - Not yet earth-balled",
    color: "#ffaa00",
  },
  { value: 5, category: "Cut", color: "#0073ff" },
  { value: 6, category: "Earthballed", color: "#3288bd" },
  { value: 7, category: "TCP Expired", color: "#ff0000" },
];

export const treec_uniqueV = treec_status_q.map((f: any) => {
  return {
    value: f.value,
    label: f.category,
    symbol: new SimpleMarkerSymbol({
      size: 5,
      color: f.color,
      outline: { width: 0.5, color: outlineColor },
    }),
  };
});

export const treec_render = new UniqueValueRenderer({
  field: treec_status_f,
  uniqueValueInfos: treec_uniqueV,
});

//--- TREE COMPENSATION LAYER ---//
export const treem_status_f = "Tree_Compe";
export const treem_status_q = [
  { value: 1, category: "For Appraisal", color: "#ffff00" },
  { value: 2, category: "For Serving of RfD/OtC", color: "#ff5500" },
  { value: 3, category: "Served RfD/OtC", color: "#ff73df" },
  { value: 4, category: "For Legal Pass", color: "#00a884" },
  {
    value: 5,
    category: "For Payment Processing/Obligation/Signing of ACRCT",
    color: "#0073ff",
  },
  { value: 6, category: "For Check Issuance", color: "#ffaa00" },
  { value: 7, category: "Paid", color: "#3288bd" },
  { value: 8, category: "No Compensation", color: "#71ab48" },
  { value: 9, category: "For Donation", color: "#0073ff" },
  { value: 10, category: "Expro", color: "#5e4fa2" },
  {
    value: 11,
    category: "Right of Way Usage Agreement (ROWUA)",
    color: "#ff0000",
  },
];

export const treem_uniqueV = treem_status_q.map((f: any) => {
  return {
    value: f.value,
    label: f.category,
    symbol: new SimpleMarkerSymbol({
      size: 5,
      color: f.color,
      outline: { width: 0.5, color: outlineColor },
    }),
  };
});

export const treem_renderer = new UniqueValueRenderer({
  field: treem_status_f,
  uniqueValueInfos: treem_uniqueV,
});

//--- COMMEMORATIVE TREES LAYER ---//
export const treecom_renderer = new SimpleRenderer({
  symbol: new SimpleMarkerSymbol({
    size: 10,
    color: "#FFFF00",
    outline: { width: 0.5, color: "white" },
  }),
});

export const treecom_label = new LabelClass({
  symbol: new TextSymbol({
    color: "white",
    font: { size: 12, weight: "bold" },
  }),
  labelPlacement: "above-center",
  labelExpressionInfo: { expression: "$feature.Common_Nam" },
});

export const treecom_popup = {
  lastEditInfoEnabled: false,
  content: [
    {
      type: "fields",
      fieldInfos: [{ fieldName: "Common_Nam", label: "Common name" }],
    },
  ],
};

//---------------------------------------------//
//              Layer List                     //
//---------------------------------------------//
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
    item.panel = { content: "legend", open: true };
  }

  item.title === "Land Acquisition" ||
  item.title === "Commemorative Trees" ||
  item.title === "Tree Compensation"
    ? (item.visible = false)
    : (item.visible = true);
}
