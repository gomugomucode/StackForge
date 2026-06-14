
import { ContentBrowser } from '../features/content-browser/ContentBrowser';
import { contentService } from '../core/content/contentService';

const TutorialsPage = () => {
  const tutorials = contentService.getContentByType('tutorial');

  return (
    <ContentBrowser 
      title="Developer Tutorials" 
      description="Step-by-step guides to mastering the modern web stack, from fundamentals to advanced architecture."
      content={tutorials}
      type="tutorial"
    />
  );
};

export default TutorialsPage;
