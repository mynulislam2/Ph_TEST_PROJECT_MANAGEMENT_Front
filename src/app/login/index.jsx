import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthTemplate, AuthFooterLink } from '../../components/templates/index.js';
import { Input, Button } from '../../components/atoms/index.js';
import { useAuth } from '../../hooks/useAuth.js';

export const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(form);
    navigate('/dashboard');
  };

  return (
    <AuthTemplate
      title="Welcome back"
      subtitle="Manage your projects and balance your team"
      footer={<AuthFooterLink text="No account?" to="/register" linkText="Create one" />}
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          required
        />
        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          required
        />
        {error && <p>{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </AuthTemplate>
  );
};

