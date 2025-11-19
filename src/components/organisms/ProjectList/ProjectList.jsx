import { ProjectCard } from '../../molecules/index.js';
import './ProjectList.css';

export const ProjectList = ({ projects = [] }) => (
  <div className="project-list">
    {projects.map((project) => (
      <ProjectCard key={project.id} project={project} />
    ))}
  </div>
);

