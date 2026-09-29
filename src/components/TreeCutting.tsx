import { useEffect, useRef } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useMyContext, type SelectedLocation } from "../contexts/MyContext";
import { fieldStatistic, pieChartStatusData } from "../Query";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import {
  treeCuttingLayer,
  treeCuttingStatuses,
  treeCuttingStatusField,
  treeStatisticField,
} from "../layers";
import QueryExpressionLayers from "../CreateQueryJosh";
import { filterAndGetTargetExtent } from "../MapQuery";
import { mapView } from "../components/MapDisplay";

const CHART_ID = "treeCuttingPieChart";
const STATUS_SOURCE = "treeCutting";
const TEXT_COLOR = "#ffffff";

type ChartDatum = { category: string; value: number; color: string; code: number | string };

// ----------------------------------------------------
// DATA FETCHING
// Total = all trees in filter. Chart = trees grouped by status
// (unstatused trees count in the total but not the pie).
// ----------------------------------------------------
function useTreeData({ packageName, station }: SelectedLocation) {
  return useQuery({
    queryKey: ["treeCuttingData", packageName, station],
    queryFn: async () => {
      const baseFilter = {
        qFields: ["Package", "Station1"] as [any?, any?],
        qValues: [packageName, station] as [any?, any?],
      };

      const totalWhere = new QueryExpressionLayers({ ...baseFilter }).queryExpression();
      const statusWhere = new QueryExpressionLayers({
        ...baseFilter,
        qExpression: `${treeCuttingStatusField} IS NOT NULL`,
      }).queryExpression();

      const [totalNumber, chartData] = await Promise.all([
        fieldStatistic({
          where: totalWhere,
          layer: treeCuttingLayer,
          statisticField: treeStatisticField,
          statisticType: "count" as const,
        }),
        pieChartStatusData({
          where: statusWhere,
          layer: treeCuttingLayer,
          statusList: treeCuttingStatuses,
          statusField: treeCuttingStatusField,
          statisticField: treeStatisticField,
          statisticType: "count",
        }),
      ]);

      return { totalNumber, chartData };
    },
    placeholderData: keepPreviousData,
  });
}

// Disposes a previous chart root under this id (avoids duplicates on remount)
function maybeDisposeRoot(divId: string) {
  am5.array.each(am5.registry.rootElements, function (root) {
    if (root.dom.id === divId) {
      root.dispose();
    }
  });
}

// ----------------------------------------------------
// CHART LIFECYCLE
// Builds the pie chart once, disposes on unmount, updates data in
// place afterward (no rebuild).
// ----------------------------------------------------
function usePieChart(
  chartData: ChartDatum[],
  selectedCode: number | string | null,
  onSliceClick: (code: number | string | null) => void,
) {
  const pieSeriesRef = useRef<any>({});
  const legendRef = useRef<any>({});

  // Ref so the click handler always reads the latest selectedCode
  const selectedCodeRef = useRef<number | string | null>(selectedCode);
  useEffect(() => {
    selectedCodeRef.current = selectedCode;
  }, [selectedCode]);

  useEffect(() => {
    maybeDisposeRoot(CHART_ID);

    const root = am5.Root.new(CHART_ID);
    root.container.children.clear();
    root._logo?.dispose();

    root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      }),
    );

    const pieSeries = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        categoryField: "category",
        valueField: "value",
        legendValueText: "{valuePercentTotal.formatNumber('#.')}% ({value})",
        radius: am5.percent(45),
        innerRadius: am5.percent(28),
        scale: 1.8,
      }),
    );
    pieSeriesRef.current = pieSeries;

    pieSeries.set("y", 0);
    pieSeries.data.setAll(chartData);

    pieSeries.slices.template.setAll({
      toggleKey: "none",
      fillOpacity: 0.9,
      stroke: am5.color("#ffffff"),
      strokeWidth: 0.5,
      strokeOpacity: 1,
      tooltipText: '{category}: {valuePercentTotal.formatNumber("#.")}%',
    });

    // Slice color comes from each data point's own `color` field
    pieSeries.slices.template.adapters.add("fill", (fill, target) => {
      const color = (target.dataItem?.dataContext as any)?.color;
      return color ? am5.color(color) : fill;
    });
    pieSeries.slices.template.adapters.add("stroke", () => am5.color("#ffffff"));

    // Clicking a slice toggles its status as the selected filter
    pieSeries.slices.template.events.on("click", (ev) => {
      const code = (ev.target.dataItem?.dataContext as any)?.code ?? null;
      const prev = selectedCodeRef.current;
      onSliceClick(prev === code ? null : code);
    });

    pieSeries.labels.template.setAll({ visible: false, scale: 0 });
    pieSeries.ticks.template.setAll({ visible: false, scale: 0 });

    const legend = chart.children.push(
      am5.Legend.new(root, { centerX: am5.percent(50), x: am5.percent(50), scale: 0.9, height: 240 }),
    );
    legendRef.current = legend;

    legend.data.setAll(pieSeries.dataItems);
    legend.markers.template.setAll({ width: 18, height: 18 });
    legend.markerRectangles.template.setAll({
      cornerRadiusTL: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusBR: 10,
    });
    legend.labels.template.setAll({
      oversizedBehavior: "truncate",
      fill: am5.color(TEXT_COLOR),
      width: 320,
      maxWidth: 320,
    });
    legend.valueLabels.template.setAll({ textAlign: "right", fill: am5.color(TEXT_COLOR) });
    legend.itemContainers.template.setAll({ paddingTop: 3, paddingBottom: 1 });

    return () => {
      root.dispose();
    };
  }, []);

  // Push new data into the existing chart/legend (no rebuild)
  useEffect(() => {
    pieSeriesRef.current?.data?.setAll(chartData);
    legendRef.current?.data?.setAll(pieSeriesRef.current?.dataItems);
  }, [chartData]);
}

// ----------------------------------------------------
// COMPONENT
// ----------------------------------------------------
export default function TreeCutting() {
  const { selectedLocation, selectedStatus, updateStatus } = useMyContext();

  // Only "ours" if the selection is tagged with this chart's source
  const selectedCode =
    selectedStatus?.source === STATUS_SOURCE ? (selectedStatus.code as number) : null;

  const handleSliceClick = (code: number | string | null) => {
    updateStatus(code === null ? null : { source: STATUS_SOURCE, code });
  };

  const { data, isError } = useTreeData(selectedLocation);
  const chartData = data?.chartData ?? [];

  // False until the first fetch resolves, then stays true
  const hasData = !!data;

  usePieChart(chartData, selectedCode, handleSliceClick);

  // Filters treeCuttingLayer and zooms to match (only zooms if no
  // status is selected, or the selection is this chart's own)
  useEffect(() => {
    const { packageName, station } = selectedLocation;
    const shouldZoom = selectedStatus === null || selectedStatus.source === STATUS_SOURCE;

    filterAndGetTargetExtent(
      treeCuttingLayer,
      packageName,
      null, // trees have no Type
      station,
      selectedCode,
      treeCuttingStatusField,
    ).then((extent) => {
      if (extent && mapView.current && shouldZoom) {
        mapView.current.goTo(extent);
      }
    });
  }, [selectedLocation, selectedStatus, selectedCode]);

  const totalNumber = data?.totalNumber ?? 0;

  if (isError) {
    return (
      <div style={{ color: "#ff6b6b", padding: "16px" }}>
        Failed to load tree data. Please check your connection.
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "97%",
        display: "flex",
        flexDirection: "column",
        paddingTop: "12px",
        backgroundColor: "transparent",
      }}
    >
      <div style={{ position: "relative", flexShrink: 0, display: "flex", justifyContent: "center", width: "100%", color: TEXT_COLOR }}>
        {/* Icon, upper left */}
        <div style={{ position: "absolute", left: "16px", top: 0 }}>
          <span role="img" aria-label="Tree" style={{ fontSize: "60px", lineHeight: 1 }}>🌳</span>
        </div>
        <div style={{ minWidth: "110px" }}>
          <div style={{ fontSize: "12px", opacity: 0.7, textAlign: "center" }}>TOTAL TREES</div>
          <div style={{ height: "12px", fontSize: "28px", fontWeight: 600, textAlign: "center", fontVariantNumeric: "tabular-nums" }}>
            {hasData ? totalNumber.toLocaleString() : ""}
          </div>
        </div>
      </div>

      <div
        id={CHART_ID}
        style={{
          position: "static",
          flex: "1 1 auto",
          minHeight: "200px",
          overflow: "hidden",
          backgroundColor: "rgba(0,0,0,0)",
          color: TEXT_COLOR,
          marginBottom: "15px",
        }}
      ></div>
    </div>
  );
}