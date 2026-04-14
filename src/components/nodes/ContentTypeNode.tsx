import React, { useMemo } from "react";
import { NodeProps, useReactFlow } from "@xyflow/react";
import { SourceHandle } from "../controls/SourceHandle";
import { TargetHandle } from "../controls/TargetHandle";
import { delayTwoAnimationFrames, getNodeStyle } from "../../utils/layout";
import { ActionButton } from "../controls/ActionButton";
import { ElementRow } from "./ElementRow";
import { useCanvas } from "../../contexts/CanvasContext";
import IconSchemeConnected from "../icons/IconSchemeConnected";
import IconMagnifier from "../icons/IconMagnifier";
import { useContentModel } from "../../contexts/ContentModelContext";
import { useAppContext } from "../../contexts/AppContext";
import { AnnotatedElement, ContentGroup, Element } from "../../utils/types/mapi";
import { BaseCustomNode } from "../../utils/types/layout";

type ContentTypeNodeData = BaseCustomNode<{
  isExpanded?: boolean;
  elements: ReadonlyArray<AnnotatedElement>;
  selfReferences?: ReadonlyArray<string>;
  contentGroups: ReadonlyArray<ContentGroup>;
}>;

export const ContentTypeNode: React.FC<NodeProps<ContentTypeNodeData>> = ({
  data,
  selected,
}) => {
  const { expandedNodes, toggleNode, isolateRelated, isolateSingle } = useCanvas();
  const { fitView } = useReactFlow();
  const { snippets } = useContentModel();
  const { customApp } = useAppContext();

  const isExpanded = useMemo(() => expandedNodes.has(data.id), [expandedNodes, data.id]);

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

  const filteredElements = data.elements.filter(el => el.type !== "guidelines");

  return (
    <div onClick={() => toggleNode(data.id)} style={nodeStyle}>
      <div className="flex text-gray-400 justify-between items-center">
        <div className="text-xs px-2">Type</div>
        <a
          className="px-2"
          href={`https://app.kontent.ai/${customApp.context.environmentId}/content-models/types/edit/${data.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ActionButton title="Edit content type" onClick={() => {}} icon="✎" />
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
      <TargetHandle id="target" />
      {isExpanded
        ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {filteredElements
              .map((el, i) => (
                <ElementRow
                  key={el.id}
                  element={el.type === "snippet"
                    ? {
                      ...el,
                      origin: { kind: "direct" },
                      name: snippets.find(s => s.id === el.snippet?.id)?.name ?? "Unknown Snippet",
                    }
                    : el}
                  isLast={i === filteredElements.length - 1}
                  selfReferences={data.selfReferences?.includes(el.id ?? "")}
                  contentGroup={data.contentGroups.find(cg => cg.id === el.content_group?.id)}
                />
              ))}
          </div>
        )
        : (
          <div>
            {filteredElements.map(renderCollapsedHandles)}
          </div>
        )}
    </div>
  );
};

const renderCollapsedHandles = (element: Element) => {
  switch (element.type) {
    case "taxonomy":
    case "snippet":
      return <TargetHandle key={element.id} id={`target-${element.id}`} />;
    case "modular_content":
    case "subpages":
    case "rich_text":
      return <SourceHandle key={element.id} id={`source-${element.id}`} />;
    default:
      return null;
  }
};
