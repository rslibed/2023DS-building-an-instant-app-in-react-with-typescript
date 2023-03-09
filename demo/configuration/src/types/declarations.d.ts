import React from "react";

import { Components } from "arcgis-charts-components/dist/types/components";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "instant-apps-header": HTMLInstantAppsHeaderElement<LocalJSX.InstantAppsHeaderElement>;
    }
  }
}