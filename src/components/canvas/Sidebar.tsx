import { ContentTypeModels, ContentTypeSnippetModels } from "@kontent-ai/management-sdk";
import React, { useState, useRef, useEffect } from "react";
import { useNodeState } from "../../contexts/NodeStateContext";
import { useReactFlow } from "reactflow";
import { SidebarSection } from "./SidebarSection";

type ContentType = ContentTypeModels.ContentType;
type Snippet = ContentTypeSnippetModels.ContentTypeSnippet;

interface SidebarProps {
  types: ContentType[];
  snippets: Snippet[];
  onMenuSelect: (typeId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ types, snippets, onMenuSelect }) => {
  const { toggleNode } = useNodeState();
  const { getNodes, setCenter } = useReactFlow();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    if (contentRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = contentRef.current;
      setShowScrollIndicator(scrollHeight > clientHeight && scrollHeight - clientHeight - scrollTop > 10);
    }
  };

  useEffect(() => {
    checkScroll();
  }, [types, snippets, searchTerm]);

  const handleSidebarSelection = (typeId: string) => {
    onMenuSelect(typeId);
    const node = getNodes().find(n => n.id === typeId);
    if (node) {
      toggleNode(typeId, true);
      setCenter(node.position.x + 125, node.position.y + 80, { duration: 800, zoom: 1.2 });
    }
  };

  const filteredTypes = types.filter(type => type.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredSnippets = snippets.filter(snippet => snippet.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="relative flex">
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "w-0" : "w-64"
        } border-r border-gray-200 relative z-10 top-0 shadow-lg shadow-neutral-300 overflow-hidden bg-white`}
      >
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-1 content-center h-14">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 px-2 focus:outline-none"
          />
        </div>
        <div
          ref={contentRef}
          onScroll={checkScroll}
          className={`w-64 transition-transform duration-300 ${
            isCollapsed ? "-translate-x-full" : "translate-x-0"
          } h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']`}
        >
          <div>
            <SidebarSection
              title="Content Types"
              items={filteredTypes}
              onItemSelect={handleSidebarSelection}
            />
            <SidebarSection
              title="Snippets"
              items={filteredSnippets}
              onItemSelect={handleSidebarSelection}
            />
          </div>
        </div>
        {showScrollIndicator && (
          <div
            className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, white)",
            }}
          />
        )}
      </div>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white border-1 border-[#5b4ff5] rounded-full w-9 h-9 hover:bg-[#e7e6ff] transition-all duration-300 z-40 flex items-center justify-center"
      >
        <span className="font-bold text-lg">
          {isCollapsed ? "≫" : "≪"}
        </span>
      </button>
    </div>
  );
};
