import React, { useState, useEffect } from 'react';
import { testsAPI } from '../../../data/database';

const TestForm = () => {
    const [tests, setTests] = useState([]);
    const [selectedTest, setSelectedTest] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        difficulty: 'basic'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        loadTests();
    }, []);

    const loadTests = async () => {
        try {
            const data = await testsAPI.getAllTests();
            setTests(data);
        } catch (error) {
            setError('Ошибка при загрузке тестов');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            if (selectedTest) {
                await testsAPI.updateTest(selectedTest.id, formData);
                setSuccess('Тест успешно обновлен');
            } else {
                await testsAPI.createTest(formData);
                setSuccess('Тест успешно создан');
            }
            
            loadTests();
            resetForm();
        } catch (error) {
            setError('Ошибка при сохранении теста');
        }
    };

    const handleDelete = async (id) => {
        try {
            await testsAPI.deleteTest(id);
            setSuccess('Тест успешно удален');
            loadTests();
            resetForm();
        } catch (error) {
            setError('Ошибка при удалении теста');
        }
    };

    const handleEdit = (test) => {
        setSelectedTest(test);
        setFormData({
            title: test.title,
            description: test.description,
            category: test.category,
            difficulty: test.difficulty
        });
    };

    const resetForm = () => {
        setSelectedTest(null);
        setFormData({
            title: '',
            description: '',
            category: '',
            difficulty: 'basic'
        });
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Название теста
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

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Категория
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        required
                    >
                        <option value="">Выберите категорию</option>
                        <option value="pathFinding">Поиск пути</option>
                        <option value="shortestPath">Кратчайший путь</option>
                        <option value="longestPath">Длиннейший путь</option>
                        <option value="spanningTree">Остовное дерево</option>
                        <option value="edgeColoring">Раскраска рёбер</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Сложность
                    </label>
                    <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleInputChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        required
                    >
                        <option value="basic">Базовый</option>
                        <option value="advanced">Продвинутый</option>
                    </select>
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
                        {selectedTest ? 'Обновить' : 'Создать'}
                    </button>
                </div>
            </form>

            <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">Существующие тесты</h3>
                <div className="mt-4 space-y-4">
                    {tests.map((test) => (
                        <div
                            key={test.id}
                            className="border border-gray-200 rounded-lg p-4"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">
                                        {test.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {test.description}
                                    </p>
                                    <div className="mt-2 flex items-center space-x-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {test.category}
                                        </span>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {test.difficulty}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(test)}
                                        className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-900"
                                    >
                                        Редактировать
                                    </button>
                                    <button
                                        onClick={() => handleDelete(test.id)}
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
        </div>
    );
};

export default TestForm; 