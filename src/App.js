import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUpIn from './pages/SignUpIn'; // Импортируем компонент из нового файла
import Dashboard from './pages/Dashboard';
import Test1 from './pages/Test1';
import Test2 from './pages/Test2';
import TopicTests from './pages/TopicTests';
import Test from './pages/Test';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpIn/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/topic/:topicId/tests" element={<TopicTests />} />
        <Route path="/topic/:topicId/test/:testId" element={<Test />} />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
