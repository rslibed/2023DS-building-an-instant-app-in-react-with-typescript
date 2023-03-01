import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-button";

import {  CalciteShell, CalciteShellPanel, CalcitePanel } from '@esri/calcite-components-react';
import './App.scss';

import View from "./Components/View";
import { useEffect, useRef, useState } from "react";

import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";

import applicationJSON from "./config/application.json";

const { 
  webmap,
  title,
  headerBackgroundColor,
  headerTextColor,
  headerLogoImage,
  panelLocation,
  interactiveLegend,
  socialShare
} = applicationJSON;

function App() {
  const viewContainerRef = useRef(null) as React.RefObject<HTMLDivElement>;
  const iacIntLegendRef = useRef(null) as React.RefObject<HTMLInstantAppsInteractiveLegendElement>;
  const socialShareRef = useRef(null) as React.RefObject<HTMLInstantAppsSocialShareElement>;

  const [ view, setView ] = useState<MapView | null>(null);

  useEffect(() => {
    const map = new WebMap({
        portalItem: {
            id: webmap
        }
    });
    const view = new MapView({
        container: viewContainerRef?.current as HTMLDivElement,
        map
    });
    setView(view);
  }, []);

  useEffect(() => {
    if (view && iacIntLegendRef?.current) {
      const { zoomTo, featureCount } = interactiveLegend;
      iacIntLegendRef.current.zoomTo = zoomTo;
      iacIntLegendRef.current.featureCount = featureCount;
      iacIntLegendRef.current.view = view as MapView;
    }
  }, [view, iacIntLegendRef])

  useEffect(() => {
  if (view && socialShareRef?.current) {
    socialShareRef.current.view = view;
  }
}, [view, socialShareRef?.current])

  return (
    <CalciteShell>
      <instant-apps-header
        slot="header"
        title-text={title}
        background-color={headerBackgroundColor}
        text-color={headerTextColor}
        logo-image={headerLogoImage}
      >
        {socialShare ? <instant-apps-social-share ref={socialShareRef} slot="actions-end" /> : null}
      </instant-apps-header>
      <CalciteShellPanel slot={panelLocation}>
        <CalcitePanel>
          <instant-apps-interactive-legend ref={iacIntLegendRef} />
        </CalcitePanel>
      </CalciteShellPanel>
      <View viewContainerRef={viewContainerRef} />
    </CalciteShell>
  );
}

export default App;
