import './ProjectCard.css';

export const ProjectCard = ({ project }) => (
  <div className="project-card">
    <h3>{project.name}</h3>
    <p>{project.description}</p>
    <span>{project.task_count || 0} Tasks</span>
  </div>
);

