import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardHeader } from '@mui/material';

const testCards = [
  {
    title: 'Поиск пути с наименьшим числом рёбер',
    description: 'Задача состоит в том, чтобы найти путь между двумя вершинами, используя как можно меньше рёбер, не учитывая их длину.'
  },
  {
    title: 'Поиск кратчайшего пути',
    description: 'Задача — найти кратчайший путь между двумя вершинами, учитывая длину (вес) рёбер на пути.'
  },
  {
    title: 'Задача поиска самого длинного пути',
    description: 'Задача заключается в поиске пути с максимальной длиной (весом), проходящего между двумя вершинами.'
  },
  {
    title: 'Минимальное покрывающее дерево',
    description: 'Задача — построить дерево, соединяющее все вершины графа с минимальными затратами, чтобы не было циклов.'
  },
  {
    title: 'Реберная раскраска графа',
    description: 'Задача — раскрасить рёбра графа, чтобы рёбра, встречающиеся в одной вершине, не имели одинаковый цвет.'
  },
  {
    title: 'Вершинная раскраска графа',
    description: 'Задача — раскрасить вершины графа, чтобы никакие две соседние вершины не имели одинакового цвета.'
  }
];

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4, mb: 4 }}>
        GraphSolver
      </Typography>
      <Grid container spacing={3}>
        {testCards.map((test, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardHeader
                title={test.title}
                sx={{ flexShrink: 0, minHeight: '64px' }} // Фиксированная высота для заголовка
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: '16px' }}>
                <Typography variant="body2" color="textSecondary">
                  {test.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
