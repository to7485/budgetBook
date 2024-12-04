import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import DashBoard from './components/DashBoard'
import Calendar from './components/Calendar'


function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;
