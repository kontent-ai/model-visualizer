import React from "react";
import { NodeProps, useReactFlow } from "@xyflow/react";
import { ActionButton } from "../controls/ActionButton";
import { SourceHandle } from "../controls/SourceHandle";
import { useCanvas } from "../../contexts/CanvasContext";
import { delayTwoAnimationFrames, getNodeStyle } from "../../utils/layout";
import IconSchemeConnected from "../icons/IconSchemeConnected";
import { ElementRow } from "./ElementRow";
import IconMagnifier from "../icons/IconMagnifier";
import { useAppContext } from "../../contexts/AppContext";
import { AnnotatedElement } from "../../utils/types/mapi";
import { BaseCustomNode } from "../../utils/types/layout";

type SnippetNodeData = BaseCustomNode<{
  isExpanded?: boolean;
  elements: ReadonlyArray<AnnotatedElement>;
}>;

export const SnippetNode: React.FC<NodeProps<SnippetNodeData>> = ({
  data,
  selected,
}) => {
  const { expandedNodes, toggleNode, isolateRelated, isolateSingle } = useCanvas();
  const { fitView } = useReactFlow();
  const { customApp } = useAppContext();

  const isExpanded = expandedNodes.has(data.id);

  const handleIsolateRelated = (e: React.MouseEvent) => {
    e.stopPropagation();
    isolateRelated(data.id);
    delayTwoAnimationFrames(() => fitView({ duration: 800 }));
  };

  const handleIsolateSingle = (e: React.MouseEvent) => {
    e.stopPropagation();
    isolateSingle(data.id);
    toggleNode(data.id, true);
    requestAnimationFrame(() => fitView({ duration: 800 }));
  };

  const nodeStyle: React.CSSProperties = getNodeStyle(selected);

  const filteredElements = data.elements.filter(el => el.type !== "guidelines" && el.type !== "snippet");

  return (
    <div onClick={() => toggleNode(data.id)} style={nodeStyle}>
      <div className="flex text-gray-400 justify-between items-center">
        <div className="text-xs px-2">Snippet</div>
        <a
          className="px-2"
          href={`https://app.kontent.ai/${customApp.context.environmentId}/content-models/snippets/edit/${data.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ActionButton title="Edit snippet" onClick={() => {}} icon="✎" />
        </a>
      </div>
      <div className="flex justify-between items-center px-2 py-1">
        <div className="font-bold">{data.label}</div>
        <span className="flex-1"></span>
        <ActionButton
          onClick={handleIsolateRelated}
          title="Show related nodes"
          icon={<IconSchemeConnected />}
        />
        <ActionButton
          onClick={handleIsolateSingle}
          title="Isolate node"
          icon={<IconMagnifier />}
        />
      </div>
      {isExpanded
        ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {filteredElements
              .map((el, i) => (
                <ElementRow
                  key={el.id}
                  element={{ ...el, origin: { kind: "direct" }, name: el.name ?? "" }}
                  isLast={i === filteredElements.length - 1}
                />
              ))}
            <SourceHandle id="source" />
          </div>
        )
        : <SourceHandle id="source" />}
    </div>
  );
};
