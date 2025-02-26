import { useMemo } from "react";
import { isRelationshipElement, isSnippetElement, ProcessedEdge, ProcessedGraph } from "../utils/layout";
import { Element, ContentType, Snippet } from "../utils/mapi";

const createNodes = (types: ContentType[], snippets: Snippet[]) => {
  const typeNodes = types.map((type) => ({
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

  const snippetNodes = snippets.map((snippet) => ({
    id: snippet.id,
    type: "snippet",
    data: {
      id: snippet.id,
      label: snippet.name,
      elements: snippet.elements,
    },
    position: { x: 0, y: 0 },
  }));

  return { typeNodes, snippetNodes };
};

const createEdgesFromSources = (
  sources: ContentType[] | Snippet[],
): { typeEdges: ProcessedEdge[], snippetEdges: ProcessedEdge[] } => {
  const edgeSet = new Set<string>();
  const typeEdges: ProcessedEdge[] = [];
  const snippetEdges: ProcessedEdge[] = [];

  sources.forEach((type) => {
    type.elements.forEach((element: Element) => {
      if (isRelationshipElement(element)) {
        element.allowed_content_types?.forEach((allowed) => {
          // Optionally skip self-references if desired.
          if (type.id === allowed.id) return;
          const edgeKey = `${type.id}-${element.id}-${allowed.id}`;
          if (!edgeSet.has(edgeKey)) {
            edgeSet.add(edgeKey);
            typeEdges.push({
              id: edgeKey,
              source: type.id,
              target: allowed.id ?? "",
              sourceHandle: `source-${element.id}`,
              targetHandle: "target",
              edgeType: "contentType",
            });
          }
        });
      }
      if (isSnippetElement(element)) {
        const edgeKey = `${type.id}-${element.id}-${element.snippet.id}`;
        if (!edgeSet.has(edgeKey)) {
          edgeSet.add(edgeKey);
          snippetEdges.push({ 
            id: edgeKey,
            source: element.snippet.id ?? "",
            target: type.id ?? "", // snippet edges are created in reverse
            sourceHandle: "source",
            targetHandle: `target-${element.id}`,
            edgeType: "snippet",
          });
        }
      }
    });
  });

  return { typeEdges, snippetEdges };
};

export const useGraphData = (types: ContentType[], snippets: Snippet[]): ProcessedGraph => {
  return useMemo(() => {
    console.log("useGraphData called");
    const { typeNodes, snippetNodes } = createNodes(types, snippets);
    const { typeEdges, snippetEdges } = createEdgesFromSources([...types, ...snippets]);
    return {
      typeNodes,
      snippetNodes,
      typeEdges,
      snippetEdges,
    };
  }, [types, snippets]);
};
