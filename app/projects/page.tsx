
import { ContentBrowser } from '../features/content-browser/ContentBrowser';
import { contentService } from '@/lib/core/content/contentService';

const ProjectsPage = () => {
  const projects = contentService.getContentByType('project');

  return (
    <ContentBrowser 
      title="Project Library" 
      description="Build your portfolio with real-world projects. From simple clones to complex full-stack applications."
      content={projects}
      type="project"
    />
  );
};

export default ProjectsPage;
