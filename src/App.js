import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUpIn from './pages/SignUpIn'; // Импортируем компонент из нового файла
import Dashboard from './pages/Dashboard';
import Test1 from './pages/Test1';
import Test2 from './pages/Test2';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpIn/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
