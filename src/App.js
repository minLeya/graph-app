import React, { useState } from "react";
import * as d3 from "d3";

const GraphPathQuiz = () => {
    const width = 600, height = 400;
    const [selectedPath, setSelectedPath] = useState([]);
    const [score, setScore] = useState(0);
    
    const graph = {
        nodes: [
            { id: 0, x: 100, y: 200 },
            { id: 1, x: 250, y: 100 },
            { id: 2, x: 400, y: 200 },
            { id: 3, x: 250, y: 300 },
            { id: 4, x: 550, y: 200 }
        ],
        links: [
            { source: 0, target: 1, weight: 2 },
            { source: 1, target: 2, weight: 2 },
            { source: 2, target: 4, weight: 3 },
            { source: 0, target: 3, weight: 4 },
            { source: 3, target: 4, weight: 5 }
        ]
    };

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
            
            graph.links.filter(l => l.source === u || l.target === u).forEach(link => {
                let neighbor = link.source === u ? link.target : link.source;
                let alt = distances[u] + link.weight;
                if (alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    prev[neighbor] = u;
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
    
    const correctPath = dijkstra(graph, 0, 4);
    
    const handleClick = (id) => {
        if (!selectedPath.includes(id)) {
            const newPath = [...selectedPath, id];
            setSelectedPath(newPath);
            
            let correctUntil = 0;
            for (let i = 0; i < newPath.length; i++) {
                if (newPath[i] !== correctPath[i]) break;
                correctUntil = i + 1;
            }
            let newScore = (8 * correctUntil) / correctPath.length;
            setScore(newScore.toFixed(2));
        }
    };
    
    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", background: "#333", color: "white", borderRadius: "8px" }}>
                <div>🔍 📊 ⚙️</div>
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>Графовые задачи</div>
                <div>👤</div>
            </header>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px 0" }}>
                <div style={{ fontSize: "18px" }}>Задание: 1/12</div>
                <div style={{ fontSize: "20px", fontWeight: "bold" }}>Кратчайший путь</div>
                <div style={{ fontSize: "18px" }}>⏳ Время: 00:30</div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ flex: "1" }}>
                    <svg width={width} height={height} style={{ border: "1px solid gray", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                        {graph.links.map((link, index) => (
                            <g key={index}>
                                <line x1={graph.nodes[link.source].x} y1={graph.nodes[link.source].y}
                                      x2={graph.nodes[link.target].x} y2={graph.nodes[link.target].y}
                                      stroke="black" strokeWidth={2} />
                                <text x={(graph.nodes[link.source].x + graph.nodes[link.target].x) / 2}
                                      y={(graph.nodes[link.source].y + graph.nodes[link.target].y) / 2 - 5}
                                      fontSize="14" fill="black" textAnchor="middle">{link.weight}</text>
                            </g>
                        ))}
                        {graph.nodes.map((node) => (
                            <g key={node.id} style={{ cursor: "pointer" }}>
                                <circle cx={node.x} cy={node.y} r={20} onClick={() => handleClick(node.id)}
                                        fill={node.id === 0 ? "green" : node.id === 4 ? "red" : (selectedPath.includes(node.id) ? "orange" : "lightblue")}
                                        stroke="black" strokeWidth={2} />
                                <text x={node.x} y={node.y} textAnchor="middle" dy={5} fontSize="14" fill="white">{node.id}</text>
                            </g>
                        ))}
                    </svg>
                </div>
                <div style={{ flex: "1", padding: "20px", background: "#f9f9f9", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                    <h2>Описание задания</h2>
                    <p>Выберите вершины кратчайшего пути от начальной до конечной точки, нажимая на них.</p>
                    <p style={{ fontSize: "18px", fontWeight: "bold" }}>Баллы: {score}</p>
                </div>
            </div>
        </div>
    );
};

export default GraphPathQuiz;
