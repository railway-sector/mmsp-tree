import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import {
  c_boundary_renderer,
  clusterConfig,
  lot_status_renderer,
  portalItems,
  station_labels,
  tree_popup,
  treec_render,
  treecom_label,
  treecom_popup,
  treecom_renderer,
  treem_renderer,
} from "./uniqueValues";

//----------------------------------------------//
//            Alignment Layers                  //
//----------------------------------------------//
//--- STATION POINT LAYER ---//
export const stationLayer = new FeatureLayer({
  portalItem: portalItems("52d4f29105934e3f95f6b39c7e5fba6e"),
  layerId: 1,
  labelingInfo: [station_labels],
  title: "Station",
  definitionExpression: "Project = 'MMSP'",
});

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

//----------------------------------------------//
//               Lot layers                     //
//----------------------------------------------//
//--- LOT LAYER ---//
export const lotLayer = new FeatureLayer({
  portalItem: portalItems("0c172b82ddab44f2bb439542dd75e8ae"),
  layerId: 8,
  title: "Land Acquisition",
  renderer: lot_status_renderer,
  popupEnabled: false,
});

//----------------------------------------------//
//               Other layers                   //
//----------------------------------------------//
export const dateTable = new FeatureLayer({
  portalItem: portalItems("a084d9cae5234d93b7aa50f7eb782aec"),
});

//----------------------------------------------//
//         Tree Cutting & Compensationers       //
//----------------------------------------------//
//--- TREE CUTTING LAYER ---//
export const treeCuttingLayer = new FeatureLayer({
  portalItem: portalItems("4475f1bb9ad04dbda552879188ac1b6c"),
  elevationInfo: { mode: "on-the-ground" },
  featureReduction: clusterConfig,
  title: "Tree Cutting",
  visible: true,
  renderer: treec_render,
  popupTemplate: tree_popup,
});

//--- TREE COMPENSATION LAYER ---//
export const treeCompensationLayer = new FeatureLayer({
  portalItem: portalItems("4475f1bb9ad04dbda552879188ac1b6c"),
  featureReduction: clusterConfig,
  title: "Tree Compensation",
  renderer: treem_renderer,
  visible: false,
  popupTemplate: tree_popup,
});

//--- COMMEMORATIVE TREES LAYER ---//
export const commemorativeTreeLayer = new FeatureLayer({
  portalItem: portalItems("4475f1bb9ad04dbda552879188ac1b6c"),
  definitionExpression: "Remarks2 = 'Commemorative'",
  elevationInfo: { mode: "on-the-ground" },
  layerId: 1,
  title: "Commemorative Trees",
  renderer: treecom_renderer,
  labelingInfo: [treecom_label],
  visible: false,
  popupTemplate: treecom_popup,
});

//----------------------------------------------//
//                 Group Layers                 //
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
