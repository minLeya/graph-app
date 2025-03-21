import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://zgwznptlltnofmscznav.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpnd3pucHRsbHRub2Ztc2N6bmF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NjE1NjUsImV4cCI6MjA1NjQzNzU2NX0.YwIxpl321rvIDhGBqgX_WlEWW2rrvgLZPRQ-BZWzrFY";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// API для работы с графами
export const graphsAPI = {
    // Получить все графы
    getAllGraphs: async () => {
        try {
            const { data, error } = await supabase
                .from('graphs')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Ошибка при получении графов:', error);
            throw error;
        }
    },

    // Создать новый граф
    createGraph: async (graph) => {
        try {
            const { data, error } = await supabase
                .from('graphs')
                .insert([graph])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Ошибка при создании графа:', error);
            throw error;
        }
    },

    // Обновить существующий граф
    updateGraph: async (id, graph) => {
        try {
            const { data, error } = await supabase
                .from('graphs')
                .update(graph)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Ошибка при обновлении графа:', error);
            throw error;
        }
    },

    // Удалить граф
    deleteGraph: async (id) => {
        try {
            const { error } = await supabase
                .from('graphs')
                .delete()
                .eq('id', id);

            if (error) throw error;
        } catch (error) {
            console.error('Ошибка при удалении графа:', error);
            throw error;
        }
    },
};

// API для работы с тестами
export const testsAPI = {
    // Получить все тесты
    getAllTests: async () => {
        try {
            const { data, error } = await supabase
                .from('tests')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Ошибка при получении тестов:', error);
            throw error;
        }
    },

    // Создать новый тест
    createTest: async (test) => {
        try {
            const { data, error } = await supabase
                .from('tests')
                .insert([test])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Ошибка при создании теста:', error);
            throw error;
        }
    },

    // Обновить существующий тест
    updateTest: async (id, test) => {
        try {
            const { data, error } = await supabase
                .from('tests')
                .update(test)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Ошибка при обновлении теста:', error);
            throw error;
        }
    },

    // Удалить тест
    deleteTest: async (id) => {
        try {
            const { error } = await supabase
                .from('tests')
                .delete()
                .eq('id', id);

            if (error) throw error;
        } catch (error) {
            console.error('Ошибка при удалении теста:', error);
            throw error;
        }
    },
};

// API для работы с заданиями
export const tasksAPI = {
    // Получить все задания теста
    getTestTasks: async (testId) => {
        try {
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .eq('test_id', testId)
                .order('created_at', { ascending: true });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Ошибка при получении заданий:', error);
            throw error;
        }
    },

    // Создать новое задание
    createTask: async (task) => {
        try {
            const { data, error } = await supabase
                .from('tasks')
                .insert([task])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Ошибка при создании задания:', error);
            throw error;
        }
    },

    // Обновить существующее задание
    updateTask: async (id, task) => {
        try {
            const { data, error } = await supabase
                .from('tasks')
                .update(task)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Ошибка при обновлении задания:', error);
            throw error;
        }
    },

    // Удалить задание
    deleteTask: async (id) => {
        try {
            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', id);

            if (error) throw error;
        } catch (error) {
            console.error('Ошибка при удалении задания:', error);
            throw error;
        }
    },
};

// API для работы с прогрессом студентов
export const progressAPI = {
    // Получить прогресс студента
    getStudentProgress: async (userId) => {
        try {
            const { data, error } = await supabase
                .from('student_progress')
                .select(`
                    *,
                    tasks (
                        id,
                        title,
                        type,
                        max_score,
                        test_id,
                        tests (
                            id,
                            title,
                            category
                        )
                    )
                `)
                .eq('user_id', userId)
                .order('completed_at', { ascending: false });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Ошибка при получении прогресса:', error);
            throw error;
        }
    },

    // Сохранить результат выполнения задания
    saveTaskResult: async (userId, taskId, answer, isCorrect, score) => {
        try {
            const { data, error } = await supabase
                .from('student_progress')
                .upsert({
                    user_id: userId,
                    task_id: taskId,
                    answer,
                    is_correct: isCorrect,
                    score,
                    completed_at: new Date().toISOString(),
                    attempts: supabase.raw('COALESCE(attempts, 0) + 1')
                })
                .select()
                .single();

            if (error) throw error;

            // Обновляем общую статистику в профиле
            await profilesAPI.updateTotalScore(userId, isCorrect ? score : 0);

            return data;
        } catch (error) {
            console.error('Ошибка при сохранении результата:', error);
            throw error;
        }
    },

    // Получить статистику по тестам
    getTestsStatistics: async (userId) => {
        try {
            const { data, error } = await supabase
                .from('student_progress')
                .select(`
                    task_id,
                    is_correct,
                    score,
                    tasks(
                        test_id,
                        max_score,
                        tests(
                            id,
                            title,
                            category
                        )
                    )
                `)
                .eq('user_id', userId);

            if (error) throw error;

            // Группируем результаты по тестам
            const testStats = {};
            data.forEach(progress => {
                const testId = progress.tasks?.tests?.id;
                if (testId) {
                    if (!testStats[testId]) {
                        testStats[testId] = {
                            id: testId,
                            title: progress.tasks.tests.title,
                            category: progress.tasks.tests.category,
                            completedTasks: 0,
                            totalTasks: 0,
                            correctAnswers: 0,
                            totalScore: 0
                        };
                    }
                    testStats[testId].completedTasks++;
                    if (progress.is_correct) {
                        testStats[testId].correctAnswers++;
                    }
                    testStats[testId].totalScore += progress.score || 0;
                }
            });

            return Object.values(testStats);
        } catch (error) {
            console.error('Ошибка при получении статистики:', error);
            throw error;
        }
    }
};

// API для работы с профилями пользователей
export const profilesAPI = {
    // Получить профиль пользователя
    getProfile: async (userId) => {
        try {
            const { data, error } = await supabase
                .from('user_profiles')
                .select(`
                    *,
                    recent_results:student_progress(
                        task_id,
                        answer,
                        is_correct,
                        score,
                        completed_at,
                        tasks(
                            title,
                            test_id,
                            tests(
                                title
                            )
                        )
                    )
                `)
                .eq('id_auth', userId)
                .single();

            if (error) throw error;

            // Преобразуем результаты в нужный формат
            if (data) {
                data.recent_results = data.recent_results?.map(result => ({
                    test_title: result.tasks?.tests?.title,
                    task_title: result.tasks?.title,
                    is_correct: result.is_correct,
                    score: result.score,
                    completed_at: result.completed_at
                })) || [];
            }

            return data;
        } catch (error) {
            console.error('Ошибка при получении профиля:', error);
            throw error;
        }
    },

    // Обновить профиль пользователя
    updateProfile: async (userId, profile) => {
        try {
            const { data, error } = await supabase
                .from('user_profiles')
                .update(profile)
                .eq('id_auth', userId)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Ошибка при обновлении профиля:', error);
            throw error;
        }
    },

    // Обновить общий счет пользователя
    updateTotalScore: async (userId, additionalScore) => {
        try {
            const { error } = await supabase
                .from('user_profiles')
                .update({
                    total_score: supabase.raw(`total_score + ${additionalScore}`),
                    completed_tasks: supabase.raw('completed_tasks + 1')
                })
                .eq('id_auth', userId);

            if (error) throw error;
        } catch (error) {
            console.error('Ошибка при обновлении счета:', error);
            throw error;
        }
    }
};

// API для аутентификации
export const authAPI = {
    // Регистрация пользователя
    signUp: async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`
                }
            });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            throw error;
        }
    },

    // Вход в систему
    signIn: async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Ошибка при входе:', error);
            throw error;
        }
    },

    // Получить текущего пользователя
    getCurrentUser: async () => {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) throw error;
            return user;
        } catch (error) {
            console.error('Ошибка при получении пользователя:', error);
            return null;
        }
    },

    // Проверка на администратора
    isAdmin: async () => {
        try {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError || !user) {
                console.log('Пользователь не найден или ошибка:', userError);
                return false;
            }

            console.log('ID пользователя:', user.id);

            const { data, error } = await supabase
                .from('user_profiles')
                .select('is_admin')
                .eq('id_auth', user.id)
                .single();

            if (error) {
                console.log('Ошибка при запросе к user_profiles:', error);
                return false;
            }
            if (!data) {
                console.log('Данные о пользователе не найдены в user_profiles');
                return false;
            }

            console.log('Статус администратора:', data.is_admin);
            return data.is_admin === true;
        } catch (error) {
            console.error('Ошибка при проверке статуса администратора:', error);
            return false;
        }
    },

    // Выход из системы
    signOut: async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            console.error('Ошибка при выходе:', error);
            throw error;
        }
    }
}; 