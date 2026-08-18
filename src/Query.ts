import Query from "@arcgis/core/rest/support/Query";
import { dateTable } from "./layers";
import StatisticDefinition from "@arcgis/core/rest/support/StatisticDefinition";

//--- Separate calculation
interface FieldStatisticType {
  where: any;
  layer: any;
  statisticField: any;
  statisticType: "count" | "sum";
}

export async function fieldStatistic({
  where,
  layer,
  statisticField,
  statisticType,
}: FieldStatisticType) {
  //--- Query
  const query = new Query({
    where: where,
    outStatistics: [
      new StatisticDefinition({
        onStatisticField: statisticField,
        outStatisticFieldName: "statsCollect",
        statisticType,
      }),
    ],
  });

  const response = await layer?.queryFeatures(query);
  return response.features[0].attributes.statsCollect;
}

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
    where: `project = 'MMSP' AND category = '${category}'`,
    outFields: ["project", "category", "date"],
  });

  const { features } = await dateTable.queryFeatures(query);
  return features.map(({ attributes }: any) => {
    const asofdate = toAsofdate(new Date(attributes.date));

    return asofdate;
  });
}

//---------------------------------------------//
//           Other functions                   //
//---------------------------------------------//
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
      if (error.name !== "AbortError") console.error(error);
    });
  });
}

export async function highlightTrees(layer: any, view: any) {
  let highlight: any;

  if (!view || !layer) return;

  const lv = await view?.whenLayerView(layer);
  const query = layer.createQuery();
  const objectIds = await layer.queryObjectIds(query);

  highlight && highlight.remove();
  highlight = lv.highlight(objectIds);

  view.on("click", () => {
    lv.filter = null;
    highlight && highlight.remove();
  });
}

export function processParams(graphic: any, layerView: any) {
  if (!graphic || !layerView) {
    throw new Error("Graphic or layerView not provided.");
  }

  if (!graphic.isAggregate) {
    throw new Error("Graphic must represent a cluster.");
  }
}
