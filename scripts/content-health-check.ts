import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function contentHealthCheck() {
  console.log('🛠️  Running Content Completeness Engine...');

  const topics = await prisma.topic.findMany({
    include: {
      content: true,
      examples: true,
      quizzes: true,
      interviews: true,
    }
  });

  const projects = await prisma.project.findMany();
  const cheatsheets = await prisma.cheatSheet.findMany();

  const totalTopics = topics.length;
  let totalAssetsMissing = 0;
  let completeTopicsCount = 0;

  let report = '# STACKFORGE CONTENT COMPLETENESS REPORT\n\n';
  report += `**Date:** ${new Date().toDateString()}\n`;
  report += `**Total Topics:** ${totalTopics}\n`;
  
  let topicTable = '| Topic | Lesson | Cheatsheet | Quick Quiz | Mastery Quiz | Interviews | Project | Tutor Ex | Status |\n';
  topicTable += '| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n';

  for (const topic of topics) {
    const hasLesson = !!topic.content;
    const hasCheatsheet = cheatsheets.some(c => c.topicId === topic.id);
    const hasQuickQuiz = topic.quizzes.some(q => q.type === 'quick');
    const hasMasteryQuiz = topic.quizzes.some(q => q.type === 'full');
    const hasInterviews = topic.interviews.length > 0;
    const hasProject = projects.some(p => p.topicId === topic.id);
    const hasTutorEx = topic.examples.length > 0;

    const assets = [hasLesson, hasCheatsheet, hasQuickQuiz, hasMasteryQuiz, hasInterviews, hasProject, hasTutorEx];
    const missingInTopic = assets.filter(a => !a).length;
    totalAssetsMissing += missingInTopic;

    const isComplete = assets.every(a => a === true);
    if (isComplete) completeTopicsCount++;

    topicTable += `| ${topic.title} | ${hasLesson ? '✅' : '❌'} | ${hasCheatsheet ? '✅' : '❌'} | ${hasQuickQuiz ? '✅' : '❌'} | ${hasMasteryQuiz ? '✅' : '❌'} | ${hasInterviews ? '✅' : '❌'} | ${hasProject ? '✅' : '❌'} | ${hasTutorEx ? '✅' : '❌'} | ${isComplete ? 'COMPLETE' : 'INCOMPLETE'} |\n`;
  }

  const coveragePercentage = totalTopics > 0 ? Math.round((completeTopicsCount / totalTopics) * 100) : 0;

  report += `\n## Coverage Metrics\n`;
  report += `- **Overall Completion Rate:** ${coveragePercentage}%\n`;
  report += `- **Fully Complete Topics:** ${completeTopicsCount} / ${totalTopics}\n`;
  report += `- **Total Missing Asset-Topic Pairs:** ${totalAssetsMissing}\n\n`;

  report += `## Detailed Breakdown\n\n${topicTable}\n\n`;

  report += `## Priority Fixes\n`;
  report += `1. **High Priority**: Topics with 0 assets.\n`;
  report += `2. **Medium Priority**: Topics missing Mastery Quizzes or Projects.\n`;
  report += `3. **Low Priority**: Topics missing Tutor Examples.\n`;

  fs.writeFileSync('reports/CONTENT_COMPLETENESS.md', report);
  console.log('✅ Completeness report generated: reports/CONTENT_COMPLETENESS.md');
  await prisma.$disconnect();
}

contentHealthCheck().catch(console.error);
