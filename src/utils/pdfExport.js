// ─── PDF Export Utility ───────────────────────────────────────────────────────
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

/**
 * Exports the resume preview element as a high-quality ATS-friendly PDF.
 * Uses html2canvas for pixel-perfect rendering + jsPDF for packaging.
 *
 * @param {HTMLElement} element - The preview DOM element to export
 * @param {string} filename - Output filename (without .pdf)
 * @returns {Promise<void>}
 */
// export async function exportToPDF(element, filename = "resume") {
//   if (!element) throw new Error("No element provided for PDF export")

//   // Capture at 2× for retina-quality output
//   const canvas = await html2canvas(element, {
//     scale: 2,
//     useCORS: true,
//     backgroundColor: "#ffffff",
//     logging: false,
//     // Ensure full content is captured even if off-screen
//     windowWidth: element.scrollWidth,
//     windowHeight: element.scrollHeight
//   })

//   const imgData  = canvas.toDataURL("image/png")
//   const pdf      = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
//   const pageW    = pdf.internal.pageSize.getWidth()
//   const pageH    = pdf.internal.pageSize.getHeight()
//   const ratio    = pageW / canvas.width
//   const imgH     = canvas.height * ratio

//   // Multi-page support: slice the canvas across A4 pages
//   let yOffset = 0
//   while (yOffset < imgH) {
//     if (yOffset > 0) pdf.addPage()
//     pdf.addImage(imgData, "PNG", 0, -yOffset, pageW, imgH)
//     yOffset += pageH
//   }

//   pdf.save(`${filename}.pdf`)
// }


export async function exportToPDF(element, filename = "resume") {
  if (!element) throw new Error("No element provided");

  // 1. Temporarily lock the width for the "photo"
  const originalWidth = element.style.width;
  const originalMaxWidth = element.style.maxWidth;
  
  // 794px is the standard width for A4 at 96 DPI
  element.style.width = "794px"; 
  element.style.maxWidth = "794px";

  const canvas = await html2canvas(element, {
    scale: 2, // Keeps it crisp
    useCORS: true,
    backgroundColor: "#ffffff",
    windowWidth: 794, // Force the browser to render at this width
  });

  // 2. Reset the styles back to original
  element.style.width = originalWidth;
  element.style.maxWidth = originalMaxWidth;

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  
  const pageW = pdf.internal.pageSize.getWidth(); // 210
  const pageH = pdf.internal.pageSize.getHeight(); // 297
  
  // This math ensures the image fits perfectly across the 210mm width
  const imgH = (canvas.height * pageW) / canvas.width;

  let yOffset = 0;
  while (yOffset < imgH) {
    if (yOffset > 0) pdf.addPage();
    // Use 'FAST' compression to keep file size down
    pdf.addImage(imgData, "PNG", 0, -yOffset, pageW, imgH, undefined, 'FAST');
    yOffset += pageH;
  }

  pdf.save(`${filename}.pdf`);
}

