// ----------------------------------------------------
// Calcite tab component registration
// ----------------------------------------------------
import "@esri/calcite-components/dist/components/calcite-tabs";
import "@esri/calcite-components/dist/components/calcite-tab";
import "@esri/calcite-components/dist/components/calcite-tab-nav";
import "@esri/calcite-components/dist/components/calcite-tab-title";

import { useState } from "react";
import TreeCutting from "./TreeCutting";
import Compensation from "./Compensation";
import { treeCuttingLayer, treeCompensationLayer } from "../layers";

const tabContentStyle = {
  "--calcite-tab-content-block-padding": "0px",
} as React.CSSProperties;

export default function SidePanel() {
  // Tabs opened at least once, so a tab's chart only mounts after its
  // first visit (a hidden container gives amCharts zero size).
  // "TreeCutting" starts visited since it's the default tab.
  const [visitedTabs, setVisitedTabs] = useState<Set<string>>(
    new Set(["TreeCutting"]),
  );

  const handleTabChange = (e: CustomEvent) => {
    const newTab = (e.target as any).selectedTitle?.className;
    if (!newTab) return;

    // Switch the visible tree layer to match the tab (treeGroupLayer
    // is "exclusive", so the other one turns off automatically).
    if (newTab === "Compensation") treeCompensationLayer.visible = true;
    else if (newTab === "TreeCutting") treeCuttingLayer.visible = true;

    setVisitedTabs((prev) => new Set(prev).add(newTab));
  };

  return (
    <>
      {/* ----------------------------------------------------
          TAB CONTAINER
          Side panel docked via slot="panel-end", 40% width.
      ---------------------------------------------------- */}
      <calcite-tabs
        slot="panel-end"
        layout="inline"
        scale="l"
        style={{
          borderStyle: "solid",
          borderRightWidth: 5,
          borderLeftWidth: 5,
          borderBottomWidth: 5,
          borderTopWidth: 5,
          borderColor: "#555555",
          width: "40%",
        }}
      >
        {/* ----------------------------------------------------
            TAB TITLES
            className = id checked against visitedTabs.
        ---------------------------------------------------- */}
        <calcite-tab-nav
          slot="title-group"
          id="thetabs"
          oncalciteTabChange={handleTabChange}
        >
          <calcite-tab-title className="TreeCutting">Tree Cutting</calcite-tab-title>
          <calcite-tab-title className="Compensation">Compensation</calcite-tab-title>
        </calcite-tab-nav>

        {/* ----------------------------------------------------
            TAB CONTENT
        ---------------------------------------------------- */}
        <calcite-tab style={tabContentStyle}>
          <TreeCutting />
        </calcite-tab>
        <calcite-tab style={tabContentStyle}>
          {visitedTabs.has("Compensation") && <Compensation />}
        </calcite-tab>
      </calcite-tabs>
    </>
  );
}