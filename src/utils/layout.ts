import { ContentTypeElements } from "@kontent-ai/management-sdk";
import Dagre from "@dagrejs/dagre";
import { Node, Edge, NodeTypes } from "@xyflow/react";
import { AnnotatedElement, Element } from "./mapi";
import { ContentTypeNode } from "../components/nodes/ContentTypeNode";
import { SnippetNode } from "../components/nodes/SnippetNode";
import { layoutConfig } from "./config";

export const nodeBaseStyle: React.CSSProperties = {
  paddingTop: 5,
  paddingBottom: 5,
  border: "1px solid #ddd",
  borderRadius: 10,
  cursor: "pointer",
  position: "relative",
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
};

export const nodeTypes = {
  contentType: ContentTypeNode as unknown as NodeTypes["contentType"],
  snippet: SnippetNode as unknown as NodeTypes["snippet"],
} as const satisfies NodeTypes;

export type NodeIsolation = {
  nodeId: string;
  mode: "related" | "single";
} | null;

export type Graph = {
  nodes: Node[];
  edges: Edge[];
};

type NodeData = {
  id: string;
  label: string;
  isExpanded?: boolean;
};

export type ContentTypeNodeData = Node<
  {
    elements: AnnotatedElement[];
    selfReferences?: string[];
  } & NodeData
>;

export type SnippetNodeData = Node<
  {
    elements: Element[];
  } & NodeData
>;

type RelationshipElement =
  | ContentTypeElements.ILinkedItemsElement
  | ContentTypeElements.ISubpagesElement
  | ContentTypeElements.IRichTextElement;

type RequirableElement = Exclude<Element, ContentTypeElements.IGuidelinesElement | ContentTypeElements.ISnippetElement>;

export const calculateNodeHeight = (node: ContentTypeNodeData | SnippetNodeData) => {
  const filteredElements = node.data.elements.filter(element => element.type !== "guidelines");
  const { baseNodeHeight, elementHeight } = layoutConfig;

  return node.data.isExpanded ? baseNodeHeight + filteredElements.length * elementHeight : baseNodeHeight;
};

export const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
) => {
  console.log("getLayoutedElements called");
  const graph = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

  graph.setGraph({
    rankdir: layoutConfig.rankDirection,
    nodesep: layoutConfig.nodeSeparation,
    ranksep: layoutConfig.rankSeparation,
    align: layoutConfig.alignment,
    ranker: layoutConfig.ranker,
    acyclicer: layoutConfig.acyclicer,
  });

  nodes.forEach((node) => {
    const height = calculateNodeHeight(node as ContentTypeNodeData | SnippetNodeData);
    graph.setNode(node.id, {
      width: layoutConfig.nodeWidth,
      height: height,
    });
  });

  edges.forEach((edge) => {
    graph.setEdge(edge.source, edge.target);
  });

  Dagre.layout(graph);

  return {
    nodes: nodes.map((node) => {
      const nodeWithPosition = graph.node(node.id);
      const height = calculateNodeHeight(node as ContentTypeNodeData | SnippetNodeData);

      return {
        ...node,
        position: {
          x: nodeWithPosition.x - layoutConfig.nodeWidth / 2,
          y: nodeWithPosition.y - height / 2,
        },
      };
    }),
    edges,
  };
};

export const isRelationshipElement = (
  element: Element,
): element is RelationshipElement =>
  (element.type === "modular_content"
    || element.type === "subpages"
    || element.type === "rich_text")
  && Array.isArray(element.allowed_content_types);

export const isRequirableElement = (element: Element): element is RequirableElement =>
  element.type !== "guidelines"
  && element.type !== "snippet";

export const isNodeRelated = (nodeId: string, targetId: string, edges: Edge[]): boolean => {
  if (nodeId === targetId) return true;

  // Check if there's a direct connection in either direction
  return edges.some(edge =>
    (edge.source === nodeId && edge.target === targetId)
    || (edge.target === nodeId && edge.source === targetId)
  );
};
