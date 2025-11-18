import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const imgWidth = 210; // A4 width in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  pdf.save(filename);
};

export const generateTeamReport = async (teamData: any) => {
  const pdf = new jsPDF();

  // Header
  pdf.setFontSize(20);
  pdf.text('Orquestra de Potenciais', 105, 20, { align: 'center' });

  pdf.setFontSize(16);
  pdf.text(`Relatório: ${teamData.name}`, 105, 35, { align: 'center' });

  // Team Info
  pdf.setFontSize(12);
  pdf.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 50);
  pdf.text(`Membros: ${teamData.members?.length || 0}`, 20, 60);

  // Energy Averages
  if (teamData.averages) {
    pdf.setFontSize(14);
    pdf.text('Média de Energia da Equipe', 20, 80);

    pdf.setFontSize(11);
    pdf.text(`Produtiva: ${teamData.averages.produtiva.toFixed(1)}/10`, 25, 90);
    pdf.text(`Confortável: ${teamData.averages.confortavel.toFixed(1)}/10`, 25, 100);
    pdf.text(`Renovação: ${teamData.averages.renovacao.toFixed(1)}/10`, 25, 110);
    pdf.text(`Conexão: ${teamData.averages.conexao.toFixed(1)}/10`, 25, 120);
  }

  pdf.save(`relatorio-${teamData.name}-${Date.now()}.pdf`);
};
