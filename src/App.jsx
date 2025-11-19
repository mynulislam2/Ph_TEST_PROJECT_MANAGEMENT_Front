import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout, AuthLayout } from './components/layouts/index.js';
import { DashboardPage } from './app/dashboard/index.jsx';
import { TeamsPage } from './app/teams/index.jsx';
import { ProjectsPage } from './app/projects/index.jsx';
import { TasksPage } from './app/tasks/index.jsx';
import { LoginPage } from './app/login/index.jsx';
import { RegisterPage } from './app/register/index.jsx';
import { TeamDetailPage } from './app/teams/detail.jsx';
import { ProjectDetailPage } from './app/projects/detail.jsx';
import { TaskDetailPage } from './app/tasks/detail.jsx';
import { useAuth } from './hooks/useAuth.js';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>

    <Route
      element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/teams" element={<TeamsPage />} />
      <Route path="/teams/:id" element={<TeamDetailPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:id" element={<ProjectDetailPage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/tasks/:id" element={<TaskDetailPage />} />
    </Route>

    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

export default App;
