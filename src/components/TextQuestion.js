import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Button,
  FormControl
} from '@mui/material';

const TextQuestion = ({ task, onScoreUpdate }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    onScoreUpdate(index === task.correctAnswer ? task.maxScore : 0);
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
    </Paper>
  );
};

export default TextQuestion; 