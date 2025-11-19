import { Button } from '../../atoms/index.js';
import { ProjectList } from '../../organisms/index.js';
import './ProjectTemplate.css';

export const ProjectTemplate = ({ teams, projects, onOpenCreate, children }) => (
  <div className="project-template">
    <div className="project-template__toolbar card">
      <div>
        <p>Projects</p>
        <h2>Organize workstreams by team</h2>
      </div>
      <Button onClick={onOpenCreate}>+ New Project</Button>
    </div>
    <ProjectList projects={projects} />
    {children}
  </div>
);

