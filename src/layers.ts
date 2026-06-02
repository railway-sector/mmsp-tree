import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import TextSymbol from "@arcgis/core/symbols/TextSymbol.js";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import QueryExpressionLayers from "query-layers-expression";
import {
  colorsCompen,
  colorsCutting,
  treeCompensationStatusLabels,
  treeCompensationStatusValues,
  treeCuttingStatusLabels,
  treeCuttingStatusValues,
} from "./uniqueValues";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";

export const queryc = new QueryExpressionLayers(
  undefined,
  undefined,
  undefined,
  undefined,
  "string",
  0,
  undefined,
  undefined,
  undefined,
);

export const queryc2 = new QueryExpressionLayers(
  undefined,
  undefined,
  undefined,
  undefined,
  "string",
  0,
  undefined,
  undefined,
  undefined,
);

export const queryc3 = new QueryExpressionLayers(
  undefined,
  undefined,
  undefined,
  undefined,
  "string",
  0,
  undefined,
  undefined,
  undefined,
);

export const queryc4 = new QueryExpressionLayers(
  undefined,
  undefined,
  undefined,
  undefined,
  "string",
  0,
  undefined,
  undefined,
  undefined,
);

/* Standalone table for Dates */
export const dateTable = new FeatureLayer({
  portalItem: {
    id: "a084d9cae5234d93b7aa50f7eb782aec",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
});

/* Station Layer */
const stationLabels = new LabelClass({
  labelExpressionInfo: { expression: "$feature.Station1" },
  symbol: {
    type: "text",
    color: "black",
    haloColor: "white",
    haloSize: 1,
    font: {
      size: 10,
      weight: "bold",
    },
  },
});

export const stationLayer = new FeatureLayer({
  portalItem: {
    id: "52d4f29105934e3f95f6b39c7e5fba6e",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  labelingInfo: [stationLabels],
  title: "Station",
  definitionExpression: "Project = 'MMSP'",
  //screenSizePerspectiveEnabled: false, // gives constant size regardless of zoom
});

/* Construction Boundary*/
const ConstructionBoundaryFill = new UniqueValueRenderer({
  field: "MappingBoundary",
  uniqueValueInfos: [
    {
      value: 1,
      label: "",
      symbol: new SimpleFillSymbol({
        color: [0, 0, 0, 0],
        outline: {
          width: 2.5,
          color: [255, 255, 255],
          style: "short-dash",
        },
      }),
    },
  ],
});

export const constructionBoundaryLayer = new FeatureLayer({
  portalItem: {
    id: "0c172b82ddab44f2bb439542dd75e8ae",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 4,
  renderer: ConstructionBoundaryFill,
  definitionExpression: "MappingBoundary = 1",
  title: "Construction Boundary",
  elevationInfo: {
    mode: "on-the-ground",
  },
  popupEnabled: false,
});

/* Lot Layer*/
const lotColor = [
  [112, 173, 71],
  [0, 112, 255],
  [255, 255, 0],
  [255, 170, 0],
  [255, 0, 0],
  [0, 115, 76],
];

const defaultSymbolLot = new SimpleFillSymbol({
  color: [0, 0, 0, 0],
  style: "solid",
  outline: new SimpleLineSymbol({
    color: [110, 110, 110],
    width: 0.7,
  }),
});

const lotLayerStatusRenderer = new UniqueValueRenderer({
  field: "StatusNVS3",
  defaultSymbol: defaultSymbolLot,
  uniqueValueInfos: [
    {
      value: 1,
      label: "Paid",
      symbol: new SimpleFillSymbol({
        color: lotColor[0],
      }),
    },
    {
      value: 2,
      label: "For Payment Processing",
      symbol: new SimpleFillSymbol({
        color: lotColor[1],
      }),
    },
    {
      value: 3,
      label: "For Legal Pass",
      symbol: new SimpleFillSymbol({
        color: lotColor[2],
      }),
    },
    {
      value: 4,
      label: "For Appraisal/Offer to Buy",
      symbol: new SimpleFillSymbol({
        color: lotColor[3],
      }),
    },
    {
      value: 5,
      label: "For Expro",
      symbol: new SimpleFillSymbol({
        color: lotColor[4],
      }),
    },
    {
      value: 6,
      label: "with WOP Fully Turned-over",
      symbol: new SimpleFillSymbol({
        color: lotColor[5],
      }),
    },
  ],
});

// const lotLabel = new LabelClass({
//   symbol: new TextSymbol({
//     color: "black",
//     font: {
//       family: "Gill Sans",
//       size: 8,
//     },
//   }),
//   labelPlacement: "above-center",
//   labelExpressionInfo: {
//     expression: "$feature.CN",
//   },
// });

export const lotLayer = new FeatureLayer({
  portalItem: {
    id: "0c172b82ddab44f2bb439542dd75e8ae",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 8,
  title: "Land Acquisition",
  renderer: lotLayerStatusRenderer,
  popupEnabled: false,
});

/* Tree cutting layer */
const outlineColor = "gray";

const uniqueValueInfos_treeCutting = treeCuttingStatusLabels.map(
  (label: any, index: any) => {
    return Object.assign({
      value: treeCuttingStatusValues[index],
      label: label,
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCutting[index], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    });
  },
);

export const treeCuttingRenderer = new UniqueValueRenderer({
  field: "TCP_Proces",
  uniqueValueInfos: uniqueValueInfos_treeCutting,
});

const clusterConfig: any = {
  type: "cluster",
  clusterRadius: "100px",
  popupTemplate: {
    title: "Cluster summary",
    content: "This cluster represents {cluster_count} trees.",
    fieldInfos: [
      {
        fieldName: "cluster_count",
        format: {
          places: 0,
          digitSeparator: true,
        },
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
        font: {
          weight: "bold",
          family: "Noto Sans",
          size: "12px",
        },
      },
      labelPlacement: "center-center",
    },
  ],
};

export const treeCuttingLayer = new FeatureLayer({
  portalItem: {
    id: "4475f1bb9ad04dbda552879188ac1b6c",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  elevationInfo: {
    mode: "on-the-ground",
  },
  layerId: 1,
  featureReduction: clusterConfig,
  title: "Tree Cutting",
  visible: true,
  renderer: treeCuttingRenderer,
  popupTemplate: {
    lastEditInfoEnabled: false,
    // returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Scientific",
            label: "Scientific Name",
          },
          {
            fieldName: "Common_Nam",
            label: "Common Name",
          },
          {
            fieldName: "TreeStatus",
            label: "Tree Status",
          },
          {
            fieldName: "Recom",
            label: "Recommendation",
          },
          {
            fieldName: "City",
          },
          {
            fieldName: "Id",
            label: "Tree ID",
          },
          {
            fieldName: "TCP_Proces",
            label: "Tree Cutting",
          },
          {
            fieldName: "Remarks2",
            label: "Remarks",
          },
        ],
      },
    ],
  },
});

// Commemorative trees
// const commemorativeRenderer = new UniqueValueRenderer({
//   field: "Remarks1",
//   uniqueValueInfos: [
//     {
//       value: "Existing",
//       label: "Existing",
//       symbol: new SimpleMarkerSymbol({
//         size: 10,
//         color: "#FFFF00", // the first two letters dictate transparency.
//         outline: {
//           width: 0.5,
//           color: "white",
//         },
//       }),
//     },
//     {
//       value: "Proposed",
//       label: "Proposed Location",
//       symbol: new SimpleMarkerSymbol({
//         size: 10,
//         color: "#0073ff", // the first two letters dictate transparency.
//         outline: {
//           width: 0.5,
//           color: "white",
//         },
//       }),
//     },
//   ],
// });

const commemorativeRenderer = new SimpleRenderer({
  symbol: new SimpleMarkerSymbol({
    size: 10,
    color: "#FFFF00", // the first two letters dictate transparency.
    outline: {
      width: 0.5,
      color: "white",
    },
  }),
});

const commemorativeLabel = new LabelClass({
  symbol: new TextSymbol({
    color: "white",
    font: {
      size: 12,
      weight: "bold",
    },
  }),
  labelPlacement: "above-center",
  labelExpressionInfo: {
    expression: "$feature.Common_Nam",
  },
});

export const commemorativeTreeLayer = new FeatureLayer({
  portalItem: {
    id: "4475f1bb9ad04dbda552879188ac1b6c",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  definitionExpression: "Remarks2 = 'Commemorative'",
  elevationInfo: {
    mode: "on-the-ground",
  },
  layerId: 1,
  title: "Commemorative Trees",
  renderer: commemorativeRenderer,
  labelingInfo: [commemorativeLabel],
  visible: false,
  popupTemplate: {
    title: "Commemorative Tree",
    lastEditInfoEnabled: false,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Common_Nam",
            label: "Common name",
          },
        ],
      },
    ],
  },
});

/* Tree compensation layer */
const uniqueValueInfos_treeCompen = treeCompensationStatusLabels.map(
  (label: any, index: any) => {
    return Object.assign({
      value: treeCompensationStatusValues[index],
      label: label,
      symbol: new SimpleMarkerSymbol({
        size: 5,
        color: colorsCompen[index], // the first two letters dictate transparency.
        outline: {
          width: 0.5,
          color: outlineColor,
        },
      }),
    });
  },
);

export const treeCompensationRenderer = new UniqueValueRenderer({
  field: "Tree_Compe",
  uniqueValueInfos: uniqueValueInfos_treeCompen,
});

export const treeCompensationLayer = new FeatureLayer({
  portalItem: {
    id: "4475f1bb9ad04dbda552879188ac1b6c",
    portal: {
      url: "https://gis.railway-sector.com/portal",
    },
  },
  layerId: 1,
  featureReduction: clusterConfig,
  title: "Tree Compensation",
  renderer: treeCompensationRenderer,
  visible: false,
  popupTemplate: {
    title: "<h5>{Tree_Compe}</h5>",
    lastEditInfoEnabled: false,
    // returnGeometry: true,
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Scientific",
            label: "Scientific Name",
          },
          {
            fieldName: "Common_Nam",
            label: "Common Name",
          },
          {
            fieldName: "TreeStatus",
            label: "Tree Status",
          },
          {
            fieldName: "Recom",
            label: "Recommendation",
          },
          {
            fieldName: "City",
          },
          {
            fieldName: "Id",
            label: "Tree ID",
          },
          {
            fieldName: "Remarks2",
            label: "Remarks",
          },
        ],
      },
    ],
  },
});

/* Group Layer */
export const alignmentGroupLayer = new GroupLayer({
  title: "Alignment",
  visible: true,
  visibilityMode: "independent",
  layers: [constructionBoundaryLayer, stationLayer],
});

export const treeGroupLayer = new GroupLayer({
  title: "Trees",
  visible: true,
  visibilityMode: "exclusive",
  layers: [commemorativeTreeLayer, treeCompensationLayer, treeCuttingLayer],
});
