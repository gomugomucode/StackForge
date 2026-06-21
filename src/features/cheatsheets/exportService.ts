import jsPDF from "jspdf";

/**
 * Exports content to a PDF file using jsPDF.
 */
export async function exportToPDF(title: string, content: string) {
  const doc = new jsPDF();
  
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const wrapWidth = pageWidth - margin * 2;
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(title, margin, 20);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  
  const splitContent = doc.splitTextToSize(content, wrapWidth);
  doc.text(splitContent, margin, 30);
  
  doc.save(`${title.replace(/\s+/g, '_').toLowerCase()}_cheatsheet.pdf`);
}

/**
 * Exports content to a Markdown file.
 */
export async function exportToMarkdown(title: string, content: string) {
  const markdown = `# ${title}\n\n${content}\n\n---\n*Exported from StackForge Academy*`;
  const blob = new Blob([markdown], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title.replace(/\s+/g, '_').toLowerCase()}.md`;
  link.click();
  
  URL.revokeObjectURL(url);
}
