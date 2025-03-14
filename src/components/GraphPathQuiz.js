import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import './GraphPathQuiz.css';

const GraphPathQuiz = ({ task, onScoreUpdate }) => {
    const width = 600, height = 400;
    const [selectedPath, setSelectedPath] = useState([]);
    const [score, setScore] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    const { graph, startNode, endNode } = task;

    useEffect(() => {
        setSelectedPath([]);
        setScore(0);
        setIsCompleted(false);
    }, [task]);

    function findCorrectPath() {
        if (task.type === 'dijkstra') {
            return dijkstra(graph, startNode, endNode);
        } else if (task.type === 'shortestEdgePath') {
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

            graph.links.forEach(link => {
                if (link.source === u || link.target === u) {
                    let neighbor = link.source === u ? link.target : link.source;
                    let alt = distances[u] + link.weight;
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
        let queue = [[start]], visited = new Set([start]);
        
        while (queue.length > 0) {
            let path = queue.shift();
            let node = path[path.length - 1];
            
            if (node === end) {
                return path;
            }
            
            graph.links
                .filter(link => link.source === node || link.target === node)
                .forEach(link => {
                    let next = link.source === node ? link.target : link.source;
                    if (!visited.has(next)) {
                        visited.add(next);
                        queue.push([...path, next]);
                    }
                });
        }
        return [];
    }

    const correctPath = findCorrectPath();

    const handleClick = (id) => {
        if (isCompleted || selectedPath.includes(id)) return;

        const lastNode = selectedPath[selectedPath.length - 1] ?? startNode;
        const isNeighbor = graph.links.some(link =>
            (link.source === lastNode && link.target === id) ||
            (link.target === lastNode && link.source === id)
        );

        if (!isNeighbor && selectedPath.length > 0) return;

        const newPath = [...selectedPath, id];
        setSelectedPath(newPath);

        // Проверяем правильность пути до текущей точки
        let isCorrectSoFar = true;
        for (let i = 0; i < newPath.length; i++) {
            if (newPath[i] !== correctPath[i]) {
                isCorrectSoFar = false;
                break;
            }
        }

        if (!isCorrectSoFar) {
            // Если путь неверный, завершаем задание
            setIsCompleted(true);
            onScoreUpdate(score);
            return;
        }

        // Если дошли до конечной вершины по правильному пути
        if (id === endNode && newPath.length === correctPath.length) {
            const newScore = 10; // Максимальный балл за правильное решение
            setScore(newScore);
            setIsCompleted(true);
            onScoreUpdate(newScore);
            return;
        }

        // Обновляем текущий счет
        const newScore = (8 * newPath.length) / correctPath.length;
        setScore(newScore.toFixed(2));
    };

    const getNodeClasses = (node) => {
        const classes = [];
        if (node.id === startNode) classes.push('start');
        if (node.id === endNode) classes.push('end');
        if (selectedPath.includes(node.id)) classes.push('selected');
        return classes.join(' ');
    };

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                {task.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {task.description}
            </Typography>

            <Box sx={{ display: 'flex', gap: 3 }}>
                <Box className="graph-box" sx={{ flex: 2 }}>
                    <svg width={width} height={height}>
                        {/* Рисуем рёбра */}
                        {graph.links.map((link, index) => (
                            <g key={index}>
                                <line
                                    x1={graph.nodes[link.source].x}
                                    y1={graph.nodes[link.source].y}
                                    x2={graph.nodes[link.target].x}
                                    y2={graph.nodes[link.target].y}
                                    stroke={selectedPath.includes(link.source) && 
                                           selectedPath.includes(link.target) &&
                                           Math.abs(selectedPath.indexOf(link.source) - 
                                           selectedPath.indexOf(link.target)) === 1 
                                           ? "#ff9800" : "#666"}
                                    strokeWidth={2}
                                />
                                <text
                                    x={(graph.nodes[link.source].x + graph.nodes[link.target].x) / 2}
                                    y={(graph.nodes[link.source].y + graph.nodes[link.target].y) / 2 - 5}
                                    fontSize="14"
                                    fill="black"
                                    textAnchor="middle"
                                >
                                    {link.weight}
                                </text>
                            </g>
                        ))}
                        
                        {/* Рисуем вершины */}
                        {graph.nodes.map((node) => (
                            <g key={node.id}>
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r={20}
                                    onClick={() => handleClick(node.id)}
                                    className={getNodeClasses(node)}
                                    fill={
                                        node.id === startNode ? "#4caf50" :
                                        node.id === endNode ? "#f44336" :
                                        selectedPath.includes(node.id) ? "#ff9800" : "#90caf9"
                                    }
                                    stroke="black"
                                    strokeWidth={2}
                                    style={{ cursor: 'pointer' }}
                                />
                                <text
                                    x={node.x}
                                    y={node.y}
                                    textAnchor="middle"
                                    dy={5}
                                    fontSize="14"
                                    fill="white"
                                >
                                    {node.id}
                                </text>
                            </g>
                        ))}
                    </svg>
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                        Текущий балл: {score}
                    </Typography>
                    <Typography variant="body2">
                        {isCompleted ? 
                            (score === 10 ? "Задание выполнено верно!" : "Задание завершено с ошибкой") : 
                            "Выберите вершины в правильном порядке"}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default GraphPathQuiz; 