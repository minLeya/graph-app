import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
} from '@mui/material';
import { TaskType } from '../../data/testsData';

const TaskForm = ({ task, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: '',
        graphId: '',
        options: '',
        correctAnswer: '',
        maxScore: 10,
    });

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                type: task.type || '',
                graphId: task.graphId || '',
                options: task.options ? JSON.stringify(task.options) : '',
                correctAnswer: task.correctAnswer || '',
                maxScore: task.maxScore || 10,
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const processedData = {
            ...formData,
            options: formData.options ? JSON.parse(formData.options) : [],
        };
        onSave(processedData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
                fullWidth
                label="Название задания"
                name="title"
                value={formData.title}
                onChange={handleChange}
                margin="normal"
                required
            />

            <TextField
                fullWidth
                label="Описание"
                name="description"
                value={formData.description}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={3}
                required
            />

            <FormControl fullWidth margin="normal" required>
                <InputLabel>Тип задания</InputLabel>
                <Select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    label="Тип задания"
                >
                    {Object.values(TaskType).map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {formData.type !== TaskType.TEXT_QUESTION && (
                <TextField
                    fullWidth
                    label="ID графа"
                    name="graphId"
                    value={formData.graphId}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
            )}

            {formData.type === TaskType.TEXT_QUESTION && (
                <TextField
                    fullWidth
                    label="Варианты ответов (JSON массив)"
                    name="options"
                    value={formData.options}
                    onChange={handleChange}
                    margin="normal"
                    multiline
                    rows={4}
                    required
                    helperText="Введите варианты ответов в формате JSON массива"
                />
            )}

            <TextField
                fullWidth
                label="Правильный ответ"
                name="correctAnswer"
                value={formData.correctAnswer}
                onChange={handleChange}
                margin="normal"
                required
            />

            <TextField
                fullWidth
                label="Максимальный балл"
                name="maxScore"
                type="number"
                value={formData.maxScore}
                onChange={handleChange}
                margin="normal"
                required
            />

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={onCancel} sx={{ mr: 1 }}>
                    Отмена
                </Button>
                <Button type="submit" variant="contained" color="primary">
                    Сохранить
                </Button>
            </Box>
        </Box>
    );
};

export default TaskForm; 