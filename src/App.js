import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthRoutes from './route/AuthRoutes';
import BoardRoutes from './route/BoardRoutes';
import Layout from './Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* 기본 경로에서 로그인 화면으로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/auth/login" />} />

        {/* Layout을 이용한 중첩 라우트 */}
        <Route path="/" element={<Layout />}>
          <Route path="auth/*" element={<AuthRoutes />} />
          <Route path="board/*" element={<BoardRoutes />} />
        </Route>
      </Routes>
    </Router>
  );
}



export default App;
