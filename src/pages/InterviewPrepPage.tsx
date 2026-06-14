import React from 'react';
import { ContentBrowser } from '../features/content-browser/ContentBrowser';
import { contentService } from '../core/content/contentService';

const InterviewPrepPage = () => {
  const questions = contentService.getContentByType('interview');

  return (
    <ContentBrowser 
      title="Interview Prep Center" 
      description="Master your technical interviews with our curated list of questions and detailed architectural answers."
      content={questions}
      type="interview"
    />
  );
};

export default InterviewPrepPage;
