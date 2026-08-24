/**
 * Export Module — Direct PDF Download
 * Generates a clean, white-background PDF with 4 kits per page (2×2 grid) using jsPDF.
 */
const Export = (() => {
  'use strict';

  // A4 dimensions in mm
  const PAGE_W = 210;
  const PAGE_H = 297;
  const MARGIN = 16;
  const CONTENT_W = PAGE_W - MARGIN * 2;

  // Grid: 2 columns, 2 rows per page
  const COLS = 2;
  const ROWS = 2;
  const GAP_X = 10;
  const GAP_Y = 10;
  const CELL_W = (CONTENT_W - GAP_X) / COLS;

  // Header/footer heights
  const HEADER_FIRST = 24;
  const HEADER_REST = 14;
  const FOOTER_H = 12;

  /**
   * Load an image and return as base64 data URL.
   */
  function loadImageAsBase64(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const c = document.createElement('canvas');
          c.width = img.naturalWidth;
          c.height = img.naturalHeight;
          const ctx = c.getContext('2d');
          ctx.drawImage(img, 0, 0);
          resolve({ data: c.toDataURL('image/png'), w: img.naturalWidth, h: img.naturalHeight });
        } catch (e) {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  /**
   * Draw a single kit card.
   */
  function drawCard(doc, x, y, w, h, rank, teamName, kitLabel, imgInfo) {
    // Card border
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.3);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(x, y, w, h, 3, 3, 'FD');

    // Top-3: colored top strip
    if (rank <= 3) {
      const colors = { 1: [255, 200, 0], 2: [180, 180, 190], 3: [200, 150, 80] };
      const c = colors[rank];
      doc.setFillColor(c[0], c[1], c[2]);
      doc.rect(x + 0.15, y + 0.15, w - 0.3, 2.5, 'F');
    }

    // Rank badge
    const badgeX = x + 6;
    const badgeY = y + (rank <= 3 ? 6 : 5);
    const badgeR = 6;

    if (rank <= 3) {
      const colors = { 1: [255, 200, 0], 2: [180, 180, 190], 3: [200, 150, 80] };
      const c = colors[rank];
      doc.setFillColor(c[0], c[1], c[2]);
      doc.circle(badgeX, badgeY, badgeR, 'F');
      doc.setTextColor(40, 40, 40);
    } else {
      doc.setFillColor(240, 240, 240);
      doc.circle(badgeX, badgeY, badgeR, 'F');
      doc.setTextColor(100, 100, 100);
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(String(rank), badgeX, badgeY + 1, { align: 'center' });

    // Kit image area
    const imgPadX = 10;
    const imgTop = y + 14;
    const imgAreaW = w - imgPadX * 2;
    const imgAreaH = h - 38;

    if (imgInfo && imgInfo.data) {
      const aspect = imgInfo.w / imgInfo.h;
      let drawW, drawH;

      if (aspect > imgAreaW / imgAreaH) {
        drawW = imgAreaW * 0.8;
        drawH = drawW / aspect;
      } else {
        drawH = imgAreaH * 0.85;
        drawW = drawH * aspect;
      }

      const drawX = x + (w - drawW) / 2;
      const drawY = imgTop + (imgAreaH - drawH) / 2;

      try {
        doc.addImage(imgInfo.data, 'PNG', drawX, drawY, drawW, drawH);
      } catch (e) {
        drawPlaceholder(doc, x, imgTop, w, imgAreaH);
      }
    } else {
      drawPlaceholder(doc, x, imgTop, w, imgAreaH);
    }

    // Team name
    const infoY = y + h - 18;
    doc.setTextColor(20, 20, 20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(teamName, x + w / 2, infoY, { align: 'center', maxWidth: w - 8 });

    // Kit type
    doc.setTextColor(130, 130, 130);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(kitLabel, x + w / 2, infoY + 5.5, { align: 'center' });
  }

  /**
   * Placeholder for missing images.
   */
  function drawPlaceholder(doc, x, y, w, h) {
    doc.setFillColor(245, 245, 245);
    const pw = w * 0.35;
    const ph = h * 0.4;
    doc.roundedRect(x + (w - pw) / 2, y + (h - ph) / 2, pw, ph, 2, 2, 'F');
    doc.setTextColor(180, 180, 180);
    doc.setFontSize(7);
    doc.text('Kein Bild', x + w / 2, y + h / 2 + 1, { align: 'center' });
  }

  /**
   * Draw page header.
   */
  function drawHeader(doc, category, pageIndex, totalTeams, perPage) {
    const leagueColor = category.league === 'bundesliga' ? [214, 48, 49] : [9, 132, 227];

    if (pageIndex === 0) {
      // Accent line
      doc.setFillColor(leagueColor[0], leagueColor[1], leagueColor[2]);
      doc.rect(MARGIN, MARGIN, CONTENT_W, 1.5, 'F');

      // Title
      doc.setTextColor(30, 30, 30);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('Trikot Ranking', MARGIN, MARGIN + 10);

      // Subtitle
      doc.setTextColor(100, 100, 100);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(category.label + '  \u2014  Season 26/27', MARGIN, MARGIN + 16);
    } else {
      // Small accent line
      doc.setFillColor(leagueColor[0], leagueColor[1], leagueColor[2]);
      doc.rect(MARGIN, MARGIN, CONTENT_W, 1, 'F');

      // Page subtitle
      doc.setTextColor(100, 100, 100);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      const startRank = pageIndex * perPage + 1;
      const endRank = Math.min(startRank + perPage - 1, totalTeams);
      doc.text(`${category.label}  \u2014  Platz ${startRank}\u2013${endRank}`, MARGIN, MARGIN + 8);
    }
  }

  /**
   * Draw page footer.
   */
  function drawFooter(doc, pageIndex, totalPages) {
    const footerY = PAGE_H - MARGIN + 2;

    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.2);
    doc.line(MARGIN, footerY - 4, PAGE_W - MARGIN, footerY - 4);

    doc.setTextColor(160, 160, 160);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text('footballkitarchive.com  \u2022  Season 2026/27', MARGIN, footerY);
    doc.text(`Seite ${pageIndex + 1} / ${totalPages}`, PAGE_W - MARGIN, footerY, { align: 'right' });
  }

  /**
   * Main export function.
   */
  async function exportAsImage(categoryId, orderedTeamIds, category) {
    if (!orderedTeamIds || orderedTeamIds.length === 0) return;

    if (!window.jspdf) {
      if (window.App && window.App.showToast) {
        App.showToast('PDF-Bibliothek l\u00e4dt noch\u2026 bitte nochmal versuchen.', 3000);
      }
      return;
    }

    if (window.App && window.App.showToast) {
      App.showToast('PDF wird erstellt\u2026 \u23F3', 8000);
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const teams = orderedTeamIds.map(id => TEAMS_DATA.find(t => t.id === id)).filter(Boolean);
    const kitType = category.kitType;
    const kitLabel = kitType.charAt(0).toUpperCase() + kitType.slice(1) + ' Kit';

    // Preload all images
    const imagePromises = teams.map(team => {
      const kit = team.kits[kitType];
      return kit && kit.img ? loadImageAsBase64(kit.img) : Promise.resolve(null);
    });
    const images = await Promise.all(imagePromises);

    const perPage = COLS * ROWS;
    const totalPages = Math.ceil(teams.length / perPage);

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) doc.addPage();

      const isFirst = page === 0;
      const gridTop = MARGIN + (isFirst ? HEADER_FIRST : HEADER_REST) + 2;
      const availableH = PAGE_H - gridTop - MARGIN - FOOTER_H;
      const cellH = (availableH - GAP_Y) / ROWS;

      // White background (default)
      drawHeader(doc, category, page, teams.length, perPage);

      // Draw kit cards
      for (let i = 0; i < perPage; i++) {
        const teamIdx = page * perPage + i;
        if (teamIdx >= teams.length) break;

        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const cx = MARGIN + col * (CELL_W + GAP_X);
        const cy = gridTop + row * (cellH + GAP_Y);

        drawCard(doc, cx, cy, CELL_W, cellH, teamIdx + 1, teams[teamIdx].name, kitLabel, images[teamIdx]);
      }

      drawFooter(doc, page, totalPages);
    }

    doc.save(`trikot-ranking-${categoryId}.pdf`);

    if (window.App && window.App.showToast) {
      App.showToast('PDF heruntergeladen! \uD83D\uDCC4');
    }
  }

  return { exportAsImage };
})();

window.Export = Export;
