import { useEffect, useRef } from "react";

import "./View.scss";

interface ViewProps {
    viewContainerRef: React.RefObject<HTMLDivElement>;
}

const View = (props: ViewProps) => {
    return <div ref={props.viewContainerRef} id="viewDiv" />
}

export default View;