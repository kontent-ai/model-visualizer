import { useMemo } from "react";
import { isRelationshipElement, Graph } from "../utils/layout";
import { Element, TypeWithResolvedSnippets } from "../utils/mapi";
import { Edge } from "reactflow";

const createNodesFromTypes = (types: TypeWithResolvedSnippets[]) =>
  types.map((type) => ({
    id: type.id,
    type: "contentType",
    data: {
      id: type.id,
      label: type.name,
      elements: type.elements,
      selfReferences: type.elements
        .filter(
          (el: Element) =>
            isRelationshipElement(el)
            && el.allowed_content_types?.some((allowed) => allowed.id === type.id),
        )
        .map((el: Element) => el.id),
    },
    position: { x: 0, y: 0 },
  }));

const createEdgesFromTypes = (
  sources: TypeWithResolvedSnippets[],
): Edge[] => {
  const edgeSet = new Set<string>();
  const edges: Edge[] = [];

  sources.forEach((type) => {
    type.elements.forEach((element: Element) => {
      if (isRelationshipElement(element)) {
        element.allowed_content_types?.forEach((allowed) => {
          // skip self-references
          if (type.id === allowed.id) return;
          const edgeKey = `${type.id}-${element.id}-${allowed.id}`;
          if (!edgeSet.has(edgeKey)) {
            edgeSet.add(edgeKey);
            edges.push({
              id: edgeKey,
              source: type.id,
              target: allowed.id ?? "",
              sourceHandle: `source-${element.id}`,
              targetHandle: "target",
            });
          }
        });
      }
    });
  });

  return edges;
};

export const useGraphData = (types: TypeWithResolvedSnippets[]): Graph => {
  return useMemo(() => {
    console.log("useGraphData called");
    const nodes = createNodesFromTypes(types);
    const edges = createEdgesFromTypes(types);
    return {
      nodes,
      edges,
    };
  }, [types]);
};
