import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-input";
import "@esri/calcite-components/dist/components/calcite-label";

import {
  CalciteButton,
  CalciteLabel,
  CalciteInput,
} from "@esri/calcite-components-react";
import "./App.scss";

import { useEffect, useRef, useState } from "react";

import request from "@arcgis/core/request";

import OAuthInfo from "@arcgis/core/identity/OAuthInfo";
import esriId from "@arcgis/core/identity/IdentityManager";
import esriConfig from "@arcgis/core/config";
import Collection from "@arcgis/core/core/Collection";

function App() {
  const [cred, setCred] = useState<__esri.Credential | null>(null);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [items, setItems] = useState<
    __esri.Collection<__esri.PortalItem> | undefined
  >(undefined);

  useEffect(() => {
    // AGOL Login
    var oAuthInfo = new OAuthInfo({
      appId: "10FZeajlfsLXnEAy",
    });
    esriId.registerOAuthInfos([oAuthInfo]);
    esriId.getCredential(esriConfig.portalUrl + "/sharing").then((cred) => {
      console.log("cred", cred);
      setCred(cred);
    });
  }, []);

  useEffect(() => {
    // Query For Created Apps
    let qParams: any = {
      num: 100,
      start: 1,
      q: '(typekeywords:"2023DevSummitInstantApp")',
      sortField: "modified",
      sortOrder: "desc",
      f: "json",
    };

    let results: __esri.Collection<__esri.PortalItem> = new Collection();

    request(`${esriConfig.portalUrl}/sharing/rest/search`, {
      query: qParams,
      method: "auto",
      responseType: "json",
    }).then((queryResult) => {
      const { data } = queryResult;
      console.log("queryResults", queryResult);
      results.addMany(data.results);
      setItems(results);
    });
  }, []);

  return (
    <div id="rootDiv" className="root-container">
      <CalciteLabel>
        New App Title
        <CalciteInput
          className="input-control"
          type="text"
          value={title}
          placeholder="Enter Title"
          onCalciteInputInput={(e) => {
            setTitle(e.target.value);
          }}
        />
      </CalciteLabel>
      <CalciteButton
        onClick={async () => {
          const { userId } = cred as __esri.Credential;

          const addItemInfo = {
            type: "Web Mapping Application",
            typeKeywords:
              "2023DevSummitInstantApp",
            url: ``,
            title: title,
            tags: null,
            folderId: "root",
            text: JSON.stringify({}),
            f: "json",
          };

          const res = await request(
            `${esriConfig.portalUrl}/sharing/rest/content/users/${userId}/addItem`,
            {
              query: addItemInfo,
              method: "post",
            }
          );

          setTitle(undefined);
        }}
      >
        Create App
      </CalciteButton>
      {items != null && (
        <div className="item-carousel-root">
          {items.map((item) => {
            return <div className="item-card" key={item.id}
            // FYI - Ryan, this can be changed to whatever
              onClick={()=>{ window.open(`http://localhost:3001?appid=${item.id}`) }}
            >
              <img src={item.thumbnailUrl} alt="" width={75} />
              <div>{item.title}</div>
            </div>;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
