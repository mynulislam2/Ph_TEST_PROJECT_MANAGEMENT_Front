import { Link } from 'react-router-dom';
import { Avatar, Button } from '../../atoms/index.js';
import { useSearchStore } from '../../../store/search.store.js';
import './Navbar.css';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/projects', label: 'Projects' },
  { to: '/tasks', label: 'Tasks' },
];

export const Navbar = () => {
  const search = useSearchStore((state) => state.query);
  const setSearch = useSearchStore((state) => state.setQuery);

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <div>
          <span className="navbar__brand">Smart Task Manager</span>
          <div className="navbar__tabs">
            {links.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="navbar__search">
          <input
            type="search"
            placeholder="Search tasks, teams, people..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>
      <div className="navbar__right">
        <Button variant="ghost">+ New Task</Button>
        <div className="navbar__user">
          <div>
            <p>Workspace</p>
            <strong>Demo</strong>
          </div>
          <Avatar name="You" />
        </div>
      </div>
    </nav>
  );
};

