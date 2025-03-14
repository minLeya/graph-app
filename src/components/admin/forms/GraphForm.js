import React, { useState, useEffect } from 'react';
import { graphsAPI } from '../../../data/database';

const GraphForm = () => {
    const [graphs, setGraphs] = useState([]);
    const [selectedGraph, setSelectedGraph] = useState(null);
    const [formData, setFormData] = useState({
        category: '',
        type: '',
        vertices: '',
        edges: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        loadGraphs();
    }, []);

    const loadGraphs = async () => {
        try {
            const data = await graphsAPI.getAllGraphs();
            setGraphs(data);
        } catch (error) {
            setError('Ошибка при загрузке графов');
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
            if (selectedGraph) {
                await graphsAPI.updateGraph(selectedGraph.id, formData);
                setSuccess('Граф успешно обновлен');
            } else {
                await graphsAPI.createGraph(formData);
                setSuccess('Граф успешно создан');
            }
            
            loadGraphs();
            resetForm();
        } catch (error) {
            setError('Ошибка при сохранении графа');
        }
    };

    const handleDelete = async (id) => {
        try {
            await graphsAPI.deleteGraph(id);
            setSuccess('Граф успешно удален');
            loadGraphs();
            resetForm();
        } catch (error) {
            setError('Ошибка при удалении графа');
        }
    };

    const handleEdit = (graph) => {
        setSelectedGraph(graph);
        setFormData({
            category: graph.category,
            type: graph.type,
            vertices: JSON.stringify(graph.vertices),
            edges: JSON.stringify(graph.edges)
        });
    };

    const resetForm = () => {
        setSelectedGraph(null);
        setFormData({
            category: '',
            type: '',
            vertices: '',
            edges: ''
        });
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                        Тип графа
                    </label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        required
                    >
                        <option value="">Выберите тип</option>
                        <option value="DIRECTED_UNWEIGHTED">Ориентированный невзвешенный</option>
                        <option value="DIRECTED_WEIGHTED">Ориентированный взвешенный</option>
                        <option value="UNDIRECTED_UNWEIGHTED">Неориентированный невзвешенный</option>
                        <option value="UNDIRECTED_WEIGHTED">Неориентированный взвешенный</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Вершины (JSON)
                    </label>
                    <textarea
                        name="vertices"
                        value={formData.vertices}
                        onChange={handleInputChange}
                        rows={4}
                        className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                        placeholder='["A", "B", "C"]'
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Рёбра (JSON)
                    </label>
                    <textarea
                        name="edges"
                        value={formData.edges}
                        onChange={handleInputChange}
                        rows={4}
                        className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                        placeholder='[{"from": "A", "to": "B", "weight": 1}]'
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
                        {selectedGraph ? 'Обновить' : 'Создать'}
                    </button>
                </div>
            </form>

            <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900">Существующие графы</h3>
                <div className="mt-4 space-y-4">
                    {graphs.map((graph) => (
                        <div
                            key={graph.id}
                            className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                        >
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">
                                    {graph.category} - {graph.type}
                                </h4>
                                <p className="text-sm text-gray-500">
                                    Вершины: {graph.vertices.length}, Рёбра: {graph.edges.length}
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(graph)}
                                    className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-900"
                                >
                                    Редактировать
                                </button>
                                <button
                                    onClick={() => handleDelete(graph.id)}
                                    className="px-3 py-1 text-sm text-red-600 hover:text-red-900"
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GraphForm; 