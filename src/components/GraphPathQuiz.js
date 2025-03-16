import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { getGraph } from '../data/graphs';
import './GraphPathQuiz.css';

const GraphPathQuiz = ({ task, onScoreUpdate }) => {
    const width = 600, height = 400;
    const [selectedPath, setSelectedPath] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);

    const graph = getGraph(task.graphId);
    const { startNode, endNode } = task;

    useEffect(() => {
        setSelectedPath([]);
        setIsCompleted(false);
    }, [task]);

    if (!graph || !graph.nodes || !graph.edges) {
        return (
            <Typography variant="h6" align="center" color="error">
                Ошибка загрузки графа: граф не найден или имеет неверную структуру
            </Typography>
        );
    }

    function findCorrectPath() {
        if (task.type === 'GRAPH_SHORTEST_PATH') {
            return dijkstra(graph, startNode, endNode);
        } else if (task.type === 'GRAPH_PATH') {
            return bfs(graph, startNode, endNode);
        }
        return [];
    }

    function dijkstra(graph, start, end) {
        let distances = {}, prev = {}, queue = [];
        graph.nodes.forEach(node => {
            distances[node.id] = Infinity;
            prev[node.id] = null;
            queue.push(node.id);
        });
        distances[start] = 0;

        while (queue.length) {
            queue.sort((a, b) => distances[a] - distances[b]);
            let u = queue.shift();

            if (u === end) break;

            graph.edges.forEach(edge => {
                if (edge.source === u || edge.target === u) {
                    let neighbor = edge.source === u ? edge.target : edge.source;
                    let alt = distances[u] + (edge.weight || 1);
                    if (alt < distances[neighbor]) {
                        distances[neighbor] = alt;
                        prev[neighbor] = u;
                    }
                }
            });
        }

        let path = [], u = end;
        while (prev[u] !== null) {
            path.unshift(u);
            u = prev[u];
        }
        path.unshift(start);
        return path;
    }

    function bfs(graph, start, end) {
        let queue = [[start]];
        let visited = new Set();

        while (queue.length > 0) {
            let path = queue.shift();
            let node = path[path.length - 1];

            if (node === end) {
                return path;
            }

            if (!visited.has(node)) {
                visited.add(node);

                let neighbors = graph.edges
                    .filter(edge => edge.source === node || edge.target === node)
                    .map(edge => edge.source === node ? edge.target : edge.source);

                for (let neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        queue.push([...path, neighbor]);
                    }
                }
            }
        }
        return [];
    }

    const handleClick = (nodeId) => {
        const lastNode = selectedPath[selectedPath.length - 1];
        
        if (selectedPath.length === 0 || isConnected(lastNode, nodeId)) {
            const newPath = [...selectedPath, nodeId];
            setSelectedPath(newPath);

            if (nodeId === endNode) {
                const correctPath = findCorrectPath();
                const isCorrect = comparePaths(newPath, correctPath);
                setIsCompleted(true);
                onScoreUpdate(isCorrect ? task.maxScore : 0);
            }
        }
    };

    function isConnected(node1, node2) {
        if (!node1 || !node2) return false;
        return graph.edges.some(edge => 
            (edge.source === node1 && edge.target === node2) ||
            (edge.source === node2 && edge.target === node1)
        );
    }

    function comparePaths(path1, path2) {
        if (path1.length !== path2.length) return false;
        return path1.every((node, index) => node === path2[index]);
    }

    function getNodeClasses(nodeId) {
        let classes = ['node'];
        if (nodeId === startNode) classes.push('start');
        if (nodeId === endNode) classes.push('end');
        if (selectedPath.includes(nodeId)) classes.push('selected');
        return classes.join(' ');
    }

    return (
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                    {task.title}
                </Typography>
                <Typography variant="body1">
                    {task.description}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Box className="graph-box" sx={{ flex: 2 }}>
                    <svg width={width} height={height}>
                        {/* Рисуем рёбра */}
                        {graph.edges.map((edge, index) => {
                            const sourceNode = graph.nodes.find(n => n.id === edge.source);
                            const targetNode = graph.nodes.find(n => n.id === edge.target);
                            
                            if (!sourceNode || !targetNode) return null;
                            
                            return (
                                <g key={`edge-${index}`}>
                                    <line
                                        x1={sourceNode.x}
                                        y1={sourceNode.y}
                                        x2={targetNode.x}
                                        y2={targetNode.y}
                                        stroke={selectedPath.includes(edge.source) && 
                                               selectedPath.includes(edge.target) ? '#ff9800' : '#666'}
                                        strokeWidth="2"
                                    />
                                    {edge.weight && (
                                        <text
                                            x={(sourceNode.x + targetNode.x) / 2}
                                            y={(sourceNode.y + targetNode.y) / 2}
                                            dy="-5"
                                            textAnchor="middle"
                                            fill="#666"
                                        >
                                            {edge.weight}
                                        </text>
                                    )}
                                </g>
                            );
                        })}
                        
                        {/* Рисуем вершины */}
                        {graph.nodes.map((node) => (
                            <g key={node.id} onClick={() => handleClick(node.id)}>
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r="20"
                                    className={getNodeClasses(node.id)}
                                    fill={node.id === startNode ? '#4caf50' : 
                                          node.id === endNode ? '#f44336' : '#fff'}
                                    stroke="#666"
                                    strokeWidth="2"
                                />
                                <text
                                    x={node.x}
                                    y={node.y}
                                    dy="6"
                                    textAnchor="middle"
                                    fill="#000"
                                >
                                    {node.label}
                                </text>
                            </g>
                        ))}
                    </svg>
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography variant="body2">
                        {isCompleted ? 
                            "Путь построен" : 
                            "Выберите вершины в правильном порядке"}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default GraphPathQuiz; 