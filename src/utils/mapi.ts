import { createAppError } from "../utils/errors";
import {
  ElementTypeLabels,
  ElementType,
  Action,
  ApiResponse,
  ContentType,
  Snippet,
  ResolvedType,
  AnnotatedElement,
} from "./types/mapi";

export const elementTypeLabels: ElementTypeLabels = {
  text: "Text",
  rich_text: "Rich Text",
  number: "Number",
  multiple_choice: "Multiple Choice",
  date_time: "Date & Time",
  asset: "Asset",
  modular_content: "Linked Items",
  subpages: "Subpages",
  url_slug: "URL Slug",
  guidelines: "Guidelines",
  taxonomy: "Taxonomy",
  custom: "Custom",
  snippet: "Snippet",
};

export const elementTypeMap: ReadonlyMap<ElementType, string> = new Map(
  Object.entries(elementTypeLabels) as [ElementType, string][],
);

const tryParseJson = (text: string): unknown | undefined => {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
};

export const makeMapiRequest = async <T>(
  environmentId: string,
  action: Action,
): Promise<ApiResponse<T>> => {
  let response: Response;
  try {
    response = await fetch("/.netlify/functions/mapiProxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ environmentId, action }),
    });
  } catch (error) {
    console.error("Network error:", error);
    return {
      isError: true,
      error: createAppError(
        error instanceof Error ? error.message : "An unknown error occurred",
        "FETCH_ERROR",
        error,
      ),
    };
  }

  const responseText = await response.text();
  const parsed = tryParseJson(responseText) as
    | { message?: string; errorCode?: string | number }
    | undefined;

  if (parsed === undefined) {
    console.error("Failed to parse response:", responseText);
    return {
      isError: true,
      error: createAppError("Invalid server response format", "PARSE_ERROR", { responseText }),
    };
  }

  if (!response.ok) {
    return {
      isError: true,
      error: createAppError(
        parsed.message || "Unknown API error",
        parsed.errorCode || response.status,
        parsed,
      ),
    };
  }

  return { isError: false, data: parsed as T };
};

export const mergeTypesWithSnippets = (
  types: ContentType[],
  snippets: Snippet[],
): ResolvedType[] =>
  types.map((type) => ({
    ...type,
    elements: type.elements.flatMap((element) => {
      if (element.type === "snippet") {
        const snippet = snippets.find((s) => s.id === element.snippet.id);
        return snippet?.elements.map((s) =>
          ({
            ...s,
            content_group: element.content_group,
            origin: { kind: "snippet", id: snippet.id, name: snippet.name },
          }) as AnnotatedElement
        ) ?? [];
      }

      return [{ ...element, origin: { kind: "direct" } as const }];
    }),
  }));
