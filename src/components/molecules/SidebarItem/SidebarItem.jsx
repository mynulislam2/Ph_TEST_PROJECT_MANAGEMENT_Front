import { NavLink } from 'react-router-dom';
import './SidebarItem.css';

export const SidebarItem = ({ to, label, icon }) => (
  <NavLink
    className={({ isActive }) => (isActive ? 'sidebar-item active' : 'sidebar-item')}
    to={to}
  >
    {icon && <span className="sidebar-item__icon">{icon}</span>}
    <span>{label}</span>
  </NavLink>
);

