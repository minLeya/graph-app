import React from 'react';
import { Container, Typography, Card, CardContent, CardHeader, CardActionArea, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { testsData } from '../data/testsData';

const testCards = [
  {
    id: 'pathfinding',
    title: 'Поиск пути с наименьшим числом рёбер',
    description: 'Найти путь между двумя вершинами, используя как можно меньше рёбер (без учета длин рёбер).'
  },
  {
    id: 'shortestPath',
    title: 'Поиск кратчайшего пути',
    description: 'Найти кратчайший путь между двумя вершинами с учётом длин рёбер.'
  },
  {
    id: 'longestPath',
    title: 'Поиск путей наибольшей длины',
    description: 'Найти наибольший путь между двумя вершинами с учётом длин рёбер.'
  },
  {
    id: 'spanningTree',
    title: 'Поиск кратчайшего остова',
    description: 'Задача поиска минимального покрывающего дерева.'
  },
  {
    id: 'edgeColoring',
    title: 'Реберная раскраска графа',
    description: 'Раскрасить рёбра графа, чтобы рёбра, встречающиеся в одной вершине, не имели одинаковый цвет.'
  },
  {
    id: 'vertexColoring',
    title: 'Вершинная раскраска графа',
    description: 'Раскрасить вершины графа, чтобы никакие две соседние вершины не имели одинакового цвета.'
  }
];

const Dashboard = () => {
  return (
    <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        GraphSolver
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
          },
          gap: 3,
          maxWidth: '1600px',
          mx: 'auto'
        }}
      >
        {testCards.map((test) => (
          <Card 
            key={test.id} 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column' 
            }}
          >
            <CardActionArea 
              component={Link} 
              to={`/topic/${test.id}/tests`}
              sx={{ 
                height: '100%',
                textDecoration: 'none', 
                color: 'inherit',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}
            >
              <CardHeader
                title={test.title}
                sx={{ flexShrink: 0, minHeight: '64px' }}
              />
              <CardContent sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'flex-start', 
                paddingTop: '16px' 
              }}>
                <Typography variant="body2" color="textSecondary">
                  {test.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Dashboard;
