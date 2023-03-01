//  * This is a small adaptor for apps using esri-loader's `loadModules` function in 4.x
//  * essentially we trick loadModules into thinking we have a dojo loader declared
//  * then we just provide modules from @arcgis/core
//  */
import Handles from "@arcgis/core/core/Handles";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import Widget from "@arcgis/core/widgets/Widget";
import LegendViewModel from "@arcgis/core/widgets/Legend/LegendViewModel";
import * as esriIntl from "@arcgis/core/intl";
// @ts-ignore
import * as jsonUtils from "@arcgis/core/layers/effects/jsonUtils";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import FeatureEffect from "@arcgis/core/layers/support/FeatureEffect";
import * as symbolUtils from "@arcgis/core/symbols/support/symbolUtils";
import Point from "@arcgis/core/geometry/Point";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import Legend from "@arcgis/core/widgets/Legend";
import request from "@arcgis/core/request";

// @ts-ignore
window.require = function require(modulePaths: string[], cb) {
  const moduleMap = {
    "esri/core/Handles": Handles,
    "esri/core/reactiveUtils": reactiveUtils,
    "esri/widgets/Widget": Widget,
    "esri/widgets/Legend/LegendViewModel": LegendViewModel,
    "esri/intl": esriIntl,
    "esri/layers/effects/jsonUtils": jsonUtils,
    "esri/layers/support/FeatureFilter": FeatureFilter,
    "esri/layers/support/FeatureEffect": FeatureEffect,
    "esri/symbols/support/symbolUtils": symbolUtils,
    "esri/geometry/Point": Point,
    "esri/geometry/SpatialReference": SpatialReference,
    "esri/widgets/Legend": Legend,
    "esri/request": request
  };
  const modules = modulePaths.map((name) => {
    // @ts-ignore
    const module = moduleMap[name];
    if (!module) {
      console.error(`${name} not defined. Please add to utils/require.ts`);
    }
    return module;
  });
  cb.apply(null, modules);
};
// this has to be defined to fool esri-loader
// @ts-ignore
window.require.on = function () {
  return { remove: () => {} };
};