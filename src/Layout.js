import React from 'react'
import { useLocation, Outlet } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';

const Layout = () => {
    const location = useLocation();
    console.log(location.pathname);
    return (
      <div>
        {/* /board 경로에서만 네비게이션 바 렌더링 */}
        {location.pathname.startsWith('/board') && <NavigationBar />}
        <Outlet /> {/* 자식 라우트 렌더링 */}
      </div>
    );
  };

export default Layout;