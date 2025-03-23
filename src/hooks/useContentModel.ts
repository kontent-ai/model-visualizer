import { useState, useEffect } from "react";
import {
  ContentType,
  getContentTypes,
  getContentTypeSnippets,
  mergeTypesWithSnippets,
  Snippet,
  ResolvedType,
} from "../utils/mapi";
import { useAppContext } from "../contexts/AppContext";

type ContentModelState = {
  contentTypes: ContentType[];
  snippets: Snippet[];
  typesWithSnippets: ResolvedType[];
};

type ContentModelError = {
  description: string;
  code: string;
};

const initialState: ContentModelState = {
  contentTypes: [],
  snippets: [],
  typesWithSnippets: [],
};

export const useContentModel = () => {
  const { customApp } = useAppContext();
  const [state, setState] = useState<ContentModelState>(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ContentModelError | null>(null);

  useEffect(() => {
    const getContentModel = async () => {
      try {
        setLoading(true);
        setError(null);

        const [typesResult, snippetsResult] = await Promise.all([
          getContentTypes(customApp.context.environmentId),
          getContentTypeSnippets(customApp.context.environmentId),
        ]);

        if (typesResult.error) throw typesResult.error;
        if (snippetsResult.error) throw snippetsResult.error;

        const types = typesResult.data || [];
        const snippets = snippetsResult.data || [];

        setState({
          contentTypes: types,
          snippets: snippets,
          typesWithSnippets: mergeTypesWithSnippets(types, snippets),
        });
      } catch (error) {
        console.error(error);
        setError({
          description: error instanceof Error ? error.message : "Failed to fetch content model data",
          code: "FETCH_ERROR",
        });
      } finally {
        setLoading(false);
      }
    };

    getContentModel();
  }, [customApp.context.environmentId]);

  return {
    ...state,
    loading,
    error,
  };
};
