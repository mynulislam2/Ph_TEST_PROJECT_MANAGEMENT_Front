import { useEffect, useState } from 'react';
import { Button, Input, Select } from '../../atoms/index.js';
import './ProjectForm.css';

export const ProjectForm = ({ teams = [], onSubmit, onCancel, submitLabel = 'Create Project' }) => {
  const [form, setForm] = useState({
    teamId: teams[0]?.id || '',
    name: '',
    description: '',
  });

  useEffect(() => {
    if (!teams.length) return;
    setForm((prev) => {
      if (prev.teamId && teams.some((team) => team.id === prev.teamId)) {
        return prev;
      }
      return { ...prev, teamId: teams[0].id };
    });
  }, [teams]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <Select
        label="Team"
        name="teamId"
        value={form.teamId}
        onChange={handleChange}
        options={teams.map((team) => ({ label: team.name, value: team.id }))}
      />
      <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
      <Input
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
      />
      <div className="project-form__actions">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
};

