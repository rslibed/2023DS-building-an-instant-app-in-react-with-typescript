import {
  CalciteShellPanel,
  CalcitePanel,
  CalciteLabel,
  CalciteInput,
  CalciteSwitch,
  CalciteColorPicker,
  CalciteSegmentedControl,
  CalciteSegmentedControlItem,
  CalciteButton,
  CalcitePopover,
  CalciteColorPickerSwatch
} from "@esri/calcite-components-react";

import { useRef } from "react";

import "./Panel.scss";

interface PanelProps {
  appPreview: React.RefObject<HTMLIFrameElement>;
}

function Panel(props: PanelProps) {
  const headerTextColorPickerSwatch = useRef(
    null
  ) as React.RefObject<HTMLCalciteColorPickerSwatchElement>;
  const headerBackgroundColorPickerSwatch = useRef(
    null
  ) as React.RefObject<HTMLCalciteColorPickerSwatchElement>;

  const handleData = (key: string) => {
    return (e) => {
      const isSwitch = e.type === "calciteSwitchChange";
      let value;
      const { target } = e;
      if (isSwitch) {
        value = target?.checked;
      } else {
        value = target?.value;
      }

      if (key === "headerTextColor" && headerTextColorPickerSwatch?.current) {
        headerTextColorPickerSwatch.current.color = value;
      } else if (key === "headerBackgroundColor" && headerBackgroundColorPickerSwatch?.current) {
        headerBackgroundColorPickerSwatch.current.color = value;
      }

      const data = { type: "instant-app", [key]: value };
      props?.appPreview?.current?.contentWindow?.postMessage(data, "*");
    };
  };

  const renderTitleSetting = () => {
    return (
      <CalciteLabel>
        Title
        <CalciteInput value="ArcGIS Instant Apps" onCalciteInputChange={handleData("title")} />
      </CalciteLabel>
    );
  };

  const renderLogoImgUrlSetting = () => {
    return (
      <CalciteLabel>
        Logo image URL
        <CalciteInput
          value="https://www.esri.com/content/dam/esrisites/en-us/common/icons/product-logos/arcgis-instant-apps-64.svg"
          onCalciteInputChange={handleData("headerLogoImage")}
        />
      </CalciteLabel>
    );
  };

  const renderTextColorSetting = () => {
    return (
      <CalciteLabel layout="inline-space-between">
        Text color
        <CalciteColorPickerSwatch
          ref={headerTextColorPickerSwatch}
          id="textColor"
          color="#151515"
        />
        <CalcitePopover label="Text color" referenceElement="textColor" autoClose={true}>
          <CalciteColorPicker
            hideChannels={true}
            hideSaved={true}
            value="#151515"
            onCalciteColorPickerChange={handleData("headerTextColor")}
          />
        </CalcitePopover>
      </CalciteLabel>
    );
  };

  const renderBackgroundColorSetting = () => {
    return (
      <CalciteLabel layout="inline-space-between">
        Background color
        <CalciteColorPickerSwatch
          ref={headerBackgroundColorPickerSwatch}
          id="backgroundColor"
          color="#f8f8f8"
        />
        <CalcitePopover
          label="Background color"
          referenceElement="backgroundColor"
          autoClose={true}
        >
          <CalciteColorPicker
            hideChannels={true}
            hideSaved={true}
            value="#f8f8f8"
            onCalciteColorPickerChange={handleData("headerBackgroundColor")}
          />
        </CalcitePopover>
      </CalciteLabel>
    );
  };

  const renderSocialShareSetting = () => {
    return (
      <CalciteLabel layout="inline-space-between">
        Social share
        <CalciteSwitch checked onCalciteSwitchChange={handleData("socialShare")} />
      </CalciteLabel>
    );
  };

  const renderPanelLocationSettings = () => {
    return (
      <CalciteLabel layout="inline-space-between">
        Panel location
        <CalciteSegmentedControl onCalciteSegmentedControlChange={handleData("panelLocation")}>
          <CalciteSegmentedControlItem value="panel-start" checked>
            Start
          </CalciteSegmentedControlItem>
          <CalciteSegmentedControlItem value="panel-end">End</CalciteSegmentedControlItem>
        </CalciteSegmentedControl>
      </CalciteLabel>
    );
  };

  const renderZoomToSetting = () => {
    return (
      <CalciteLabel layout="inline-space-between">
        Zoom to
        <CalciteSwitch checked onCalciteSwitchChange={handleData("zoomTo")} />
      </CalciteLabel>
    );
  };

  const renderFeatureCountSetting = () => {
    return (
      <CalciteLabel layout="inline-space-between">
        Feature count
        <CalciteSwitch checked onCalciteSwitchChange={handleData("featureCount")} />
      </CalciteLabel>
    );
  };

  const renderInteractiveLegendSettingsGroup = () => {
    return (
      <div className="settings-group">
        <span className="section-header">Interactive legend</span>
        <div className="settings-group-content">
          {renderPanelLocationSettings()}
          {renderZoomToSetting()}
          {renderFeatureCountSetting()}
        </div>
      </div>
    );
  };

  const renderHeaderSettingsGroup = () => {
    return (
      <div className="settings-group">
        <span className="section-header">Header</span>
        <div className="settings-group-content">
          {renderTitleSetting()}
          {renderLogoImgUrlSetting()}
          {renderTextColorSetting()}
          {renderBackgroundColorSetting()}
          {renderSocialShareSetting()}
        </div>
      </div>
    );
  };

  const renderSettings = () => {
    return (
      <div id="settingsPanel">
        {renderHeaderSettingsGroup()}
        {renderInteractiveLegendSettingsGroup()}
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <footer slot="footer">
        <CalciteButton width="full" iconStart="save">
          Save
        </CalciteButton>
      </footer>
    );
  };

  return (
    <CalciteShellPanel slot="panel-start">
      <CalcitePanel heading="Configuration panel" description="Modify the settings below">
        {renderSettings()}
        {renderFooter()}
      </CalcitePanel>
    </CalciteShellPanel>
  );
}

export default Panel;
