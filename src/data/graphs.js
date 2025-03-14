// Типы графов
export const GraphType = {
    DIRECTED_UNWEIGHTED: 'DIRECTED_UNWEIGHTED',      // Ориентированный невзвешенный
    DIRECTED_WEIGHTED: 'DIRECTED_WEIGHTED',          // Ориентированный взвешенный
    UNDIRECTED_UNWEIGHTED: 'UNDIRECTED_UNWEIGHTED', // Неориентированный невзвешенный
    UNDIRECTED_WEIGHTED: 'UNDIRECTED_WEIGHTED'      // Неориентированный взвешенный
};

// Коллекция графов
export const graphs = {
    // Графы для поиска пути (невзвешенный ориентированный)
    pathFinding: {
        simple1: {
            type: GraphType.DIRECTED_UNWEIGHTED,
            nodes: [
                { id: '1', label: 'A', x: 150, y: 100 },
                { id: '2', label: 'B', x: 250, y: 50 },
                { id: '3', label: 'C', x: 350, y: 100 },
                { id: '4', label: 'D', x: 150, y: 200 },
                { id: '5', label: 'E', x: 250, y: 200 },
                { id: '6', label: 'F', x: 350, y: 200 }
            ],
            edges: [
                { source: '1', target: '2' },
                { source: '2', target: '3' },
                { source: '1', target: '4' },
                { source: '4', target: '5' },
                { source: '5', target: '6' },
                { source: '6', target: '3' },
                { source: '2', target: '5' },
                { source: '1', target: '5' }
            ]
        },
        medium1: {
            type: GraphType.DIRECTED_UNWEIGHTED,
            nodes: [
                { id: '1', label: 'A', x: 150, y: 50 },
                { id: '2', label: 'B', x: 300, y: 50 },
                { id: '3', label: 'C', x: 50, y: 150 },
                { id: '4', label: 'D', x: 150, y: 150 },
                { id: '5', label: 'E', x: 300, y: 150 },
                { id: '6', label: 'F', x: 400, y: 150 },
                { id: '7', label: 'G', x: 150, y: 250 },
                { id: '8', label: 'H', x: 300, y: 250 }
            ],
            edges: [
                { source: '1', target: '2' },
                { source: '2', target: '5' },
                { source: '1', target: '4' },
                { source: '4', target: '3' },
                { source: '3', target: '7' },
                { source: '4', target: '7' },
                { source: '4', target: '5' },
                { source: '5', target: '6' },
                { source: '5', target: '8' },
                { source: '7', target: '8' },
                { source: '8', target: '6' },
                { source: '2', target: '6' }
            ]
        },
        hard1: {
            type: GraphType.DIRECTED_UNWEIGHTED,
            nodes: [
                { id: '1', label: 'A', x: 200, y: 50 },
                { id: '2', label: 'B', x: 350, y: 50 },
                { id: '3', label: 'C', x: 50, y: 150 },
                { id: '4', label: 'D', x: 200, y: 150 },
                { id: '5', label: 'E', x: 350, y: 150 },
                { id: '6', label: 'F', x: 500, y: 150 },
                { id: '7', label: 'G', x: 50, y: 250 },
                { id: '8', label: 'H', x: 200, y: 250 },
                { id: '9', label: 'I', x: 350, y: 250 },
                { id: '10', label: 'J', x: 500, y: 250 }
            ],
            edges: [
                { source: '1', target: '2' },
                { source: '2', target: '5' },
                { source: '1', target: '4' },
                { source: '4', target: '3' },
                { source: '3', target: '7' },
                { source: '4', target: '7' },
                { source: '4', target: '5' },
                { source: '5', target: '6' },
                { source: '5', target: '9' },
                { source: '7', target: '8' },
                { source: '8', target: '9' },
                { source: '9', target: '10' },
                { source: '6', target: '10' },
                { source: '2', target: '6' },
                { source: '1', target: '3' },
                { source: '3', target: '8' },
                { source: '8', target: '5' },
                { source: '5', target: '10' },
                { source: '1', target: '5' },
                { source: '2', target: '4' },
                { source: '6', target: '9' }
            ]
        }
    },

    // Графы для поиска кратчайшего пути (взвешенный ориентированный)
    shortestPath: {
        simple1: {
            type: GraphType.DIRECTED_WEIGHTED,
            nodes: [
                { id: '1', label: 'A', x: 150, y: 100 },
                { id: '2', label: 'B', x: 250, y: 50 },
                { id: '3', label: 'C', x: 350, y: 100 },
                { id: '4', label: 'D', x: 150, y: 200 },
                { id: '5', label: 'E', x: 250, y: 200 },
                { id: '6', label: 'F', x: 350, y: 200 }
            ],
            edges: [
                { source: '1', target: '2', weight: 4 },
                { source: '2', target: '3', weight: 3 },
                { source: '1', target: '4', weight: 2 },
                { source: '4', target: '5', weight: 5 },
                { source: '5', target: '6', weight: 1 },
                { source: '6', target: '3', weight: 4 },
                { source: '2', target: '5', weight: 6 },
                { source: '1', target: '5', weight: 8 }
            ]
        },
        medium1: {
            type: GraphType.DIRECTED_WEIGHTED,
            nodes: [
                { id: '1', label: 'A', x: 150, y: 50 },
                { id: '2', label: 'B', x: 300, y: 50 },
                { id: '3', label: 'C', x: 50, y: 150 },
                { id: '4', label: 'D', x: 150, y: 150 },
                { id: '5', label: 'E', x: 300, y: 150 },
                { id: '6', label: 'F', x: 400, y: 150 },
                { id: '7', label: 'G', x: 150, y: 250 },
                { id: '8', label: 'H', x: 300, y: 250 }
            ],
            edges: [
                { source: '1', target: '2', weight: 4 },
                { source: '2', target: '5', weight: 3 },
                { source: '1', target: '4', weight: 2 },
                { source: '4', target: '3', weight: 7 },
                { source: '3', target: '7', weight: 3 },
                { source: '4', target: '7', weight: 4 },
                { source: '4', target: '5', weight: 1 },
                { source: '5', target: '6', weight: 5 },
                { source: '5', target: '8', weight: 6 },
                { source: '7', target: '8', weight: 2 },
                { source: '8', target: '6', weight: 3 },
                { source: '2', target: '6', weight: 8 }
            ]
        },
        hard1: {
            type: GraphType.DIRECTED_WEIGHTED,
            nodes: [
                { id: '1', label: 'A', x: 200, y: 50 },
                { id: '2', label: 'B', x: 350, y: 50 },
                { id: '3', label: 'C', x: 50, y: 150 },
                { id: '4', label: 'D', x: 200, y: 150 },
                { id: '5', label: 'E', x: 350, y: 150 },
                { id: '6', label: 'F', x: 500, y: 150 },
                { id: '7', label: 'G', x: 50, y: 250 },
                { id: '8', label: 'H', x: 200, y: 250 },
                { id: '9', label: 'I', x: 350, y: 250 },
                { id: '10', label: 'J', x: 500, y: 250 }
            ],
            edges: [
                { source: '1', target: '2', weight: 4 },
                { source: '2', target: '5', weight: 3 },
                { source: '1', target: '4', weight: 2 },
                { source: '4', target: '3', weight: 7 },
                { source: '3', target: '7', weight: 3 },
                { source: '4', target: '7', weight: 4 },
                { source: '4', target: '5', weight: 1 },
                { source: '5', target: '6', weight: 5 },
                { source: '5', target: '9', weight: 6 },
                { source: '7', target: '8', weight: 2 },
                { source: '8', target: '9', weight: 3 },
                { source: '9', target: '10', weight: 4 },
                { source: '6', target: '10', weight: 2 },
                { source: '2', target: '6', weight: 8 },
                { source: '1', target: '3', weight: 5 },
                { source: '3', target: '8', weight: 4 },
                { source: '8', target: '5', weight: 6 },
                { source: '5', target: '10', weight: 7 },
                { source: '1', target: '5', weight: 5 },
                { source: '2', target: '4', weight: 4 },
                { source: '6', target: '9', weight: 3 }
            ]
        }
    },

    // Графы для поиска длиннейшего пути
    longestPath: {
        simple1: {
            type: GraphType.DIRECTED_WEIGHTED,
            nodes: [
                { id: '1', label: 'A', x: 150, y: 100 },
                { id: '2', label: 'B', x: 250, y: 50 },
                { id: '3', label: 'C', x: 350, y: 100 },
                { id: '4', label: 'D', x: 150, y: 200 },
                { id: '5', label: 'E', x: 250, y: 200 },
                { id: '6', label: 'F', x: 350, y: 200 }
            ],
            edges: [
                { source: '1', target: '2', weight: 5 },
                { source: '2', target: '3', weight: 8 },
                { source: '1', target: '4', weight: 3 },
                { source: '4', target: '5', weight: 7 },
                { source: '5', target: '6', weight: 4 },
                { source: '6', target: '3', weight: 6 },
                { source: '2', target: '5', weight: 2 },
                { source: '1', target: '5', weight: 9 }
            ]
        },
        medium1: {
            type: GraphType.DIRECTED_WEIGHTED,
            nodes: [
                { id: '1', label: 'A', x: 150, y: 50 },
                { id: '2', label: 'B', x: 300, y: 50 },
                { id: '3', label: 'C', x: 50, y: 150 },
                { id: '4', label: 'D', x: 150, y: 150 },
                { id: '5', label: 'E', x: 300, y: 150 },
                { id: '6', label: 'F', x: 400, y: 150 },
                { id: '7', label: 'G', x: 150, y: 250 },
                { id: '8', label: 'H', x: 300, y: 250 }
            ],
            edges: [
                { source: '1', target: '2', weight: 7 },
                { source: '2', target: '5', weight: 4 },
                { source: '1', target: '4', weight: 3 },
                { source: '4', target: '3', weight: 8 },
                { source: '3', target: '7', weight: 5 },
                { source: '4', target: '7', weight: 6 },
                { source: '4', target: '5', weight: 9 },
                { source: '5', target: '6', weight: 4 },
                { source: '5', target: '8', weight: 7 },
                { source: '7', target: '8', weight: 5 },
                { source: '8', target: '6', weight: 6 },
                { source: '2', target: '6', weight: 8 }
            ]
        },
        hard1: {
            type: GraphType.DIRECTED_WEIGHTED,
            nodes: [
                { id: '1', label: 'A', x: 200, y: 50 },
                { id: '2', label: 'B', x: 350, y: 50 },
                { id: '3', label: 'C', x: 50, y: 150 },
                { id: '4', label: 'D', x: 200, y: 150 },
                { id: '5', label: 'E', x: 350, y: 150 },
                { id: '6', label: 'F', x: 500, y: 150 },
                { id: '7', label: 'G', x: 50, y: 250 },
                { id: '8', label: 'H', x: 200, y: 250 },
                { id: '9', label: 'I', x: 350, y: 250 },
                { id: '10', label: 'J', x: 500, y: 250 }
            ],
            edges: [
                { source: '1', target: '2', weight: 7 },
                { source: '2', target: '5', weight: 4 },
                { source: '1', target: '4', weight: 3 },
                { source: '4', target: '3', weight: 8 },
                { source: '3', target: '7', weight: 5 },
                { source: '4', target: '7', weight: 6 },
                { source: '4', target: '5', weight: 9 },
                { source: '5', target: '6', weight: 4 },
                { source: '5', target: '9', weight: 7 },
                { source: '7', target: '8', weight: 5 },
                { source: '8', target: '9', weight: 6 },
                { source: '9', target: '10', weight: 8 },
                { source: '6', target: '10', weight: 5 },
                { source: '2', target: '6', weight: 7 },
                { source: '1', target: '3', weight: 6 },
                { source: '3', target: '8', weight: 4 },
                { source: '8', target: '5', weight: 9 },
                { source: '5', target: '10', weight: 8 },
                { source: '1', target: '5', weight: 5 },
                { source: '2', target: '4', weight: 4 },
                { source: '6', target: '9', weight: 3 }
            ]
        }
    },

    // Графы для раскраски (невзвешенный неориентированный)
    coloring: {
        simple1: {
            type: GraphType.UNDIRECTED_UNWEIGHTED,
            nodes: [
                { id: '1', label: 'A', x: 150, y: 100 },
                { id: '2', label: 'B', x: 250, y: 50 },
                { id: '3', label: 'C', x: 350, y: 100 },
                { id: '4', label: 'D', x: 150, y: 200 },
                { id: '5', label: 'E', x: 250, y: 200 },
                { id: '6', label: 'F', x: 350, y: 200 }
            ],
            edges: [
                { source: '1', target: '2' },
                { source: '2', target: '3' },
                { source: '3', target: '6' },
                { source: '6', target: '5' },
                { source: '5', target: '4' },
                { source: '4', target: '1' },
                { source: '2', target: '5' },
                { source: '3', target: '5' }
            ]
        },
        medium1: {
            type: GraphType.UNDIRECTED_UNWEIGHTED,
            nodes: [
                { id: '1', label: 'A', x: 150, y: 50 },
                { id: '2', label: 'B', x: 300, y: 50 },
                { id: '3', label: 'C', x: 50, y: 150 },
                { id: '4', label: 'D', x: 150, y: 150 },
                { id: '5', label: 'E', x: 300, y: 150 },
                { id: '6', label: 'F', x: 400, y: 150 },
                { id: '7', label: 'G', x: 150, y: 250 },
                { id: '8', label: 'H', x: 300, y: 250 }
            ],
            edges: [
                { source: '1', target: '2' },
                { source: '2', target: '5' },
                { source: '1', target: '4' },
                { source: '4', target: '3' },
                { source: '3', target: '7' },
                { source: '4', target: '7' },
                { source: '4', target: '5' },
                { source: '5', target: '6' },
                { source: '5', target: '8' },
                { source: '7', target: '8' },
                { source: '8', target: '6' },
                { source: '2', target: '6' },
                { source: '1', target: '3' },
                { source: '2', target: '4' }
            ]
        },
        hard1: {
            type: GraphType.UNDIRECTED_UNWEIGHTED,
            nodes: [
                { id: '1', label: 'A', x: 200, y: 50 },
                { id: '2', label: 'B', x: 350, y: 50 },
                { id: '3', label: 'C', x: 50, y: 150 },
                { id: '4', label: 'D', x: 200, y: 150 },
                { id: '5', label: 'E', x: 350, y: 150 },
                { id: '6', label: 'F', x: 500, y: 150 },
                { id: '7', label: 'G', x: 50, y: 250 },
                { id: '8', label: 'H', x: 200, y: 250 },
                { id: '9', label: 'I', x: 350, y: 250 },
                { id: '10', label: 'J', x: 500, y: 250 }
            ],
            edges: [
                { source: '1', target: '2' },
                { source: '2', target: '5' },
                { source: '1', target: '4' },
                { source: '4', target: '3' },
                { source: '3', target: '7' },
                { source: '4', target: '7' },
                { source: '4', target: '5' },
                { source: '5', target: '6' },
                { source: '5', target: '9' },
                { source: '7', target: '8' },
                { source: '8', target: '9' },
                { source: '9', target: '10' },
                { source: '6', target: '10' },
                { source: '2', target: '6' },
                { source: '1', target: '3' },
                { source: '3', target: '8' },
                { source: '8', target: '5' },
                { source: '5', target: '10' },
                { source: '1', target: '5' },
                { source: '2', target: '4' },
                { source: '6', target: '9' }
            ]
        }
    },

    // Графы для поиска остовного дерева (взвешенный неориентированный)
    spanningTree: {
        simple1: {
            type: GraphType.UNDIRECTED_WEIGHTED,
            nodes: [
                { id: '1', label: 'A', x: 150, y: 100 },
                { id: '2', label: 'B', x: 250, y: 50 },
                { id: '3', label: 'C', x: 350, y: 100 },
                { id: '4', label: 'D', x: 150, y: 200 },
                { id: '5', label: 'E', x: 250, y: 200 },
                { id: '6', label: 'F', x: 350, y: 200 }
            ],
            edges: [
                { source: '1', target: '2', weight: 3 },
                { source: '2', target: '3', weight: 4 },
                { source: '3', target: '6', weight: 2 },
                { source: '6', target: '5', weight: 5 },
                { source: '5', target: '4', weight: 1 },
                { source: '4', target: '1', weight: 6 },
                { source: '2', target: '5', weight: 4 },
                { source: '3', target: '5', weight: 3 }
            ]
        },
        medium1: {
            type: GraphType.UNDIRECTED_WEIGHTED,
            nodes: [
                { id: '1', label: 'A', x: 150, y: 50 },
                { id: '2', label: 'B', x: 300, y: 50 },
                { id: '3', label: 'C', x: 50, y: 150 },
                { id: '4', label: 'D', x: 150, y: 150 },
                { id: '5', label: 'E', x: 300, y: 150 },
                { id: '6', label: 'F', x: 400, y: 150 },
                { id: '7', label: 'G', x: 150, y: 250 },
                { id: '8', label: 'H', x: 300, y: 250 }
            ],
            edges: [
                { source: '1', target: '2', weight: 4 },
                { source: '2', target: '5', weight: 3 },
                { source: '1', target: '4', weight: 2 },
                { source: '4', target: '3', weight: 7 },
                { source: '3', target: '7', weight: 3 },
                { source: '4', target: '7', weight: 4 },
                { source: '4', target: '5', weight: 1 },
                { source: '5', target: '6', weight: 5 },
                { source: '5', target: '8', weight: 6 },
                { source: '7', target: '8', weight: 2 },
                { source: '8', target: '6', weight: 3 },
                { source: '2', target: '6', weight: 8 },
                { source: '1', target: '3', weight: 5 },
                { source: '2', target: '4', weight: 4 }
            ]
        },
        hard1: {
            type: GraphType.UNDIRECTED_WEIGHTED,
            nodes: [
                { id: '1', label: 'A', x: 200, y: 50 },
                { id: '2', label: 'B', x: 350, y: 50 },
                { id: '3', label: 'C', x: 50, y: 150 },
                { id: '4', label: 'D', x: 200, y: 150 },
                { id: '5', label: 'E', x: 350, y: 150 },
                { id: '6', label: 'F', x: 500, y: 150 },
                { id: '7', label: 'G', x: 50, y: 250 },
                { id: '8', label: 'H', x: 200, y: 250 },
                { id: '9', label: 'I', x: 350, y: 250 },
                { id: '10', label: 'J', x: 500, y: 250 }
            ],
            edges: [
                { source: '1', target: '2', weight: 4 },
                { source: '2', target: '5', weight: 3 },
                { source: '1', target: '4', weight: 2 },
                { source: '4', target: '3', weight: 7 },
                { source: '3', target: '7', weight: 3 },
                { source: '4', target: '7', weight: 4 },
                { source: '4', target: '5', weight: 1 },
                { source: '5', target: '6', weight: 5 },
                { source: '5', target: '9', weight: 6 },
                { source: '7', target: '8', weight: 2 },
                { source: '8', target: '9', weight: 3 },
                { source: '9', target: '10', weight: 4 },
                { source: '6', target: '10', weight: 2 },
                { source: '2', target: '6', weight: 8 },
                { source: '1', target: '3', weight: 5 },
                { source: '3', target: '8', weight: 4 },
                { source: '8', target: '5', weight: 6 },
                { source: '5', target: '10', weight: 7 },
                { source: '1', target: '5', weight: 5 },
                { source: '2', target: '4', weight: 4 },
                { source: '6', target: '9', weight: 3 }
            ]
        }
    }
};

// Функция для получения графа по идентификатору
export const getGraph = (graphId) => {
    const [category, id] = graphId.split('.');
    return graphs[category]?.[id];
}; 