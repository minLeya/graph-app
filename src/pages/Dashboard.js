import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardHeader } from '@mui/material';

const Dashboard = () => {
  return (
    <Container>
      {/* Шапка */}
      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4, mb: 4 }}>
        GraphSolver
      </Typography>

      {/* Карточки с тестами */}
      <Grid container spacing={3}>
        {Array.from({ length: 6 }, (_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardHeader
                title={`Test ${index + 1}`}
                subheader="Subtitle or description of the test"
              />
              <CardContent>
                {/* Содержимое карточки */}
                <Typography variant="body2" color="textSecondary">
                  This is a sample test card. You can add more content here.
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
