import React, { createContext, useContext } from "react";
import { ContentTypeModels, ContentTypeSnippetModels } from "@kontent-ai/management-sdk";
import { TypeWithResolvedSnippets } from "../utils/mapi";

type EntityContextType = {
  contentTypes: ContentTypeModels.ContentType[];
  snippets: ContentTypeSnippetModels.ContentTypeSnippet[];
  typesWithSnippets: TypeWithResolvedSnippets[];
};

const EntityContext = createContext<EntityContextType | null>(null);

export const EntityProvider: React.FC<{
  children: React.ReactNode;
  contentTypes: ContentTypeModels.ContentType[];
  snippets: ContentTypeSnippetModels.ContentTypeSnippet[];
  typesWithSnippets: TypeWithResolvedSnippets[];
}> = ({ children, contentTypes, snippets, typesWithSnippets }) => (
  <EntityContext.Provider
    value={{
      contentTypes,
      snippets,
      typesWithSnippets,
    }}
  >
    {children}
  </EntityContext.Provider>
);

export const useEntities = () => {
  const context = useContext(EntityContext);
  if (!context) throw new Error("useEntities must be used within EntityProvider");
  return context;
};
