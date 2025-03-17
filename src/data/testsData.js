import { graphs, GraphType } from './graphs';

// Типы заданий
export const TaskType = {
    TEXT_QUESTION: 'TEXT_QUESTION',
    GRAPH_PATH: 'GRAPH_PATH',
    GRAPH_SHORTEST_PATH: 'GRAPH_SHORTEST_PATH',
    GRAPH_LONGEST_PATH: 'GRAPH_LONGEST_PATH',
    GRAPH_SPANNING_TREE: 'GRAPH_SPANNING_TREE',
    GRAPH_EDGE_COLORING: 'GRAPH_EDGE_COLORING',
};

// Структура тестов
export const testsData = {
    pathfinding: {
        id: 'pathfinding',
        title: 'Поиск пути с наименьшим числом рёбер',
        tests: {
            test1: {
                id: 'test1',
                title: 'Тест 1',
                description: 'Базовые задачи на поиск пути в графе',
                tasks: [
                    {
                        id: 1,
                        type: TaskType.TEXT_QUESTION,
                        title: 'Что такое путь в ориентированном графе?',
                        options: [
                            'Последовательность вершин, соединенных ребрами',
                            'Последовательность вершин, соединенных дугами в соответствии с их направлением',
                            'Любая последовательность вершин',
                            'Замкнутая последовательность вершин'
                        ],
                        correctAnswer: 1,
                        maxScore: 1
                    },
                    {
                        id: 2,
                        type: TaskType.GRAPH_PATH,
                        title: 'Найдите путь из вершины A в вершину F, проходящий через наименьшее количество рёбер',
                        graphId: 'pathFinding.simple1',
                        startNode: '1',
                        endNode: '6',
                        maxScore: 5
                    }
                ]
            },
            test2: {
                id: 'test2',
                title: 'Тест 2',
                description: 'Задачи повышенной сложности на поиск путей',
                tasks: [
                    {
                        id: 1,
                        type: TaskType.GRAPH_PATH,
                        title: 'Найдите путь из вершины A в вершину H с наименьшим количеством рёбер',
                        graphId: 'pathFinding.medium1',
                        startNode: '1',
                        endNode: '8',
                        maxScore: 5
                    },
                    {
                        id: 2,
                        type: TaskType.GRAPH_PATH,
                        title: 'Найдите путь из вершины B в вершину J, используя минимальное количество рёбер',
                        graphId: 'pathFinding.hard1',
                        startNode: '2',
                        endNode: '10',
                        maxScore: 5
                    },
                    {
                        id: 3,
                        type: TaskType.TEXT_QUESTION,
                        title: 'Какой алгоритм лучше всего подходит для поиска пути с наименьшим числом рёбер?',
                        options: [
                            'Алгоритм Дейкстры',
                            'Поиск в глубину (DFS)',
                            'Поиск в ширину (BFS)',
                            'Алгоритм Флойда-Уоршелла'
                        ],
                        correctAnswer: 2,
                        maxScore: 1
                    }
                ]
            }
        }
    },
    shortestPath: {
        id: 'shortestPath',
        title: 'Поиск кратчайшего пути',
        tests: {
            test1: {
                id: 'test1',
                title: 'Тест 1',
                description: 'Базовые задачи на поиск кратчайшего пути',
                tasks: [
                    {
                        id: 1,
                        type: TaskType.TEXT_QUESTION,
                        title: 'Для каких графов применим алгоритм Дейкстры?',
                        options: [
                            'Только для неориентированных графов',
                            'Для любых графов с неотрицательными весами рёбер',
                            'Только для графов без циклов',
                            'Для любых графов, включая графы с отрицательными весами'
                        ],
                        correctAnswer: 1,
                        maxScore: 1
                    },
                    {
                        id: 2,
                        type: TaskType.GRAPH_SHORTEST_PATH,
                        title: 'Найдите кратчайший путь от вершины A до вершины F',
                        graphId: 'shortestPath.simple1',
                        startNode: '1',
                        endNode: '6',
                        maxScore: 5
                    }
                ]
            },
            test2: {
                id: 'test2',
                title: 'Тест 2',
                description: 'Задачи повышенной сложности на поиск кратчайшего пути',
                tasks: [
                    {
                        id: 1,
                        type: TaskType.GRAPH_SHORTEST_PATH,
                        title: 'Найдите кратчайший путь от A до H',
                        graphId: 'shortestPath.medium1',
                        startNode: '1',
                        endNode: '8',
                        maxScore: 5
                    },
                    {
                        id: 2,
                        type: TaskType.GRAPH_SHORTEST_PATH,
                        title: 'Найдите кратчайший путь от B до J',
                        graphId: 'shortestPath.hard1',
                        startNode: '2',
                        endNode: '10',
                        maxScore: 5
                    }
                ]
            }
        }
    },
    longestPath: {
        id: 'longestPath',
        title: 'Задача поиска самого длинного пути',
        tests: {
            test1: {
                id: 'test1',
                title: 'Тест 1',
                description: 'Базовые задачи на поиск самого длинного пути',
                tasks: [
                    {
                        id: 1,
                        type: TaskType.TEXT_QUESTION,
                        title: 'В чём основная сложность поиска длиннейшего пути в графе?',
                        options: [
                            'Алгоритм всегда работает очень медленно',
                            'Задача является NP-полной для общего случая',
                            'Требуется много памяти',
                            'Алгоритм может зациклиться'
                        ],
                        correctAnswer: 1,
                        maxScore: 1
                    },
                    {
                        id: 2,
                        type: TaskType.GRAPH_LONGEST_PATH,
                        title: 'Найдите самый длинный путь от A до F',
                        graphId: 'longestPath.simple1',
                        startNode: '1',
                        endNode: '6',
                        maxScore: 5
                    }
                ]
            },
            test2: {
                id: 'test2',
                title: 'Тест 2',
                description: 'Задачи повышенной сложности на поиск длиннейшего пути',
                tasks: [
                    {
                        id: 1,
                        type: TaskType.GRAPH_LONGEST_PATH,
                        title: 'Найдите самый длинный путь от A до H',
                        graphId: 'longestPath.medium1',
                        startNode: '1',
                        endNode: '8',
                        maxScore: 5
                    },
                    {
                        id: 2,
                        type: TaskType.GRAPH_LONGEST_PATH,
                        title: 'Найдите самый длинный путь от B до J',
                        graphId: 'longestPath.hard1',
                        startNode: '2',
                        endNode: '10',
                        maxScore: 5
                    }
                ]
            }
        }
    },
    spanningTree: {
        id: 'spanningTree',
        title: 'Минимальное покрывающее дерево',
        tests: {
            test1: {
                id: 'test1',
                title: 'Тест 1',
                description: 'Базовые задачи на построение минимального остовного дерева',
                tasks: [
                    {
                        id: 1,
                        type: TaskType.TEXT_QUESTION,
                        title: 'Что такое остовное дерево графа?',
                        options: [
                            'Любой связный подграф',
                            'Дерево, содержащее все вершины исходного графа',
                            'Граф без циклов',
                            'Полный граф'
                        ],
                        correctAnswer: 1,
                        maxScore: 1
                    },
                    {
                        id: 2,
                        type: TaskType.GRAPH_SPANNING_TREE,
                        title: 'Постройте минимальное остовное дерево для графа с 6 вершинами',
                        graphId: 'spanningTree.simple1',
                        maxScore: 5
                    }
                ]
            },
            test2: {
                id: 'test2',
                title: 'Тест 2',
                description: 'Задачи повышенной сложности на построение минимального остовного дерева',
                tasks: [
                    {
                        id: 1,
                        type: TaskType.GRAPH_SPANNING_TREE,
                        title: 'Постройте минимальное остовное дерево в графе с 8 вершинами',
                        graphId: 'spanningTree.medium1',
                        maxScore: 5
                    },
                    {
                        id: 2,
                        type: TaskType.GRAPH_SPANNING_TREE,
                        title: 'Постройте минимальное остовное дерево в графе с 10 вершинами',
                        graphId: 'spanningTree.hard1',
                        maxScore: 5
                    }
                ]
            }
        }
    },
    edgeColoring: {
        id: 'edgeColoring',
        title: 'Реберная раскраска графа',
        tests: {
            test1: {
                id: 'test1',
                title: 'Тест 1',
                description: 'Базовые задачи на реберную раскраску',
                tasks: [
                    {
                        id: 1,
                        type: TaskType.TEXT_QUESTION,
                        title: 'Что такое хроматический индекс графа?',
                        options: [
                            'Минимальное число цветов для раскраски вершин',
                            'Минимальное число цветов для раскраски рёбер',
                            'Количество рёбер в графе',
                            'Количество различных цветов в графе'
                        ],
                        correctAnswer: 1,
                        maxScore: 1
                    },
                    {
                        id: 2,
                        type: TaskType.GRAPH_EDGE_COLORING,
                        title: 'Раскрасьте рёбра графа с 6 вершинами минимальным количеством цветов',
                        graphId: 'coloring.simple1',
                        maxScore: 5
                    }
                ]
            },
            test2: {
                id: 'test2',
                title: 'Тест 2',
                description: 'Задачи повышенной сложности на реберную раскраску',
                tasks: [
                    {
                        id: 1,
                        type: TaskType.GRAPH_EDGE_COLORING,
                        title: 'Выполните реберную раскраску графа с 8 вершинами',
                        graphId: 'coloring.medium1',
                        maxScore: 5
                    },
                    {
                        id: 2,
                        type: TaskType.GRAPH_EDGE_COLORING,
                        title: 'Раскрасьте рёбра графа с 10 вершинами',
                        graphId: 'coloring.hard1',
                        maxScore: 5
                    }
                ]
            }
        }
    },
    vertexColoring: {
        id: 'vertexColoring',
        title: 'Вершинная раскраска графа',
        tests: {
            test1: {
                id: 'test1',
                title: 'Тест 1: Основы вершинной раскраски',
                tasks: []
            }
        }
    }
};

// Вспомогательные функции
export const getTestTasks = (topicId, testId) => {
    return testsData[topicId]?.tests[testId]?.tasks || [];
};

export const getTestInfo = (topicId, testId) => {
    return testsData[topicId]?.tests[testId] || null;
};

export const getGraph = (graphId) => {
    const [category, id] = graphId.split('.');
    const graphs = graphsData[category];
    return graphs ? graphs[id] : null;
};

// Данные графов
export const graphsData = {
    pathFinding: {
        simple1: {
            type: GraphType.DIRECTED_UNWEIGHTED,
            vertices: ['A', 'B', 'C', 'D', 'E', 'F'],
            edges: [
                { from: 'A', to: 'B' },
                { from: 'B', to: 'C' },
                { from: 'C', to: 'D' },
                { from: 'D', to: 'E' },
                { from: 'B', to: 'E' },
                { from: 'C', to: 'F' },
                { from: 'E', to: 'F' },
            ],
        },
        medium1: {
            type: GraphType.DIRECTED_UNWEIGHTED,
            vertices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            edges: [
                { from: 'A', to: 'B' },
                { from: 'B', to: 'C' },
                { from: 'C', to: 'D' },
                { from: 'D', to: 'E' },
                { from: 'B', to: 'F' },
                { from: 'C', to: 'F' },
                { from: 'D', to: 'G' },
                { from: 'E', to: 'H' },
                { from: 'F', to: 'G' },
                { from: 'G', to: 'H' },
                { from: 'F', to: 'H' },
            ],
        },
        hard1: {
            type: GraphType.DIRECTED_UNWEIGHTED,
            vertices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
            edges: [
                { from: 'A', to: 'B' },
                { from: 'B', to: 'C' },
                { from: 'C', to: 'D' },
                { from: 'D', to: 'E' },
                { from: 'B', to: 'F' },
                { from: 'C', to: 'G' },
                { from: 'D', to: 'H' },
                { from: 'E', to: 'I' },
                { from: 'F', to: 'G' },
                { from: 'G', to: 'H' },
                { from: 'H', to: 'I' },
                { from: 'F', to: 'J' },
                { from: 'G', to: 'J' },
                { from: 'I', to: 'J' },
            ],
        },
    },
    shortestPath: {
        simple1: {
            type: GraphType.DIRECTED_WEIGHTED,
            vertices: ['A', 'B', 'C', 'D', 'E', 'F'],
            edges: [
                { from: 'A', to: 'B', weight: 2 },
                { from: 'B', to: 'C', weight: 3 },
                { from: 'C', to: 'D', weight: 1 },
                { from: 'D', to: 'E', weight: 4 },
                { from: 'B', to: 'E', weight: 6 },
                { from: 'C', to: 'F', weight: 2 },
                { from: 'E', to: 'F', weight: 1 },
            ],
        },
        medium1: {
            type: GraphType.DIRECTED_WEIGHTED,
            vertices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            edges: [
                { from: 'A', to: 'B', weight: 4 },
                { from: 'B', to: 'C', weight: 2 },
                { from: 'C', to: 'D', weight: 3 },
                { from: 'D', to: 'E', weight: 1 },
                { from: 'B', to: 'F', weight: 5 },
                { from: 'C', to: 'F', weight: 2 },
                { from: 'D', to: 'G', weight: 6 },
                { from: 'E', to: 'H', weight: 4 },
                { from: 'F', to: 'G', weight: 3 },
                { from: 'G', to: 'H', weight: 2 },
                { from: 'F', to: 'H', weight: 7 },
            ],
        },
        hard1: {
            type: GraphType.DIRECTED_WEIGHTED,
            vertices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
            edges: [
                { from: 'A', to: 'B', weight: 3 },
                { from: 'B', to: 'C', weight: 4 },
                { from: 'C', to: 'D', weight: 2 },
                { from: 'D', to: 'E', weight: 5 },
                { from: 'B', to: 'F', weight: 6 },
                { from: 'C', to: 'G', weight: 3 },
                { from: 'D', to: 'H', weight: 4 },
                { from: 'E', to: 'I', weight: 2 },
                { from: 'F', to: 'G', weight: 5 },
                { from: 'G', to: 'H', weight: 3 },
                { from: 'H', to: 'I', weight: 6 },
                { from: 'F', to: 'J', weight: 4 },
                { from: 'G', to: 'J', weight: 7 },
                { from: 'I', to: 'J', weight: 2 },
            ],
        },
    },
    longestPath: {
        simple1: {
            type: GraphType.DIRECTED_WEIGHTED,
            vertices: ['A', 'B', 'C', 'D', 'E', 'F'],
            edges: [
                { from: 'A', to: 'B', weight: 5 },
                { from: 'B', to: 'C', weight: 3 },
                { from: 'C', to: 'D', weight: 4 },
                { from: 'D', to: 'E', weight: 2 },
                { from: 'B', to: 'E', weight: 6 },
                { from: 'C', to: 'F', weight: 4 },
                { from: 'E', to: 'F', weight: 3 },
            ],
        },
        medium1: {
            type: GraphType.DIRECTED_WEIGHTED,
            vertices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            edges: [
                { from: 'A', to: 'B', weight: 4 },
                { from: 'B', to: 'C', weight: 5 },
                { from: 'C', to: 'D', weight: 3 },
                { from: 'D', to: 'E', weight: 6 },
                { from: 'B', to: 'F', weight: 4 },
                { from: 'C', to: 'F', weight: 5 },
                { from: 'D', to: 'G', weight: 3 },
                { from: 'E', to: 'H', weight: 4 },
                { from: 'F', to: 'G', weight: 5 },
                { from: 'G', to: 'H', weight: 6 },
                { from: 'F', to: 'H', weight: 4 },
            ],
        },
    },
    spanningTree: {
        simple1: {
            type: GraphType.UNDIRECTED_WEIGHTED,
            vertices: ['A', 'B', 'C', 'D', 'E', 'F'],
            edges: [
                { from: 'A', to: 'B', weight: 2 },
                { from: 'B', to: 'C', weight: 3 },
                { from: 'C', to: 'D', weight: 1 },
                { from: 'D', to: 'E', weight: 4 },
                { from: 'E', to: 'F', weight: 2 },
                { from: 'F', to: 'A', weight: 5 },
                { from: 'B', to: 'E', weight: 3 },
                { from: 'C', to: 'F', weight: 4 },
            ],
        },
        medium1: {
            type: GraphType.UNDIRECTED_WEIGHTED,
            vertices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            edges: [
                { from: 'A', to: 'B', weight: 4 },
                { from: 'B', to: 'C', weight: 2 },
                { from: 'C', to: 'D', weight: 5 },
                { from: 'D', to: 'E', weight: 3 },
                { from: 'E', to: 'F', weight: 4 },
                { from: 'F', to: 'G', weight: 2 },
                { from: 'G', to: 'H', weight: 3 },
                { from: 'H', to: 'A', weight: 5 },
                { from: 'B', to: 'F', weight: 4 },
                { from: 'C', to: 'G', weight: 3 },
                { from: 'D', to: 'H', weight: 2 },
            ],
        },
    },
    edgeColoring: {
        simple1: {
            type: GraphType.UNDIRECTED_UNWEIGHTED,
            vertices: ['A', 'B', 'C', 'D', 'E', 'F'],
            edges: [
                { from: 'A', to: 'B' },
                { from: 'B', to: 'C' },
                { from: 'C', to: 'D' },
                { from: 'D', to: 'E' },
                { from: 'E', to: 'F' },
                { from: 'F', to: 'A' },
                { from: 'B', to: 'E' },
                { from: 'C', to: 'F' },
            ],
        },
        medium1: {
            type: GraphType.UNDIRECTED_UNWEIGHTED,
            vertices: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            edges: [
                { from: 'A', to: 'B' },
                { from: 'B', to: 'C' },
                { from: 'C', to: 'D' },
                { from: 'D', to: 'E' },
                { from: 'E', to: 'F' },
                { from: 'F', to: 'G' },
                { from: 'G', to: 'H' },
                { from: 'H', to: 'A' },
                { from: 'A', to: 'E' },
                { from: 'B', to: 'F' },
                { from: 'C', to: 'G' },
                { from: 'D', to: 'H' },
            ],
        },
    },
};

// Функция для расчета баллов за интерактивное задание
export const calculateInteractiveTaskScore = (task, selectedVertices, correctVertices) => {
    // Проверяем правильность выбранных вершин до первой ошибки
    let correctCount = 0;
    for (let i = 0; i < selectedVertices.length; i++) {
        if (selectedVertices[i] !== correctVertices[i]) {
            break;
        }
        correctCount++;
    }
    
    // Если нет правильных вершин, возвращаем 0
    if (correctCount === 0) return 0;
    
    // Вычисляем баллы: максимальный балл / количество правильных вершин * количество верно отмеченных вершин
    const pointsPerVertex = task.maxScore / correctVertices.length;
    return Math.round(pointsPerVertex * correctCount);
}; 