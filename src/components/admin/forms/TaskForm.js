import React, { useState, useEffect } from 'react';
import { tasksAPI, testsAPI, graphsAPI } from '../../../data/database';

const TaskForm = () => {
    const [tasks, setTasks] = useState([]);
    const [tests, setTests] = useState([]);
    const [graphs, setGraphs] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedTest, setSelectedTest] = useState(null);
    const [formData, setFormData] = useState({
        test_id: '',
        type: '',
        title: '',
        description: '',
        graph_id: '',
        options: '',
        correct_answer: '',
        max_score: 10
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (selectedTest) {
            loadTasks(selectedTest);
        }
    }, [selectedTest]);

    const loadData = async () => {
        try {
            const [testsData, graphsData] = await Promise.all([
                testsAPI.getAllTests(),
                graphsAPI.getAllGraphs()
            ]);
            setTests(testsData);
            setGraphs(graphsData);
        } catch (error) {
            setError('Ошибка при загрузке данных');
        }
    };

    const loadTasks = async (testId) => {
        try {
            const data = await tasksAPI.getTestTasks(testId);
            setTasks(data);
        } catch (error) {
            setError('Ошибка при загрузке заданий');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTestChange = (e) => {
        const testId = e.target.value;
        setSelectedTest(testId);
        setFormData(prev => ({
            ...prev,
            test_id: testId
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const taskData = {
                ...formData,
                options: formData.options ? JSON.parse(formData.options) : null
            };

            if (selectedTask) {
                await tasksAPI.updateTask(selectedTask.id, taskData);
                setSuccess('Задание успешно обновлено');
            } else {
                await tasksAPI.createTask(taskData);
                setSuccess('Задание успешно создано');
            }
            
            loadTasks(formData.test_id);
            resetForm();
        } catch (error) {
            setError('Ошибка при сохранении задания');
        }
    };

    const handleDelete = async (id) => {
        try {
            await tasksAPI.deleteTask(id);
            setSuccess('Задание успешно удалено');
            loadTasks(selectedTest);
            resetForm();
        } catch (error) {
            setError('Ошибка при удалении задания');
        }
    };

    const handleEdit = (task) => {
        setSelectedTask(task);
        setFormData({
            test_id: task.test_id,
            type: task.type,
            title: task.title,
            description: task.description,
            graph_id: task.graph_id || '',
            options: task.options ? JSON.stringify(task.options) : '',
            correct_answer: task.correct_answer,
            max_score: task.max_score
        });
    };

    const resetForm = () => {
        setSelectedTask(null);
        setFormData({
            test_id: selectedTest || '',
            type: '',
            title: '',
            description: '',
            graph_id: '',
            options: '',
            correct_answer: '',
            max_score: 10
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Выберите тест
                </label>
                <select
                    value={selectedTest || ''}
                    onChange={handleTestChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="">Выберите тест</option>
                    {tests.map((test) => (
                        <option key={test.id} value={test.id}>
                            {test.title} ({test.category})
                        </option>
                    ))}
                </select>
            </div>

            {selectedTest && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Тип задания
                        </label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            required
                        >
                            <option value="">Выберите тип</option>
                            <option value="TEXT_QUESTION">Текстовый вопрос</option>
                            <option value="GRAPH_PATH">Поиск пути в графе</option>
                            <option value="GRAPH_SHORTEST_PATH">Кратчайший путь</option>
                            <option value="GRAPH_LONGEST_PATH">Длиннейший путь</option>
                            <option value="GRAPH_SPANNING_TREE">Остовное дерево</option>
                            <option value="GRAPH_EDGE_COLORING">Раскраска рёбер</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Название задания
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Описание
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={3}
                            className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {formData.type.startsWith('GRAPH_') && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Граф
                            </label>
                            <select
                                name="graph_id"
                                value={formData.graph_id}
                                onChange={handleInputChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                required
                            >
                                <option value="">Выберите граф</option>
                                {graphs.map((graph) => (
                                    <option key={graph.id} value={graph.id}>
                                        {graph.category} - {graph.type} ({graph.vertices.length} вершин)
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {formData.type === 'TEXT_QUESTION' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Варианты ответов (JSON)
                            </label>
                            <textarea
                                name="options"
                                value={formData.options}
                                onChange={handleInputChange}
                                rows={4}
                                className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                placeholder='["Вариант 1", "Вариант 2", "Вариант 3"]'
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Правильный ответ
                        </label>
                        <input
                            type="text"
                            name="correct_answer"
                            value={formData.correct_answer}
                            onChange={handleInputChange}
                            className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Максимальный балл
                        </label>
                        <input
                            type="number"
                            name="max_score"
                            value={formData.max_score}
                            onChange={handleInputChange}
                            min="1"
                            className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="text-green-600 text-sm">
                            {success}
                        </div>
                    )}

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Очистить
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {selectedTask ? 'Обновить' : 'Создать'}
                        </button>
                    </div>
                </form>
            )}

            {selectedTest && (
                <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900">Задания теста</h3>
                    <div className="mt-4 space-y-4">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="border border-gray-200 rounded-lg p-4"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">
                                            {task.title}
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {task.description}
                                        </p>
                                        <div className="mt-2 flex items-center space-x-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                {task.type}
                                            </span>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {task.max_score} баллов
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(task)}
                                            className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-900"
                                        >
                                            Редактировать
                                        </button>
                                        <button
                                            onClick={() => handleDelete(task.id)}
                                            className="px-3 py-1 text-sm text-red-600 hover:text-red-900"
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskForm; 