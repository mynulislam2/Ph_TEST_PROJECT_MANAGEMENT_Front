import { useState } from 'react';
import { ProjectForm } from '../../components/organisms/index.js';
import { ProjectTemplate } from '../../components/templates/index.js';
import { useProjects } from '../../hooks/useProjects.js';
import { useTeams } from '../../hooks/useTeams.js';

export const ProjectsPage = () => {
  const { projects, createProject } = useProjects();
  const { teams } = useTeams();
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (payload) => {
    await createProject(payload);
    setModalOpen(false);
  };

  return (
    <ProjectTemplate teams={teams} projects={projects} onOpenCreate={() => setModalOpen(true)}>
      {modalOpen && (
        <div className="project-template__modal">
          <div className="project-template__modal-card">
            <ProjectForm teams={teams} onSubmit={handleSubmit} onCancel={() => setModalOpen(false)} />
          </div>
        </div>
      )}
    </ProjectTemplate>
  );
};

