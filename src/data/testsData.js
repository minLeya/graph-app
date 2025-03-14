// Графы для разных типов заданий
const graphs = {
  shortPath1: {
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
  },
  shortPath2: {
    nodes: [
      { id: 0, x: 100, y: 200 },
      { id: 1, x: 200, y: 100 },
      { id: 2, x: 300, y: 200 },
      { id: 3, x: 200, y: 300 },
      { id: 4, x: 400, y: 150 },
      { id: 5, x: 500, y: 200 }
    ],
    links: [
      { source: 0, target: 1, weight: 3 },
      { source: 1, target: 2, weight: 1 },
      { source: 2, target: 4, weight: 2 },
      { source: 0, target: 3, weight: 2 },
      { source: 3, target: 2, weight: 3 },
      { source: 4, target: 5, weight: 1 }
    ]
  },
  colorGraph1: {
    nodes: [
      { id: 0, x: 200, y: 200 },
      { id: 1, x: 300, y: 200 },
      { id: 2, x: 250, y: 100 },
      { id: 3, x: 250, y: 300 }
    ],
    links: [
      { source: 0, target: 1 },
      { source: 0, target: 2 },
      { source: 0, target: 3 },
      { source: 1, target: 2 },
      { source: 1, target: 3 }
    ]
  }
};

// Структура всех тестов
export const testsData = {
  '1': { // ID темы "Поиск пути с наименьшим числом рёбер"
    '1': { // ID теста
      title: 'Тест №1',
      tasks: [
        {
          id: 1,
          type: 'shortestEdgePath',
          title: 'Поиск пути с минимальным количеством рёбер',
          description: 'Найдите путь от начальной до конечной вершины, используя минимальное количество рёбер.',
          graph: graphs.shortPath1,
          startNode: 0,
          endNode: 4
        },
        {
          id: 2,
          type: 'shortestEdgePath',
          title: 'Поиск альтернативного пути',
          description: 'Найдите другой путь от начальной до конечной вершины с минимальным количеством рёбер.',
          graph: graphs.shortPath2,
          startNode: 0,
          endNode: 5
        },
        {
          id: 3,
          type: 'shortestEdgePath',
          title: 'Сложный маршрут',
          description: 'Найдите оптимальный путь в более сложном графе.',
          graph: {
            nodes: [
              { id: 0, x: 100, y: 200 },
              { id: 1, x: 200, y: 100 },
              { id: 2, x: 300, y: 200 },
              { id: 3, x: 200, y: 300 },
              { id: 4, x: 400, y: 150 },
              { id: 5, x: 400, y: 250 },
              { id: 6, x: 500, y: 200 }
            ],
            links: [
              { source: 0, target: 1 },
              { source: 1, target: 2 },
              { source: 2, target: 4 },
              { source: 0, target: 3 },
              { source: 3, target: 2 },
              { source: 4, target: 6 },
              { source: 5, target: 6 },
              { source: 2, target: 5 }
            ]
          },
          startNode: 0,
          endNode: 6
        }
      ]
    },
    '2': {
      title: 'Тест №2',
      tasks: [
        // Другой набор из 3 заданий
      ]
    }
  },
  '2': { // ID темы "Поиск кратчайшего пути"
    '1': {
      title: 'Тест №1',
      tasks: [
        {
          id: 1,
          type: 'dijkstra',
          title: 'Поиск кратчайшего пути',
          description: 'Найдите кратчайший путь от начальной до конечной вершины, учитывая веса рёбер.',
          graph: graphs.shortPath1,
          startNode: 0,
          endNode: 4
        },
        {
          id: 2,
          type: 'dijkstra',
          title: 'Сложный маршрут с весами',
          description: 'Найдите кратчайший путь в графе с разными весами рёбер.',
          graph: graphs.shortPath2,
          startNode: 0,
          endNode: 5
        },
        {
          id: 3,
          type: 'dijkstra',
          title: 'Оптимальный маршрут',
          description: 'Определите оптимальный путь с учетом всех весов.',
          graph: {
            nodes: [
              { id: 0, x: 100, y: 200 },
              { id: 1, x: 200, y: 100 },
              { id: 2, x: 300, y: 200 },
              { id: 3, x: 200, y: 300 },
              { id: 4, x: 400, y: 100 },
              { id: 5, x: 400, y: 300 },
              { id: 6, x: 500, y: 200 }
            ],
            links: [
              { source: 0, target: 1, weight: 2 },
              { source: 1, target: 2, weight: 3 },
              { source: 2, target: 4, weight: 1 },
              { source: 0, target: 3, weight: 1 },
              { source: 3, target: 2, weight: 2 },
              { source: 4, target: 6, weight: 4 },
              { source: 5, target: 6, weight: 2 },
              { source: 2, target: 5, weight: 3 }
            ]
          },
          startNode: 0,
          endNode: 6
        }
      ]
    }
  },
  '5': { // ID темы "Реберная раскраска графа"
    '1': {
      title: 'Тест №1',
      tasks: [
        {
          id: 1,
          type: 'edgeColoring',
          title: 'Простая раскраска рёбер',
          description: 'Раскрасьте рёбра графа минимальным количеством цветов так, чтобы рёбра одного цвета не имели общих вершин.',
          graph: graphs.colorGraph1
        },
        // Добавьте ещё 2 задания
      ]
    }
  }
};

// Функция для получения заданий конкретного теста
export const getTestTasks = (topicId, testId) => {
  return testsData[topicId]?.[testId]?.tasks || [];
};

// Функция для получения информации о тесте
export const getTestInfo = (topicId, testId) => {
  return testsData[topicId]?.[testId] || null;
}; 