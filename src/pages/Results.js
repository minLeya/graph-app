import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Box, Button, Divider } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getTestInfo } from '../data/testsData';
import { authAPI } from '../data/database';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { topicId, testId } = useParams();
  const { score, totalTasks, timeSpent } = location.state || {};
  const testInfo = getTestInfo(topicId, testId);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const adminStatus = await authAPI.isAdmin();
      setIsAdmin(adminStatus);
    };
    checkAdmin();
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleReturnToDashboard = () => {
    navigate(isAdmin ? '/admin-page' : '/dashboard');
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

  // Максимально возможное количество баллов
  const maxPossibleScore = testInfo?.tasks.reduce((sum, task) => sum + task.maxScore, 0) || 0;
  const percentage = Math.round((score / maxPossibleScore) * 100);

  // Определение результата
  const getResultMessage = (percentage) => {
    if (percentage >= 85) return 'Отлично! Вы отлично справились с заданиями!';
    if (percentage >= 70) return 'Хорошо! Вы показали хороший результат!';
    if (percentage >= 50) return 'Удовлетворительно. Есть над чем поработать.';
    return 'Попробуйте пройти тест еще раз после дополнительной подготовки.';
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {testInfo?.title || 'Результаты теста'}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Набранные баллы:
          </Typography>
          <Typography variant="h3" align="center" sx={{ color: 'primary.main', my: 2 }}>
            {score} из {maxPossibleScore}
          </Typography>
          <Typography variant="h5" align="center" sx={{ mb: 2 }}>
            ({percentage}%)
          </Typography>
          <Typography variant="body1" align="center" sx={{ 
            color: percentage >= 85 ? 'success.main' : 
                   percentage >= 70 ? 'info.main' : 
                   percentage >= 50 ? 'warning.main' : 'error.main',
            mb: 3 
          }}>
            {getResultMessage(percentage)}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Статистика:
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body1">Количество заданий:</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{totalTasks}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body1">Затраченное время:</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{formatTime(timeSpent)}</Typography>
          </Box>

        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            variant="contained" 
            size="large"
            onClick={handleReturnToDashboard}
            sx={{ minWidth: 200 }}
          >
            Вернуться к темам
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Results; 