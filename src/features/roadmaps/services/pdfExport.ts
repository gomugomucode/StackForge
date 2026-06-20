import { jsPDF } from 'jspdf';
import { Roadmap } from '@/data/roadmaps';

export async function exportRoadmapToPDF(roadmap: Roadmap) {
  const doc = new jsPDF();
  let cursorY = 20;

  // Title
  doc.setFontSize(22);
  doc.text(roadmap.title, 20, cursorY);
  cursorY += 10;

  // Description
  doc.setFontSize(12);
  doc.setTextColor(100);
  const descriptionLines = doc.splitTextToWidth(roadmap.description, 170);
  doc.text(descriptionLines, 20, cursorY);
  cursorY += (descriptionLines.length * 7) + 10;

  // Modules
  roadmap.modules.forEach((module, mIdx) => {
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text(`${mIdx + 1}. ${module.title}`, 20, cursorY);
    cursorY += 8;

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(module.description, 25, cursorY);
    cursorY += 6;

    module.lessons.forEach((lesson, lIdx) => {
      doc.setFontSize(11);
      doc.setTextColor(50);
      doc.text(`- ${lesson.title}`, 30, cursorY);
      cursorY += 6;
      
      if (cursorY > 280) {
        doc.addPage();
        cursorY = 20;
      }
    });
    cursorY += 10;
  });

  doc.save(`${roadmap.slug}-roadmap.pdf`);
}
