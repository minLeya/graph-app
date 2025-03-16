import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  FormControl
} from '@mui/material';

const TextQuestion = ({ task, onScoreUpdate }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentScore, setCurrentScore] = useState(null);

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    const score = index === task.correctAnswer ? task.maxScore : 0;
    setCurrentScore(score);
    onScoreUpdate(score);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {task.title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {task.description}
      </Typography>

      <FormControl component="fieldset">
        <RadioGroup
          value={selectedAnswer}
          onChange={(e) => handleAnswerSelect(Number(e.target.value))}
        >
          {task.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={index}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>

      {/* Временный блок для отображения баллов */}
      {currentScore !== null && (
        <Box sx={{ mt: 2, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Баллы за задание: {currentScore} из {task.maxScore}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default TextQuestion; 