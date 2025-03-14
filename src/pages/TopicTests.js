import React from 'react';
import { Card, CardContent, Typography, Container, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { testsData } from '../data/testsData';

const topics = {
  'pathfinding': 'Поиск пути с наименьшим числом рёбер',
  'shortestPath': 'Поиск кратчайшего пути',
  'longestPath': 'Задача поиска самого длинного пути',
  'spanningTree': 'Минимальное покрывающее дерево',
  'edgeColoring': 'Реберная раскраска графа',
  'vertexColoring': 'Вершинная раскраска графа'
};

const TopicTests = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();

  // Получаем тесты для выбранной темы
  const topicData = testsData[topicId];
  const tests = topicData ? Object.values(topicData.tests) : [];

  const handleTestClick = (testId) => {
    navigate(`/topic/${topicId}/test/${testId}`);
  };

  if (!topicData) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Тема не найдена
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        {topicData.title}
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
        Выберите тест
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
          },
          gap: 3
        }}
      >
        {tests.map((test) => (
          <Card
            key={test.id}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.2s ease-in-out',
              },
            }}
            onClick={() => handleTestClick(test.id)}
          >
            <CardContent>
              <Typography variant="h5" component="h2" align="center">
                {test.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default TopicTests; 