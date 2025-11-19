import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthTemplate, AuthFooterLink } from '../../components/templates/index.js';
import { Input, Button } from '../../components/atoms/index.js';
import { useAuth } from '../../hooks/useAuth.js';

export const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await register(form);
    navigate('/dashboard');
  };

  return (
    <AuthTemplate
      title="Create account"
      subtitle="Start managing tasks smarter"
      footer={<AuthFooterLink text="Already have an account?" to="/login" linkText="Sign in" />}
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          required
        />
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
          {loading ? 'Creating...' : 'Create Account'}
        </Button>
      </form>
    </AuthTemplate>
  );
};

