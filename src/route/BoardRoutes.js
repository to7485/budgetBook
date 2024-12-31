import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import DashBoard from '../screens/DashBoard';
import Calendar from '../screens/Calendar';

function BoardRoutes() {
  return (
      <Routes>
        <Route path="dash" element={<DashBoard />} />
        <Route path="calendar" element={<Calendar />} />
      </Routes>
  );
}

export default BoardRoutes;
