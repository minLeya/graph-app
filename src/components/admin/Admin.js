import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GraphForm from './forms/GraphForm';
import TestForm from './forms/TestForm';
import TaskForm from './forms/TaskForm';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('graphs');
    const navigate = useNavigate();

    const renderContent = () => {
        switch (activeTab) {
            case 'graphs':
                return <GraphForm />;
            case 'tests':
                return <TestForm />;
            case 'tasks':
                return <TaskForm />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Панель администратора
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={() => navigate('/profile')}
                                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Вернуться в профиль
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                className={`${
                                    activeTab === 'graphs'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                onClick={() => setActiveTab('graphs')}
                            >
                                Графы
                            </button>
                            <button
                                className={`${
                                    activeTab === 'tests'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                onClick={() => setActiveTab('tests')}
                            >
                                Тесты
                            </button>
                            <button
                                className={`${
                                    activeTab === 'tasks'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                onClick={() => setActiveTab('tasks')}
                            >
                                Задания
                            </button>
                        </nav>
                    </div>

                    <div className="mt-6">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin; 