import "../index.css";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/components/arcgis-basemap-gallery";
import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-expand";
import "@arcgis/map-components/components/arcgis-search";
import {
  treeGroupLayer,
  alignmentGroupLayer,
  lotLayer,
  treeCuttingLayer,
} from "../layers";
import type { ArcgisMap } from "@arcgis/map-components/dist/components/arcgis-map";
import type { ArcgisSearch } from "@arcgis/map-components/components/arcgis-search/customElement";
import { useState } from "react";

function MapDisplay() {
  const arcgisMap = document.querySelector("arcgis-map") as ArcgisMap;
  const arcgisSearch = document.querySelector("arcgis-search") as ArcgisSearch;
  const [_mapView, setMapView] = useState<any>();

  arcgisMap?.viewOnReady(() => {
    arcgisMap?.map?.add(lotLayer);
    arcgisMap?.map?.add(treeGroupLayer);
    arcgisMap?.map?.add(alignmentGroupLayer);
    arcgisMap.hideAttribution = true;

    const sources: any = [
      {
        layer: treeCuttingLayer,
        searchFields: ["ID"],
        displayField: "ID",
        exactMatch: false,
        outFields: ["ID"],
        name: "Tree ID",
        zoomScale: 1000,
        placeholder: "example: DP-T-1",
      },
    ];
    arcgisSearch.allPlaceholder = "example: DP-T-1";
    arcgisSearch.includeDefaultSourcesDisabled = true;
    arcgisSearch.locationDisabled = true;
    arcgisSearch?.sources.push(...sources);
  });

  return (
    <arcgis-map
      // item-id="5ba14f5a7db34710897da0ce2d46d55f"
      basemap="dark-gray-vector"
      zoom={14}
      center="121.0194387, 14.6972616"
      onarcgisViewReadyChange={(event: any) => {
        setMapView(event.target.id);
      }}
    >
      <arcgis-expand close-on-esc slot="top-right" mode="floating">
        <arcgis-search></arcgis-search>
      </arcgis-expand>
    </arcgis-map>
  );
}

export default MapDisplay;
