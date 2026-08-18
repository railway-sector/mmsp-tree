import "@esri/calcite-components/dist/components/calcite-tabs";
import "@esri/calcite-components/dist/components/calcite-tab";
import "@esri/calcite-components/dist/components/calcite-tab-nav";
import "@esri/calcite-components/dist/components/calcite-tab-title";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-map";
import { useState, useEffect } from "react";
import "../index.css";
import TreeCuttingChart from "./ChartTreeCutting";
import TreeCompensationChart from "./ChartTreeCompensation";
import { treeCompensationLayer, treeCuttingLayer } from "../layers";
import { labelColor } from "../uniqueValues";
import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";

function ChartMain() {
  const [chartTabName, setChartTabName] = useState<any>("TreeCutting");

  useEffect(() => {
    const layersByTab: Record<string, FeatureLayer> = {
      TreeCutting: treeCuttingLayer,
      Compensation: treeCompensationLayer,
    };

    const activeLayer = layersByTab[chartTabName];

    Object.values(layersByTab).forEach((layer) => {
      layer.visible = layer === activeLayer;
    });
  }, [chartTabName]);

  return (
    <>
      <calcite-panel
        scale="s"
        slot="panel-end"
        id="chart-panel"
        style={{
          "--calcite-panel-heading-text-color": labelColor,
          borderStyle: "solid",
          borderRightWidth: 5,
          borderLeftWidth: 5,
          borderBottomWidth: 5,
          borderColor: "#555555",
          width: "40%",
          overflow: "hidden",
          display: "block",
        }}
      >
        <calcite-tabs
          style={{
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderBottomWidth: 1,
            borderColor: "#555555",
            backgroundColor: "#2b2b2b",
          }}
          layout="center"
          scale="m"
        >
          <calcite-tab-nav
            slot="title-group"
            id="thetabs"
            oncalciteTabChange={(event: any) =>
              setChartTabName(event.srcElement.selectedTitle.className)
            }
          >
            <calcite-tab-title className="TreeCutting">
              TreeCutting
            </calcite-tab-title>
            <calcite-tab-title className="Compensation">
              Compensation
            </calcite-tab-title>
          </calcite-tab-nav>

          {/* calcite-tab: Lot */}
          <calcite-tab>
            {chartTabName === "TreeCutting" && <TreeCuttingChart />}
          </calcite-tab>

          {/* calcite-tab: Structure */}
          <calcite-tab>
            {chartTabName === "Compensation" && <TreeCompensationChart />}
          </calcite-tab>
        </calcite-tabs>
      </calcite-panel>
    </>
  );
}

export default ChartMain;
