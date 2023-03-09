import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import "./utils/require";

// @arcgis/core
import "@arcgis/core/assets/esri/themes/light/main.css";
import esriConfig from "@arcgis/core/config";

// calcite-components
import "@esri/calcite-components/dist/calcite/calcite.css";
import { setAssetPath } from "@esri/calcite-components/dist/components";

// @esri/instant-apps-components
import { InstantAppsHeader } from "@esri/instant-apps-components/dist/components/instant-apps-header";
import { InstantAppsSocialShare } from "@esri/instant-apps-components/dist/components/instant-apps-social-share";
import { InstantAppsInteractiveLegend } from "@esri/instant-apps-components/dist/components/instant-apps-interactive-legend";
import { InstantAppsInteractiveLegendClassic } from "@esri/instant-apps-components/dist/components/instant-apps-interactive-legend-classic";
import { InstantAppsInteractiveLegendCaption } from "@esri/instant-apps-components/dist/components/instant-apps-interactive-legend-caption";
import { InstantAppsInteractiveLegendCount } from "@esri/instant-apps-components/dist/components/instant-apps-interactive-legend-count";
import { InstantAppsInteractiveLegendLayerCaption } from "@esri/instant-apps-components/dist/components/instant-apps-interactive-legend-layer-caption";
import { InstantAppsInteractiveLegendRelationship } from "@esri/instant-apps-components/dist/components/instant-apps-interactive-legend-relationship";

import applicationJSON from "./config/application.json";

const { portalUrl } = applicationJSON;

esriConfig.portalUrl = portalUrl;

customElements.define("instant-apps-header", InstantAppsHeader);
customElements.define("instant-apps-social-share", InstantAppsSocialShare);
customElements.define("instant-apps-interactive-legend", InstantAppsInteractiveLegend);
customElements.define(
  "instant-apps-interactive-legend-classic",
  InstantAppsInteractiveLegendClassic
);
customElements.define(
  "instant-apps-interactive-legend-caption",
  InstantAppsInteractiveLegendCaption
);
customElements.define("instant-apps-interactive-legend-count", InstantAppsInteractiveLegendCount);
customElements.define(
  "instant-apps-interactive-legend-layer-caption",
  InstantAppsInteractiveLegendLayerCaption
);
customElements.define(
  "instant-apps-interactive-legend-relationship",
  InstantAppsInteractiveLegendRelationship
);

const url = new URL("./assets/assets", window.location.href);
const { href } = url;
setAssetPath(href);

esriConfig.assetsPath = href;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
