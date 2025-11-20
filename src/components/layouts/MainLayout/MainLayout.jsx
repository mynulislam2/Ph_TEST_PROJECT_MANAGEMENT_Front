import { Outlet } from 'react-router-dom';
import { Navbar, SidebarItem } from '../../molecules/index.js';
import { Button } from '../../atoms/index.js';
import './MainLayout.css';

const sidebarLinks = [
  { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { to: '/teams', label: 'Teams', icon: '👥' },
  { to: '/projects', label: 'Projects', icon: '📁' },
  { to: '/tasks', label: 'Tasks', icon: '✅' },
];

export const MainLayout = () => (
  <div className="main-layout">
    <aside className="main-layout__sidebar">
      <div>
        <div className="main-layout__sidebar-links">
          {sidebarLinks.map((link) => (
            <SidebarItem key={link.to} to={link.to} label={link.label} icon={link.icon} />
          ))}
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

