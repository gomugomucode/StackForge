import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function validateCurriculum() {
  console.log('🔍 Starting Curriculum Health Check...');

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

  let totalTopics = topics.length;
  let completeTopics = 0;
  let report = '# CURRICULUM HEALTH REPORT\n\n';
  report += `Total Topics Analyzed: ${totalTopics}\n`;
  report += `Overall Completion Rate: ${totalTopics > 0 ? Math.round((0 / totalTopics) * 100) : 0}%\n\n`;
  report += '## Topic Breakdown\n\n';
  report += '| Topic | Lesson | Examples | Quiz | Interview | Project | Cheatsheet | Status |\n';
  report += '| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n';

  for (const topic of topics) {
    const hasLesson = !!topic.content;
    const hasExamples = topic.examples.length > 0;
    const hasQuiz = topic.quizzes.length > 0;
    const hasInterview = topic.interviews.length > 0;
    const hasProject = projects.some(p => p.topicId === topic.id);
    const hasCheatsheet = cheatsheets.some(c => c.topicId === topic.id);

    const isComplete = hasLesson && hasExamples && hasQuiz && hasInterview && hasProject && hasCheatsheet;
    if (isComplete) completeTopics++;

    report += `| ${topic.title} | ${hasLesson ? '✅' : '❌'} | ${hasExamples ? '✅' : '❌'} | ${hasQuiz ? '✅' : '❌'} | ${hasInterview ? '✅' : '❌'} | ${hasProject ? '✅' : '❌'} | ${hasCheatsheet ? '✅' : '❌'} | ${isComplete ? 'COMPLETE' : 'INCOMPLETE'} |\n`;
  }

  report += `\n\n## Summary\n- Total Topics: ${totalTopics}\n- Fully Complete: ${completeTopics}\n- Missing Assets: ${totalTopics - completeTopics}`;

  fs.writeFileSync('reports/CURRICULUM_HEALTH_REPORT.md', report);
  console.log('✅ Health report generated at reports/CURRICULUM_HEALTH_REPORT.md');
  await prisma.$disconnect();
}

validateCurriculum().catch(console.error);
