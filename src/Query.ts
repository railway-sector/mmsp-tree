import type FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { dateTable } from "./layers";
import QueryExpressionLayers from "query-layers-expression";
import Query from "@arcgis/core/rest/support/Query";

//---------------------------------------------//
//           Pie chart                         //
//---------------------------------------------//
interface pieChartDataType {
  piechart: any;
  qChart: any;
  layer: any;
  statusList: any;
  statusField: any;
  statisticField: any;
  statisticType: "sum" | "count";
}

export async function pieChartData({
  piechart,
  qChart,
  layer,
  statusList,
  statusField,
  statisticField,
  statisticType,
}: pieChartDataType) {
  // piechart.layer = layer, .....
  Object.assign(piechart, {
    qChart: qChart.queryExpression(),
    layer,
    statusList,
    statusField,
    statisticField,
    statisticType,
  });
  return await piechart.chartDataPieSeries();
}

//--- Chart Render helper function
// `pieChartRender` function helps to assign parameter names to class `ChartPieSeriesRender`
interface PieChartRenderType {
  render: any | null; // the first instance of new ChartPieSeriesRender
  chart: any; // amChart
  pieSeries: any;
  legend: any;
  root: any;
  qChart: any;
  q2Expression?: any;
  status_field: any;
  view: any;
  updateChartPanelwidth: any;
  data: any;
  seriesScale: any;
  innerLabel?: any;
  innerLabelFontSize?: any;
  innerValueFontSize?: any;
  layer: FeatureLayer | any;
  statusArray: StatusQueryItem[];
  bkg_color_switch?: boolean;
  seriesFillHash?: boolean;
}

interface StatusQueryItem {
  category: string;
  value: number | string;
  color: string;
}

export async function PieChartRender({ render, ...props }: PieChartRenderType) {
  // render.chart = chart, render.legend = legend,....
  Object.assign(render, props);
  return await render.chartDataRenderer();
}

//--- Returns query expression
export const makeQuery = (
  qValues: any,
  qFields: any,
  qExpression?: string,
  q2Expression?: string,
) => {
  const q = new QueryExpressionLayers();
  q.qValues = qValues;
  q.qFields = qFields;
  if (qExpression) q.qExpression = qExpression;
  if (q2Expression) q.q2Expression = q2Expression;
  return q;
};

//---------------------------------------------------------//
//                Get as-of-date                           //
//---------------------------------------------------------//
export function yearMonthDay(date: Date) {
  return {
    year: date?.getFullYear() ?? 0,
    month: date?.getMonth() + 1,
    day: date?.getDate(),
  };
}

export function toAsofdate(date: Date) {
  //--- Return displayed date: (as of date)
  const { year, day } = yearMonthDay(date);
  const cmonth = date?.toLocaleString("en-US", { month: "long" });
  return `${cmonth} ${day}, ${year}`;
}

export async function dateUpdate(category: string) {
  //--- Only executed during an initial render
  const query = new Query({
    where: `category = '${category}'`,
    outFields: ["project", "category", "date"],
  });

  const { features } = await dateTable.queryFeatures(query);
  return features.map(({ attributes }: any) => {
    const date = new Date(attributes.date);
    const asofdate = toAsofdate(date);

    return asofdate;
  });
}

// Thousand separators function
export function thousands_separators(num: any) {
  if (num) {
    const num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }
}

export function zoomToLayer(layer: any, view: any) {
  return layer.queryExtent().then((response: any) => {
    view?.goTo(response.extent, {}).catch((error: any) => {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    });
  });
}

export async function highlightTrees(layer: any, view: any) {
  let highlight: any;

  const lv = await view.whenLayerView(layer);
  const query = layer.createQuery();
  const objectIds = await layer.queryObjectIds(query);

  highlight && highlight.remove();
  highlight = lv.highlight(objectIds);
}

export function processParams(graphic: any, layerView: any) {
  if (!graphic || !layerView) {
    throw new Error("Graphic or layerView not provided.");
  }

  if (!graphic.isAggregate) {
    throw new Error("Graphic must represent a cluster.");
  }
}
