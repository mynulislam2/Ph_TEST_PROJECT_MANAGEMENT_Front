import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar, SidebarItem } from '../../molecules/index.js';
import { Button } from '../../atoms/index.js';
import { useAuth } from '../../../hooks/useAuth.js';
import './MainLayout.css';

const sidebarLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { to: '/teams', label: 'Teams', icon: '👥' },
  { to: '/projects', label: 'Projects', icon: '📁' },
  { to: '/tasks', label: 'Tasks', icon: '✅' },
];

export const MainLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="main-layout">
      <aside className="main-layout__sidebar">
        <div className="main-layout__sidebar-top">

          <div className="main-layout__sidebar-links">
            {sidebarLinks.map((link) => (
              <SidebarItem key={link.to} to={link.to} label={link.label} icon={link.icon} />
            ))}
          </div>
        </div>
        <div className="main-layout__sidebar-bottom">

          <div className="main-layout__logout">
            <div>
              <p>Signed in</p>
              <strong>{user?.name || 'Your workspace'}</strong>
            </div>
            <Button variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </aside>
      <main className="main-layout__content">
        <Navbar />
        <div className="main-layout__content-body">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

