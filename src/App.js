import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUpIn from './pages/SignUpIn';
import Profile from './components/profile/Profile';
import PrivateRoute from './components/auth/PrivateRoute';
import Admin from './components/admin/Admin';
import Dashboard from './pages/Dashboard';
import Test from './pages/Test';
import Results from './pages/Results';
import AdminPage from './pages/AdminPage';
import TopicTests from './pages/TopicTests';
import Layout from './components/layout/Layout';

function App() {
    return (
        <Router>
            <Routes>
                {/* Публичные маршруты */}
                <Route path="/auth" element={<SignUpIn />} />
                
                {/* Защищенные маршруты */}
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Profile />
                            </Layout>
                        </PrivateRoute>
                    }
                />
                
                {/* Маршруты администратора */}
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute requireAdmin={true}>
                            <Layout>
                                <Admin />
                            </Layout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/admin-page"
                    element={
                        <PrivateRoute requireAdmin={true}>
                            <Layout>
                                <AdminPage />
                            </Layout>
                        </PrivateRoute>
                    }
                />

                {/* Защищенные маршруты для тестов */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Dashboard />
                            </Layout>
                        </PrivateRoute>
                    }
                />
                
                <Route
                    path="/topic/:topicId/tests"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <TopicTests />
                            </Layout>
                        </PrivateRoute>
                    }
                />
                
                <Route
                    path="/topic/:topicId/test/:testId"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Test />
                            </Layout>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/results/:topicId/:testId"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <Results />
                            </Layout>
                        </PrivateRoute>
                    }
                />
                
                {/* Перенаправление с корневого маршрута на страницу аутентификации */}
                <Route path="/" element={<Navigate to="/auth" replace />} />
                <Route path="/signin" element={<Navigate to="/auth" replace />} />
                <Route path="/signup" element={<Navigate to="/auth" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
