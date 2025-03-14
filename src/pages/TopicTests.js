import React from 'react';
import { Card, CardContent, Typography, Container, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const topics = {
  '1': 'Поиск пути с наименьшим числом рёбер',
  '2': 'Поиск кратчайшего пути',
  '3': 'Задача поиска самого длинного пути',
  '4': 'Минимальное покрывающее дерево',
  '5': 'Реберная раскраска графа',
  '6': 'Вершинная раскраска графа'
};

const TopicTests = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();

  const tests = [
    { id: 1, title: 'Тест №1' },
    { id: 2, title: 'Тест №2' },
    { id: 3, title: 'Тест №3' },
    { id: 4, title: 'Тест №4' },
    { id: 5, title: 'Тест №5' },
    { id: 6, title: 'Тест №6' },
  ];

  const handleTestClick = (testId) => {
    navigate(`/topic/${topicId}/test/${testId}`);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        {topics[topicId]}
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