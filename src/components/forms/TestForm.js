import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

const TestForm = ({ test, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        difficulty: 'EASY',
    });

    useEffect(() => {
        if (test) {
            setFormData({
                title: test.title || '',
                description: test.description || '',
                category: test.category || '',
                difficulty: test.difficulty || 'EASY',
            });
        }
    }, [test]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
                fullWidth
                label="Название теста"
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

            <TextField
                fullWidth
                label="Категория"
                name="category"
                value={formData.category}
                onChange={handleChange}
                margin="normal"
                required
            />

            <FormControl fullWidth margin="normal" required>
                <InputLabel>Сложность</InputLabel>
                <Select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    label="Сложность"
                >
                    <MenuItem value="EASY">Легкий</MenuItem>
                    <MenuItem value="MEDIUM">Средний</MenuItem>
                    <MenuItem value="HARD">Сложный</MenuItem>
                </Select>
            </FormControl>

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

export default TestForm; 