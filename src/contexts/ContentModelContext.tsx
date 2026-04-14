import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAppContext } from "./AppContext";
import { AppError, createAppError, isKontentError, isAppError } from "../utils/errors";
import { ResolvedType, ContentType, Snippet, Taxonomy } from "../utils/types/mapi";
import { makeMapiRequest, mergeTypesWithSnippets } from "../utils/mapi";

type ContentModelData = {
  contentTypes: ContentType[];
  snippets: Snippet[];
  typesWithSnippets: ResolvedType[];
  taxonomies: Taxonomy[];
};

type ContentModelContextState = ContentModelData & {
  loading: boolean;
  error: AppError | null;
  importContentModel: (model: ContentModelData) => void;
  isInspectMode: boolean;
  exitInspectMode: () => void;
};

const ContentModelContext = createContext<ContentModelContextState | null>(null);

export const ContentModelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { customApp } = useAppContext();
  const [model, setModel] = useState<ContentModelData>({
    contentTypes: [],
    snippets: [],
    typesWithSnippets: [],
    taxonomies: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);
  const [isInspectMode, setIsInspectMode] = useState(false);

  // for importing model from a JSON file (enters inspect mode)
  const importContentModel = (newModel: ContentModelData) => {
    setModel(newModel);
    setIsInspectMode(true);
  };

  const exitInspectMode = () => {
    setIsInspectMode(false);
  };

  useEffect(() => {
    // skip API calls when in inspect mode
    if (isInspectMode) return;

    const getContentModel = async () => {
      try {
        setLoading(true);
        setError(null);

        const [typesResult, snippetsResult, taxonomiesResult] = await Promise.all([
          makeMapiRequest<ContentType[]>(customApp.context.environmentId, "listContentTypes"),
          makeMapiRequest<Snippet[]>(customApp.context.environmentId, "listContentTypeSnippets"),
          makeMapiRequest<Taxonomy[]>(customApp.context.environmentId, "listTaxonomies"),
        ]);

        const firstErrored = [typesResult, snippetsResult, taxonomiesResult].find((r) => r.isError);
        if (firstErrored?.isError) throw firstErrored.error;

        const types = typesResult.isError ? [] : typesResult.data;
        const snippets = snippetsResult.isError ? [] : snippetsResult.data;
        const taxonomies = taxonomiesResult.isError ? [] : taxonomiesResult.data;

        setModel({
          contentTypes: types,
          snippets: snippets,
          typesWithSnippets: mergeTypesWithSnippets(types, snippets),
          taxonomies: taxonomies,
        });
      } catch (error) {
        console.error("Error fetching content model:", error);
        if (isKontentError(error)) {
          setError(createAppError(JSON.stringify(error), error.errorCode, error));
        } else if (isAppError(error)) {
          setError(error);
        } else {
          setError(createAppError("An unknown error occurred", "UNKNOWN_ERROR", error));
        }
      } finally {
        setLoading(false);
      }
    };

    getContentModel();
  }, [customApp.context.environmentId, isInspectMode]);

  return (
    <ContentModelContext.Provider
      value={{
        ...model,
        loading,
        error,
        importContentModel,
        isInspectMode,
        exitInspectMode,
      }}
    >
      {children}
    </ContentModelContext.Provider>
  );
};

export const useContentModel = () => {
  const context = useContext(ContentModelContext);
  if (!context) {
    throw new Error("useContentModel must be used within ContentModelProvider");
  }
  return context;
};
