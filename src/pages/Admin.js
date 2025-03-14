import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Tabs,
    Tab,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import { graphsAPI, testsAPI, tasksAPI } from '../data/database';
import { TaskType, GraphType } from '../data/testsData';

// Компонент для управления графами
const GraphManager = () => {
    const [graphs, setGraphs] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentGraph, setCurrentGraph] = useState(null);

    useEffect(() => {
        loadGraphs();
    }, []);

    const loadGraphs = async () => {
        try {
            const data = await graphsAPI.getAllGraphs();
            setGraphs(data);
        } catch (error) {
            console.error('Ошибка при загрузке графов:', error);
        }
    };

    const handleSave = async (graph) => {
        try {
            if (currentGraph) {
                await graphsAPI.updateGraph(currentGraph.id, graph);
            } else {
                await graphsAPI.createGraph(graph);
            }
            loadGraphs();
            setOpenDialog(false);
        } catch (error) {
            console.error('Ошибка при сохранении графа:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await graphsAPI.deleteGraph(id);
            loadGraphs();
        } catch (error) {
            console.error('Ошибка при удалении графа:', error);
        }
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Управление графами
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    setCurrentGraph(null);
                    setOpenDialog(true);
                }}
            >
                Добавить граф
            </Button>

            {/* Список графов */}
            <Box mt={2}>
                {graphs.map((graph) => (
                    <Box key={graph.id} p={2} border={1} borderRadius={1} mb={1}>
                        <Typography variant="h6">{graph.category}</Typography>
                        <Typography>Тип: {graph.type}</Typography>
                        <Box mt={1}>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setCurrentGraph(graph);
                                    setOpenDialog(true);
                                }}
                            >
                                Редактировать
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleDelete(graph.id)}
                                sx={{ ml: 1 }}
                            >
                                Удалить
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Диалог создания/редактирования графа */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>
                    {currentGraph ? 'Редактировать граф' : 'Создать новый граф'}
                </DialogTitle>
                <DialogContent>
                    <GraphForm
                        graph={currentGraph}
                        onSave={handleSave}
                        onCancel={() => setOpenDialog(false)}
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

// Компонент для управления тестами
const TestManager = () => {
    const [tests, setTests] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentTest, setCurrentTest] = useState(null);

    useEffect(() => {
        loadTests();
    }, []);

    const loadTests = async () => {
        try {
            const data = await testsAPI.getAllTests();
            setTests(data);
        } catch (error) {
            console.error('Ошибка при загрузке тестов:', error);
        }
    };

    const handleSave = async (test) => {
        try {
            if (currentTest) {
                await testsAPI.updateTest(currentTest.id, test);
            } else {
                await testsAPI.createTest(test);
            }
            loadTests();
            setOpenDialog(false);
        } catch (error) {
            console.error('Ошибка при сохранении теста:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await testsAPI.deleteTest(id);
            loadTests();
        } catch (error) {
            console.error('Ошибка при удалении теста:', error);
        }
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Управление тестами
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    setCurrentTest(null);
                    setOpenDialog(true);
                }}
            >
                Добавить тест
            </Button>

            {/* Список тестов */}
            <Box mt={2}>
                {tests.map((test) => (
                    <Box key={test.id} p={2} border={1} borderRadius={1} mb={1}>
                        <Typography variant="h6">{test.title}</Typography>
                        <Typography>{test.description}</Typography>
                        <Box mt={1}>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setCurrentTest(test);
                                    setOpenDialog(true);
                                }}
                            >
                                Редактировать
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleDelete(test.id)}
                                sx={{ ml: 1 }}
                            >
                                Удалить
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Диалог создания/редактирования теста */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>
                    {currentTest ? 'Редактировать тест' : 'Создать новый тест'}
                </DialogTitle>
                <DialogContent>
                    <TestForm
                        test={currentTest}
                        onSave={handleSave}
                        onCancel={() => setOpenDialog(false)}
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

// Компонент для управления заданиями
const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTest, setSelectedTest] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        if (selectedTest) {
            loadTasks(selectedTest);
        }
    }, [selectedTest]);

    const loadTasks = async (testId) => {
        try {
            const data = await tasksAPI.getTestTasks(testId);
            setTasks(data);
        } catch (error) {
            console.error('Ошибка при загрузке заданий:', error);
        }
    };

    const handleSave = async (task) => {
        try {
            if (currentTask) {
                await tasksAPI.updateTask(currentTask.id, task);
            } else {
                await tasksAPI.createTask({ ...task, testId: selectedTest });
            }
            loadTasks(selectedTest);
            setOpenDialog(false);
        } catch (error) {
            console.error('Ошибка при сохранении задания:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await tasksAPI.deleteTask(id);
            loadTasks(selectedTest);
        } catch (error) {
            console.error('Ошибка при удалении задания:', error);
        }
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Управление заданиями
            </Typography>

            {/* Выбор теста */}
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Выберите тест</InputLabel>
                <Select
                    value={selectedTest || ''}
                    onChange={(e) => setSelectedTest(e.target.value)}
                >
                    {/* Здесь будет список тестов */}
                </Select>
            </FormControl>

            {selectedTest && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setCurrentTask(null);
                        setOpenDialog(true);
                    }}
                >
                    Добавить задание
                </Button>
            )}

            {/* Список заданий */}
            <Box mt={2}>
                {tasks.map((task) => (
                    <Box key={task.id} p={2} border={1} borderRadius={1} mb={1}>
                        <Typography variant="h6">{task.title}</Typography>
                        <Typography>Тип: {task.type}</Typography>
                        <Typography>{task.description}</Typography>
                        <Box mt={1}>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setCurrentTask(task);
                                    setOpenDialog(true);
                                }}
                            >
                                Редактировать
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleDelete(task.id)}
                                sx={{ ml: 1 }}
                            >
                                Удалить
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Диалог создания/редактирования задания */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>
                    {currentTask ? 'Редактировать задание' : 'Создать новое задание'}
                </DialogTitle>
                <DialogContent>
                    <TaskForm
                        task={currentTask}
                        onSave={handleSave}
                        onCancel={() => setOpenDialog(false)}
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

// Основной компонент страницы администратора
const Admin = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom>
                Панель администратора
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab label="Графы" />
                    <Tab label="Тесты" />
                    <Tab label="Задания" />
                </Tabs>
            </Box>

            <Box mt={3}>
                {tabValue === 0 && <GraphManager />}
                {tabValue === 1 && <TestManager />}
                {tabValue === 2 && <TaskManager />}
            </Box>
        </Container>
    );
};

export default Admin; 