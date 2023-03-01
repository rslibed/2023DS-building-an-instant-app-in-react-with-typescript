import React from "react";

import { Components } from "arcgis-charts-components/dist/types/components";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "instant-apps-social-share": HTMLInstantAppsSocialShareElement<LocalJSX.InstantAppsSocialShare>;
      "instant-apps-header": HTMLInstantAppsHeaderElement<LocalJSX.InstantAppsHeaderElement>;
      "instant-apps-interactive-legend": HTMLInstantAppsHeaderElement<LocalJSX.InstantAppsInteractiveLegend>;
    }
  }
}