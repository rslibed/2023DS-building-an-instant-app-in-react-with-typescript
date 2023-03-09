import { CalciteShell } from "@esri/calcite-components-react";
import "./App.scss";

import Panel from "./Components/Panel/Panel";
import { useRef } from "react";

function App() {
  const iframeContainer = useRef() as React.RefObject<HTMLIFrameElement>;

  return (
    <CalciteShell>
      <header slot="header">
        <h1>2023 Developer Summit: Build an Instant App in React with TypeScript</h1>
      </header>
      <Panel key="config-panel" appPreview={iframeContainer} />
      <iframe key="app-preview" ref={iframeContainer} src="http://localhost:3001" />
    </CalciteShell>
  );
}

export default App;
