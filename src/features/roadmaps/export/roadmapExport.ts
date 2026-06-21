import jsPDF from "jspdf";

interface RoadmapNode {
  title: string;
  status: "completed" | "in-progress" | "locked";
  description?: string;
}

interface RoadmapExportProps {
  title: string;
  nodes: RoadmapNode[];
}

/**
 * Generates a PDF export of a roadmap layout.
 */
export async function exportRoadmapPDF({ title, nodes }: RoadmapExportProps) {
  const doc = new jsPDF();
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text(title, margin, 20);
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Roadmap Progress Report", margin, 30);
  
  let currentY = 40;
  
  nodes.forEach((node, index) => {
    if (currentY > 270) {
      doc.addPage();
      currentY = 20;
    }
    
    doc.setFont("helvetica", "bold");
    const statusSymbol = node.status === "completed" ? "✓" : node.status === "in-progress" ? "→" : "🔒";
    doc.text(`${statusSymbol} ${index + 1}. ${node.title}`, margin, currentY);
    
    if (node.description) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const description = doc.splitTextToSize(node.description, pageWidth - margin * 2);
      doc.text(description, margin + 5, currentY + 7);
      currentY += 15 + (description.length * 5);
    } else {
      currentY += 10;
    }
    
    doc.setFontSize(12);
  });
  
  doc.save(`${title.replace(/\s+/g, '_').toLowerCase()}_roadmap.pdf`);
}

/**
 * Generates a simple text-based summary of the roadmap.
 */
export async function exportRoadmapText({ title, nodes }: RoadmapExportProps) {
  let output = `# ${title}\n\n`;
  nodes.forEach((node, index) => {
    const status = node.status === "completed" ? "[X]" : " [ ]";
    output += `${status} ${index + 1}. ${node.title}\n`;
    if (node.description) output += `   ${node.description}\n`;
  });
  
  const blob = new Blob([output], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title.replace(/\s+/g, '_').toLowerCase()}_progress.txt`;
  link.click();
  URL.revokeObjectURL(url);
}
