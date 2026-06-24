import { PrismaClient } from '@prisma/client';
import { roadmaps } from '../src/data/roadmaps';
import { ContentGenerator } from '../src/features/curriculum/services/contentGenerator';

const prisma = new PrismaClient();
const generator = new ContentGenerator();

async function seedCurriculum() {
  console.log('🚀 Starting Curriculum Generation System...');
  process.env.MOCK_AI = 'true'; // Enable mock mode for seeding unless real key is present

  for (const roadmap of roadmaps) {
    console.log(`\n🗺️ Processing Roadmap: ${roadmap.title}`);
    
    // 1. Ensure Roadmap exists in DB
    const dbRoadmap = await prisma.roadmap.upsert({
      where: { slug: roadmap.slug },
      update: {},
      create: {
        slug: roadmap.slug,
        title: roadmap.title,
        description: roadmap.description,
        category: roadmap.category,
        color: roadmap.color,
        icon: roadmap.icon,
        overview: roadmap.overview,
      }
    });

    for (const module of roadmap.modules) {
      console.log(`  📦 Module: ${module.title}`);
      
      const dbModule = await prisma.module.upsert({
        where: { 
          // Note: Module doesn't have a unique constraint on slug in the current schema
          // In a real app, we'd use a combined key or a unique slug
          id: 'temp-id', // Simplified for this script
        },
        update: {},
        create: {
          roadmapId: dbRoadmap.id,
          slug: module.slug,
          title: module.title,
          description: module.description,
        }
      });
      
      // Correcting the logic since Module doesn't have unique slug in schema
      // For the sake of this script, I'll use a simple approach:
      const actualModule = await prisma.module.create({
        data: {
          roadmapId: dbRoadmap.id,
          slug: module.slug,
          title: module.title,
          description: module.description,
        }
      });

      for (const lesson of module.lessons) {
        console.log(`    📖 Topic: ${lesson.title}`);
        
        // Create Topic
        const topic = await prisma.topic.upsert({
          where: { slug: lesson.slug },
          update: {},
          create: {
            slug: lesson.slug,
            technology: roadmap.category, // Approximation
            title: lesson.title,
            description: lesson.description,
            difficulty: lesson.difficulty.toLowerCase(),
            estimatedTime: parseInt(lesson.estimatedTime) || 60,
            prerequisites: [], // To be populated by AI
            learningObjectives: [],
            tags: [],
          }
        });

        // Generate and save content
        try {
          const content = await generator.generateLesson({
            id: topic.id,
            slug: topic.slug,
            title: topic.title,
            technology: topic.technology,
            roadmapId: dbRoadmap.id,
            difficulty: topic.difficulty as any,
            estimatedTime: topic.estimatedTime,
            prerequisites: topic.prerequisites,
            learningObjectives: topic.learningObjectives,
            tags: topic.tags,
          });

          await prisma.topicContent.upsert({
            where: { topicId: topic.id },
            update: {
              overview: content.overview,
              whyItMatters: content.whyItMatters,
              visualExplanation: content.visualExplanation,
              syntax: content.syntaxGuide,
              explanation: content.beginnerExample,
              beginnerExample: content.beginnerExample,
              intermediateExample: content.intermediateExample,
              advancedExample: content.advancedExample,
              summary: content.summary,
              bestPractices: content.bestPractices,
              commonMistakes: content.commonMistakes,
            },
            create: {
              topicId: topic.id,
              overview: content.overview,
              whyItMatters: content.whyItMatters,
              visualExplanation: content.visualExplanation,
              syntax: content.syntaxGuide,
              explanation: content.beginnerExample,
              beginnerExample: content.beginnerExample,
              intermediateExample: content.intermediateExample,
              advancedExample: content.advancedExample,
              summary: content.summary,
              bestPractices: content.bestPractices,
              commonMistakes: content.commonMistakes,
            }
          });

          // Generate Cheatsheet
          const cheatsheet = await generator.generateCheatsheet({
            id: topic.id,
            slug: topic.slug,
            title: topic.title,
            technology: topic.technology,
            difficulty: topic.difficulty as any,
            estimatedTime: topic.estimatedTime,
            prerequisites: topic.prerequisites,
            learningObjectives: topic.learningObjectives,
            tags: topic.tags,
          });

          await prisma.cheatSheet.upsert({
            where: { slug: `cheatsheet-${topic.slug}` },
            update: { content: JSON.stringify(cheatsheet) },
            create: {
              slug: `cheatsheet-${topic.slug}`,
              title: `Cheatsheet: ${topic.title}`,
              content: JSON.stringify(cheatsheet),
              topicId: topic.id,
            }
          });

          // Generate Quiz
          const quizData = await generator.generateQuiz({
            id: topic.id,
            slug: topic.slug,
            title: topic.title,
            technology: topic.technology,
            difficulty: topic.difficulty as any,
            estimatedTime: topic.estimatedTime,
            prerequisites: topic.prerequisites,
            learningObjectives: topic.learningObjectives,
            tags: topic.tags,
          });

          const quiz = await prisma.quiz.create({
            data: {
              title: `${topic.title} Mastery Quiz`,
              difficulty: quizData.difficulty,
              type: quizData.type,
              topicId: topic.id,
              questions: {
                create: quizData.questions.map(q => ({
                  question: q.question,
                  options: q.options,
                  answer: q.answer,
                  explanation: q.explanation,
                  difficulty: q.difficulty,
                }))
              }
            }
          });

          // Generate Interviews
          const interviews = await generator.generateInterviewQuestions({
            id: topic.id,
            slug: topic.slug,
            title: topic.title,
            technology: topic.technology,
            difficulty: topic.difficulty as any,
            estimatedTime: topic.estimatedTime,
            prerequisites: topic.prerequisites,
            learningObjectives: topic.learningObjectives,
            tags: topic.tags,
          });

          await prisma.interviewQuestion.createMany({
            data: interviews.questions.map(q => ({
              topicId: topic.id,
              question: q.question,
              answer: q.answer,
              difficulty: q.difficulty,
              tags: q.companyTags,
            }))
          });

          // Generate Project
          const projectData = await generator.generateProject({
            id: topic.id,
            slug: topic.slug,
            title: topic.title,
            technology: topic.technology,
            difficulty: topic.difficulty as any,
            estimatedTime: topic.estimatedTime,
            prerequisites: topic.prerequisites,
            learningObjectives: topic.learningObjectives,
            tags: topic.tags,
          });

          await prisma.project.create({
            data: {
              title: projectData.title,
              description: projectData.description,
              difficulty: projectData.difficulty,
              topicId: topic.id,
              resources: projectData.requirements,
            }
          });

          // Generate Tutor Examples
          const tutorEx = await generator.generateTutorExamples({
            id: topic.id,
            slug: topic.slug,
            title: topic.title,
            technology: topic.technology,
            difficulty: topic.difficulty as any,
            estimatedTime: topic.estimatedTime,
            prerequisites: topic.prerequisites,
            learningObjectives: topic.learningObjectives,
            tags: topic.tags,
          });

          await prisma.topicExample.createMany({
            data: tutorEx.examples.map(e => ({
              topicId: topic.id,
              title: e.title,
              code: e.input,
              output: e.output,
              explanation: e.explanation,
            }))
          });

        } catch (error) {
          console.error(`    ❌ Error generating content for ${lesson.title}:`, error);
        }
      }
    }
  }

  console.log('\n✅ Curriculum Generation Complete!');
  await prisma.$disconnect();
}

seedCurriculum().catch(console.error);
