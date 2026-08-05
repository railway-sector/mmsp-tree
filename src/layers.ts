import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import {
  c_boundary_renderer,
  clusterConfig,
  lot_id_f,
  lot_id_label,
  lot_popup,
  lot_status_f,
  lot_status_renderer,
  portalItems,
  station_labels,
  tree_com_label,
  tree_com_popup,
  tree_com_renderer,
  treec_popup,
  treec_renderer,
  treem_popup,
  treem_renderer,
} from "./uniqueValues";

//----------------------------------------------//
//            Alignment Layers                  //
//----------------------------------------------//
//--- CONSTRUCTION BOUNDARY ---//
export const constructionBoundaryLayer = new FeatureLayer({
  portalItem: portalItems("0c172b82ddab44f2bb439542dd75e8ae"),
  layerId: 4,
  renderer: c_boundary_renderer,
  definitionExpression: "MappingBoundary = 1",
  title: "Construction Boundary",
  elevationInfo: { mode: "on-the-ground" },
  popupEnabled: false,
});

//--- STATION POINT LAYER ---//
export const stationLayer = new FeatureLayer({
  portalItem: portalItems("52d4f29105934e3f95f6b39c7e5fba6e"),
  layerId: 1,
  labelingInfo: [station_labels],
  title: "Station",
  definitionExpression: "Project = 'MMSP'",
});
stationLayer.listMode = "hide";

//----------------------------------------------//
//               Other layers                   //
//----------------------------------------------//
//--- DATE FEATURE TABLE ---//
export const dateTable = new FeatureLayer({
  portalItem: portalItems("a084d9cae5234d93b7aa50f7eb782aec"),
});

//----------------------------------------------//
//                 Lot layers                   //
//----------------------------------------------//
//--- LOT LAYER ---//
export const lotLayer = new FeatureLayer({
  portalItem: portalItems("93790e8102f84713a69e562da12bb415"),
  outFields: [lot_id_f, lot_status_f],
  title: "Acquisition Status",
  labelingInfo: [lot_id_label],
  renderer: lot_status_renderer,
  minScale: 50000,
  maxScale: 0,
  popupTemplate: lot_popup,
});

//----------------------------------------------//
//         Tree Cutting/Compensation Layers     //
//----------------------------------------------//
//--- TREE CUTTING LAYER ---//
export const treeCuttingLayer = new FeatureLayer({
  portalItem: portalItems("4475f1bb9ad04dbda552879188ac1b6c"),
  elevationInfo: { mode: "on-the-ground" },
  layerId: 1,
  featureReduction: clusterConfig,
  title: "Tree Cutting",
  visible: true,
  renderer: treec_renderer,
  popupTemplate: treec_popup,
});

//--- TREE COMPENSATION LAYER ---//
export const treeCompensationLayer = new FeatureLayer({
  portalItem: portalItems("4475f1bb9ad04dbda552879188ac1b6c"),
  layerId: 1,
  featureReduction: clusterConfig,
  title: "Tree Compensation",
  renderer: treem_renderer,
  visible: false,
  popupTemplate: treem_popup,
});

//--- TREE COMEMORATION LAYER ---//
export const commemorativeTreeLayer = new FeatureLayer({
  portalItem: portalItems("4475f1bb9ad04dbda552879188ac1b6c"),
  definitionExpression: "Remarks2 = 'Commemorative'",
  elevationInfo: { mode: "on-the-ground" },
  layerId: 1,
  title: "Commemorative Trees",
  renderer: tree_com_renderer,
  labelingInfo: [tree_com_label],
  visible: false,
  popupTemplate: tree_com_popup,
});

//----------------------------------------------//
//               Group layers                   //
//----------------------------------------------//
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
