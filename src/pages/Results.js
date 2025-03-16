import React from 'react';
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalTasks, timeSpent } = location.state || {};

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleReturnToDashboard = () => {
    navigate('/');
  };

  if (!location.state) {
    return (
      <Container>
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          Результаты не найдены
        </Typography>
      </Container>
    );
  }

  const percentage = Math.round((score / (totalTasks * 10)) * 100);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Результаты теста
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Набранные баллы:
          </Typography>
          <Typography variant="h3" align="center" sx={{ color: 'primary.main', my: 2 }}>
            {score} из {totalTasks * 10}
          </Typography>
          <Typography variant="h5" align="center" sx={{ mb: 3 }}>
            ({percentage}%)
          </Typography>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Затраченное время:
          </Typography>
          <Typography variant="h4" align="center" sx={{ color: 'text.secondary', mb: 3 }}>
            {formatTime(timeSpent)}
          </Typography>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            variant="contained" 
            size="large"
            onClick={handleReturnToDashboard}
          >
            Вернуться на главную
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Results; 