import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return(
        <nav>
            <ul>
                <li><Link to="/">대시보드</Link></li>
                <li><Link to="/calendar">달력</Link></li>
            </ul>
        </nav>
    )
}

export default NavigationBar;