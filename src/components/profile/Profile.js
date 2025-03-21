import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI, profilesAPI, progressAPI } from '../../data/database';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [statistics, setStatistics] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const user = await authAPI.getCurrentUser();
                if (!user) {
                    navigate('/auth');
                    return;
                }

                const [profileData, statsData, adminStatus] = await Promise.all([
                    profilesAPI.getProfile(user.id),
                    progressAPI.getTestsStatistics(user.id),
                    authAPI.isAdmin()
                ]);

                if (!profileData) {
                    throw new Error('Профиль не найден');
                }

                setProfile(profileData);
                setStatistics(statsData || []);
                setIsAdmin(adminStatus);

                if (adminStatus) {
                    navigate('/admin-page');
                    return;
                }
            } catch (error) {
                console.error('Ошибка при загрузке профиля:', error);
                setError(error.message);
            }
        };

        loadProfile();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await authAPI.signOut();
            navigate('/auth');
        } catch (error) {
            console.error('Ошибка при выходе:', error);
            setError(error.message);
        }
    };

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-red-600">{error}</div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Загрузка...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Профиль пользователя
                        </h1>
                        <div className="flex items-center space-x-4">
                            {isAdmin && (
                                <button
                                    onClick={() => navigate('/admin-page')}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Панель администратора
                                </button>
                            )}
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Выйти
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Информация</h2>
                            <div className="space-y-3">
                                <p><span className="font-medium">Email:</span> {profile.email}</p>
                                <p><span className="font-medium">Общий счет:</span> {profile.total_score}</p>
                                <p><span className="font-medium">Выполнено заданий:</span> {profile.completed_tasks}</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-4">Статистика по тестам</h2>
                            <div className="space-y-4">
                                {statistics.map((stat) => (
                                    <div key={stat.id} className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-medium text-lg mb-2">{stat.title}</h3>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <p>Выполнено заданий: {stat.completedTasks}/{stat.totalTasks}</p>
                                            <p>Правильных ответов: {stat.correctAnswers}</p>
                                            <p>Общий счет: {stat.totalScore}</p>
                                            <p>Категория: {stat.category}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Последние результаты</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Тест
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Задание
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Результат
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Баллы
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Дата
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {profile.recent_results?.map((result, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {result.test_title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {result.task_title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                result.is_correct 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {result.is_correct ? 'Верно' : 'Неверно'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {result.score}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(result.completed_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 