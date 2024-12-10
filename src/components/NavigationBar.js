import React from 'react';
import { Link} from 'react-router-dom';
import '../css/NavigationBar.css';

const NavigationBar = () => {

  return (
    <nav>
      <ul className="navigation-list">
        <li>
          <Link to="/board/dash">대시보드</Link>
        </li>
        <li>
          <Link to="/board/calendar">달력</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
