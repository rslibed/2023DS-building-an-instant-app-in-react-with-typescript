import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import "./utils/require";

// @arcgis/core
import "@arcgis/core/assets/esri/themes/light/main.css";
import esriConfig from "@arcgis/core/config";

// calcite-components
import "@esri/calcite-components/dist/calcite/calcite.css";
import { setAssetPath } from "@esri/calcite-components/dist/components";

import applicationJSON from "./config/application.json";

const { portalUrl } = applicationJSON;

esriConfig.portalUrl = portalUrl;

const url = new URL("./assets/assets", window.location.href);
const { href } = url;
setAssetPath(href);

esriConfig.assetsPath = href;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

