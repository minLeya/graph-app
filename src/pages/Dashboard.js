import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardHeader, CardActionArea, AppBar, Toolbar, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

const testCards = [
  {
    title: 'Поиск пути с наименьшим числом рёбер',
    description: 'Задача состоит в том, чтобы найти путь между двумя вершинами, используя как можно меньше рёбер, не учитывая их длину.',
    path: '/test1'
  },
  {
    title: 'Поиск кратчайшего пути',
    description: 'Задача — найти кратчайший путь между двумя вершинами, учитывая длину (вес) рёбер на пути.',
    path: '/test2'
  },
  {
    title: 'Задача поиска самого длинного пути',
    description: 'Задача заключается в поиске пути с максимальной длиной (весом), проходящего между двумя вершинами.',
    path: '/test3'
  },
  {
    title: 'Минимальное покрывающее дерево',
    description: 'Задача — построить дерево, соединяющее все вершины графа с минимальными затратами, чтобы не было циклов.',
    path: '/test4'
  },
  {
    title: 'Реберная раскраска графа',
    description: 'Задача — раскрасить рёбра графа, чтобы рёбра, встречающиеся в одной вершине, не имели одинаковый цвет.',
    path: '/test5'
  },
  {
    title: 'Вершинная раскраска графа',
    description: 'Задача — раскрасить вершины графа, чтобы никакие две соседние вершины не имели одинакового цвета.',
    path: '/test6'
  }
];

const Header = () => {
  return (
    <AppBar position="static" sx={{ width: '100%', backgroundColor: 'black' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">
          GraphSolver
        </Typography>
        <IconButton color="inherit">
          <svg
            id="Layer_2"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 2"
            width="24"
            height="24"
            fill="currentColor"
          >
            <g fill="rgb(255,255,255)">
              <path d="m16 14a6.5 6.5 0 1 0 -6.5-6.5 6.508 6.508 0 0 0 6.5 6.5zm0-11a4.5 4.5 0 1 1 -4.5 4.5 4.505 4.505 0 0 1 4.5-4.5z"/>
              <path d="m15.991 15a13.005 13.005 0 0 0 -12.991 12.99v2.01a1 1 0 0 0 2 0v-2.01a10.991 10.991 0 0 1 21.981 0v1.01h-18.981a1 1 0 0 0 0 2h19.981a1 1 0 0 0 1-1v-2.01a13 13 0 0 0 -12.99-12.99z"/>
            </g>
          </svg>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const Dashboard = () => {
  return (
    <Container>
      <Header />
      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4, mb: 4 }}>
        GraphSolver
      </Typography>
      <Grid container spacing={3}>
        {testCards.map((test, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardActionArea component={Link} to={test.path} sx={{ textDecoration: 'none', color: 'inherit' }}>
                <CardHeader
                  title={test.title}
                  sx={{ flexShrink: 0, minHeight: '64px' }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: '16px' }}>
                  <Typography variant="body2" color="textSecondary">
                    {test.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
