import React from "react";
import { ReactFlow, MiniMap, Controls, Background, applyNodeChanges, useReactFlow, Node, Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Toolbar } from "./Toolbar";
import { Sidebar } from "./Sidebar";
import { nodeTypes } from "../../utils/layout";
import { useNodeState } from "../../contexts/NodeStateContext";
import { useNodeLayout } from "../../hooks/useNodeLayout";

type CanvasProps = {
  nodes: Node[];
  edges: Edge[];
  types: any[]; // We'll type this properly when adding snippet support
  selectedNodeId: string | null;
  onNodeSelect: (nodeId: string) => void;
};

export const Canvas: React.FC<CanvasProps> = ({
  nodes,
  edges,
  types,
  selectedNodeId,
  onNodeSelect,
}) => {
  const { expandedNodes, isolation } = useNodeState();
  const { setNodes } = useReactFlow();

  useNodeLayout(nodes, edges, selectedNodeId, expandedNodes, isolation, setNodes);

  return (
    <div className="flex h-full w-full">
      <Sidebar types={types} onMenuSelect={onNodeSelect} />
      <div className="flex-1 w-full h-full pb-14">
        <Toolbar />
        <ReactFlow
          defaultNodes={[] as Node[]}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={(_, node) => onNodeSelect(node.id)}
          onNodesChange={(changes) => setNodes(nodes => applyNodeChanges(changes, nodes))}
          fitView
        >
          <MiniMap pannable />
          <Controls />
          <Background id="background-1" color="grey" gap={20} />
        </ReactFlow>
      </div>
    </div>
  );
};
