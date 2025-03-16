import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Stack } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import GraphPathQuiz from '../components/GraphPathQuiz';
import TextQuestion from '../components/TextQuestion';
import { getTestTasks, getTestInfo, TaskType } from '../data/testsData';

const Test = () => {
  const { topicId, testId } = useParams();
  const navigate = useNavigate();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [scores, setScores] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);

  const tasks = getTestTasks(topicId, testId);
  const testInfo = getTestInfo(topicId, testId);
  const currentTask = tasks[currentTaskIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScoreUpdate = (score) => {
    const newScores = [...scores];
    newScores[currentTaskIndex] = score;
    setScores(newScores);
  };

  const handleNextTask = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
    } else {
      const totalScore = scores.reduce((sum, score) => sum + (score || 0), 0);
      navigate(`/results/${topicId}/${testId}`, { 
        state: { 
          score: totalScore, 
          totalTasks: tasks.length,
          timeSpent: elapsedTime 
        } 
      });
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <Container maxWidth="lg" sx={{ pb: 4 }}>
      <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
        {testInfo.title}
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2 }}>
        <Typography>
          Задание: {currentTaskIndex + 1}/{tasks.length}
        </Typography>
        <Typography>
          Затраченное время: {formatTime(elapsedTime)}
        </Typography>
      </Box>

      {currentTask.type === TaskType.TEXT_QUESTION ? (
        <TextQuestion
          task={currentTask}
          onScoreUpdate={handleScoreUpdate}
        />
      ) : (
        <GraphPathQuiz
          task={currentTask}
          onScoreUpdate={handleScoreUpdate}
        />
      )}

      <Stack 
        direction="row" 
        spacing={2} 
        sx={{ mt: 3, justifyContent: 'space-between' }}
      >
        <Button
          variant="contained"
          onClick={handleNextTask}
        >
          {currentTaskIndex < tasks.length - 1 ? 'Следующее задание' : 'Завершить тест'}
        </Button>
      </Stack>
    </Container>
  );
};

export default Test; 