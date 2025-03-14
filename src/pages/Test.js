import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, LinearProgress, Stack } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import GraphPathQuiz from '../components/GraphPathQuiz';
import { getTestTasks, getTestInfo } from '../data/testsData';

const Test = () => {
  const { topicId, testId } = useParams();
  const navigate = useNavigate();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [scores, setScores] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30); // 30 секунд на задание

  const tasks = getTestTasks(topicId, testId);
  const testInfo = getTestInfo(topicId, testId);
  const currentTask = tasks[currentTaskIndex];
  const progress = ((currentTaskIndex + 1) / tasks.length) * 100;

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleScoreUpdate = (score) => {
    const newScores = [...scores];
    newScores[currentTaskIndex] = score;
    setScores(newScores);
  };

  const handleNextTask = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
      setTimeLeft(30);
    } else {
      // Тест завершен
      const totalScore = scores.reduce((sum, score) => sum + (score || 0), 0);
      navigate(`/results/${topicId}/${testId}`, { 
        state: { score: totalScore, totalTasks: tasks.length } 
      });
    }
  };

  const handlePrevTask = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(prev => prev - 1);
      setTimeLeft(30);
    }
  };

  if (!testInfo || !currentTask) {
    return (
      <Container>
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          Тест не найден
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pb: 4 }}>
      <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
        {testInfo.title}
      </Typography>

      <Box sx={{ width: '100%', mt: 2 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2 }}>
        <Typography>
          Задание: {currentTaskIndex + 1}/{tasks.length}
        </Typography>
        <Typography>
          Время: {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
          {String(timeLeft % 60).padStart(2, '0')}
        </Typography>
        <Typography>
          Общий балл: {scores.reduce((sum, score) => sum + (score || 0), 0)}
        </Typography>
      </Box>

      <GraphPathQuiz
        task={currentTask}
        onScoreUpdate={handleScoreUpdate}
      />

      <Stack 
        direction="row" 
        spacing={2} 
        sx={{ mt: 3, justifyContent: 'space-between' }}
      >
        <Button
          variant="outlined"
          onClick={handlePrevTask}
          disabled={currentTaskIndex === 0}
        >
          Предыдущее задание
        </Button>
        <Button
          variant="contained"
          onClick={handleNextTask}
          disabled={!scores[currentTaskIndex]}
        >
          {currentTaskIndex < tasks.length - 1 ? 'Следующее задание' : 'Завершить тест'}
        </Button>
      </Stack>
    </Container>
  );
};

export default Test; 