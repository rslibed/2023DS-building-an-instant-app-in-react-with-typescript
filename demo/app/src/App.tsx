import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-button";

import { CalciteShell, CalciteShellPanel, CalcitePanel } from "@esri/calcite-components-react";
import "./App.scss";

import View from "./Components/View";
import { useEffect, useRef, useState } from "react";

import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";

import applicationJSON from "./config/application.json";

const {
  webmap,
  zoomTo,
  featureCount,
  socialShare,
  title,
  headerBackgroundColor,
  headerTextColor,
  panelLocation,
  headerLogoImage
} = applicationJSON;

function App() {
  const viewContainerRef = useRef(null) as React.RefObject<HTMLDivElement>;
  const iacIntLegendRef = useRef(null) as React.RefObject<HTMLInstantAppsInteractiveLegendElement>;
  const socialShareRef = useRef(null) as React.RefObject<HTMLInstantAppsSocialShareElement>;

  const [view, setView] = useState<MapView | null>(null);

  // Step 4: State management
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentPanelLocation, setCurrentPanelLocation] = useState(panelLocation);
  const [currentFeatureCount, setCurrentFeatureCount] = useState(featureCount);
  const [currentZoomTo, setCurrentZoomTo] = useState(zoomTo);
  const [currentHeaderBackgroundColor, setCurrentHeaderBackgroundColor] =
    useState(headerBackgroundColor);
  const [currentHeaderTextColor, setCurrentHeaderTextColor] = useState(headerTextColor);
  const [currentHeaderLogoImage, setCurrentHeaderLogoImage] = useState(headerLogoImage);
  const [currentSocialShare, setCurrentSocialShare] = useState(socialShare);

  // Step 5: Listener
  // Message event listener
  // useEffect(() => {
  //   window.addEventListener("message", (e) => {
  //     if (e?.data?.type === "instant-app") {
  //       delete e.data.type;

  //       const key = Object.keys(e.data)[0];
  //       const value = e.data[key];

  //       switch (key) {
  //         case "title":
  //           setCurrentTitle(value);
  //           return;
  //         case "panelLocation":
  //           setCurrentPanelLocation(value);
  //           return;
  //         case "featureCount":
  //           setCurrentFeatureCount(value);
  //           return;
  //         case "zoomTo":
  //           setCurrentZoomTo(value);
  //           return;
  //         case "socialShare":
  //           setCurrentSocialShare(value);
  //           return;
  //         case "headerTextColor":
  //           setCurrentHeaderTextColor(value);
  //           return;
  //         case "headerBackgroundColor":
  //           setCurrentHeaderBackgroundColor(value);
  //           return;
  //         case "headerLogoImage":
  //           setCurrentHeaderLogoImage(value);
  //           return;
  //       }
  //     }
  //   });
  // }, []);

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
    const intLegendNode = iacIntLegendRef?.current;
    if (view && intLegendNode) {
      intLegendNode.zoomTo = currentZoomTo;
      intLegendNode.featureCount = currentFeatureCount;
      intLegendNode.view = view as MapView;
    }
  }, [view, iacIntLegendRef, currentZoomTo, currentFeatureCount]);

  useEffect(() => {
    if (view && socialShareRef?.current) {
      socialShareRef.current.view = view;
    }
  }, [view, socialShareRef?.current]);

  const renderHeader = () => {
    return (
      <instant-apps-header
        slot="header"
        title-text={currentTitle}
        background-color={currentHeaderBackgroundColor}
        text-color={currentHeaderTextColor}
        logo-image={currentHeaderLogoImage}
      >
        {currentSocialShare ? (
          <instant-apps-social-share ref={socialShareRef} slot="actions-end" />
        ) : null}
      </instant-apps-header>
    );
  };

  const renderPanel = () => {
    return (
      <CalciteShellPanel slot={currentPanelLocation}>
        <CalcitePanel>
          <instant-apps-interactive-legend ref={iacIntLegendRef} />
        </CalcitePanel>
      </CalciteShellPanel>
    );
  };

  const renderView = () => <View viewContainerRef={viewContainerRef} />;

  return (
    <CalciteShell>
      {renderHeader()}
      {renderPanel()}
      {renderView()}
    </CalciteShell>
  );
}

export default App;
