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
import { GraphType } from '../../data/testsData';

const GraphForm = ({ graph, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        category: '',
        type: '',
        vertices: '',
        edges: '',
    });

    useEffect(() => {
        if (graph) {
            setFormData({
                category: graph.category || '',
                type: graph.type || '',
                vertices: graph.vertices || '',
                edges: graph.edges || '',
            });
        }
    }, [graph]);

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
                label="Категория"
                name="category"
                value={formData.category}
                onChange={handleChange}
                margin="normal"
                required
            />

            <FormControl fullWidth margin="normal" required>
                <InputLabel>Тип графа</InputLabel>
                <Select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    label="Тип графа"
                >
                    {Object.values(GraphType).map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label="Вершины (в формате JSON)"
                name="vertices"
                value={formData.vertices}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
                required
            />

            <TextField
                fullWidth
                label="Рёбра (в формате JSON)"
                name="edges"
                value={formData.edges}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
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

export default GraphForm; 