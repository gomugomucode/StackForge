import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  EdgeProviderProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  { id: 'js', data: { label: 'JavaScript' }, position: { x: 250, y: 0 }, type: 'input', style: { background: '#f7df1e', color: '#000', fontWeight: 'bold', width: 120 } },
  
  // JS Children
  { id: 'dom', data: { label: 'DOM' }, position: { x: 0, y: 100 }, style: { background: '#fff', border: '1px solid #ddd', width: 100 } },
  { id: 'events', data: { label: 'Events' }, position: { x: 150, y: 100 }, style: { background: '#fff', border: '1px solid #ddd', width: 100 } },
  { id: 'async', data: { label: 'Async' }, position: { x: 300, y: 100 }, style: { background: '#fff', border: '1px solid #ddd', width: 100 } },
  { id: 'es6', data: { label: 'ES6+' }, position: { x: 450, y: 100 }, style: { background: '#fff', border: '1px solid #ddd', width: 100 } },
  { id: 'react', data: { label: 'React' }, position: { x: 600, y: 100 }, style: { background: '#61dafb', color: '#000', fontWeight: 'bold', width: 120 } },

  // React Children
  { id: 'hooks', data: { label: 'Hooks' }, position: { x: 500, y: 200 }, style: { background: '#fff', border: '1px solid #ddd', width: 100 } },
  { id: 'context', data: { label: 'Context' }, position: { x: 600, y: 200 }, style: { background: '#fff', border: '1px solid #ddd', width: 100 } },
  { id: 'routing', data: { label: 'Routing' }, position: { x: 700, y: 200 }, style: { background: '#fff', border: '1px solid #ddd', width: 100 } },
  { id: 'nextjs', data: { label: 'Next.js' }, position: { x: 800, y: 200 }, style: { background: '#000', color: '#fff', width: 100 } },
];

const initialEdges: Edge[] = [
  { id: 'e-js-dom', source: 'js', target: 'dom', animated: true },
  { id: 'e-js-events', source: 'js', target: 'events', animated: true },
  { id: 'e-js-async', source: 'js', target: 'async', animated: true },
  { id: 'e-js-es6', source: 'js', target: 'es6', animated: true },
  { id: 'e-js-react', source: 'js', target: 'react', animated: true },
  
  { id: 'e-react-hooks', source: 'react', target: 'hooks' },
  { id: 'e-react-context', source: 'react', target: 'context' },
  { id: 'e-react-routing', source: 'react', target: 'routing' },
  { id: 'e-react-nextjs', source: 'react', target: 'nextjs' },
];

export default function KnowledgeGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    console.log('Node clicked:', node.id);
    // Here we would navigate to the content related to this node
    // window.location.href = `/docs/${node.id}`;
  };

  return (
    <div style={{ width: '100%', height: '600px', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
