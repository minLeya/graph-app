import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Button 
} from '@mui/material';

const TextQuestion = ({ task, onScoreUpdate }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerChange = (event) => {
    if (!isSubmitted) {
      setSelectedAnswer(parseInt(event.target.value));
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null && !isSubmitted) {
      const isCorrect = selectedAnswer === task.correctAnswer;
      const score = isCorrect ? task.maxScore : 0;
      onScoreUpdate(score);
      setIsSubmitted(true);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          {task.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {task.description}
        </Typography>
      </Box>

      <RadioGroup
        value={selectedAnswer}
        onChange={handleAnswerChange}
      >
        {task.options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={index}
            control={<Radio />}
            label={option}
            sx={{
              mb: 1,
              ...(isSubmitted && {
                color: index === task.correctAnswer ? 'success.main' : 
                       (index === selectedAnswer ? 'error.main' : 'text.primary')
              })
            }}
          />
        ))}
      </RadioGroup>

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={selectedAnswer === null || isSubmitted}
        >
          Проверить
        </Button>
        {isSubmitted && (
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 2,
              color: selectedAnswer === task.correctAnswer ? 'success.main' : 'error.main'
            }}
          >
            {selectedAnswer === task.correctAnswer 
              ? `Правильно! Вы получили ${task.maxScore} баллов.`
              : 'Неправильно. Попробуйте в следующий раз.'}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default TextQuestion; 