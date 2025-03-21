import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./contexts/AppContext";
import "./index.css";
import "@kontent-ai/stylekit/styles/styles.css";
import { ReactFlowProvider } from "@xyflow/react";
import { NodeStateProvider } from "./contexts/NodeStateContext";
import { ViewProvider } from "./contexts/ViewContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <ReactFlowProvider>
        <NodeStateProvider>
          <ViewProvider>
            <App />
          </ViewProvider>
        </NodeStateProvider>
      </ReactFlowProvider>
    </AppProvider>
  </React.StrictMode>,
);
