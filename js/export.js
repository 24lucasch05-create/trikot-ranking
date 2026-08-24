/**
 * Export Module — Direct PDF Download
 * Generates a PDF with 4 kits per page (2×2 grid) using jsPDF.
 * Works on mobile and desktop — no print dialog needed.
 */
const Export = (() => {
  'use strict';

  // A4 dimensions in mm
  const PAGE_W = 210;
  const PAGE_H = 297;
  const MARGIN = 14;
  const CONTENT_W = PAGE_W - MARGIN * 2;
  const CONTENT_H = PAGE_H - MARGIN * 2;

  // Grid: 2 columns, 2 rows per page
  const COLS = 2;
  const ROWS = 2;
  const GAP = 8;
  const CELL_W = (CONTENT_W - GAP) / COLS;

  // Header/footer space
  const HEADER_H = 20;
  const FOOTER_H = 10;
  const GRID_TOP_FIRST = MARGIN + HEADER_H + 4;
  const GRID_TOP_REST = MARGIN + 12;
  const CELL_H_FIRST = (PAGE_H - GRID_TOP_FIRST - MARGIN - FOOTER_H - GAP) / ROWS;
  const CELL_H_REST = (PAGE_H - GRID_TOP_REST - MARGIN - FOOTER_H - GAP) / ROWS;

  /**
   * Load an image and return as base64 data URL via canvas.
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
          resolve(c.toDataURL('image/jpeg', 0.85));
        } catch (e) {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  /**
   * Get rank medal emoji
   */
  function getMedal(rank) {
    if (rank === 1) return '🥇 ';
    if (rank === 2) return '🥈 ';
    if (rank === 3) return '🥉 ';
    return '';
  }

  /**
   * Draw a single kit card in the PDF
   */
  function drawCard(doc, x, y, w, h, rank, teamName, kitLabel, imageData) {
    // Card background
    doc.setFillColor(22, 22, 31);
    doc.roundedRect(x, y, w, h, 4, 4, 'F');

    // Top-3 left accent bar
    if (rank <= 3) {
      const colors = { 1: [255, 215, 0], 2: [192, 192, 192], 3: [205, 127, 50] };
      const c = colors[rank];
      doc.setFillColor(c[0], c[1], c[2]);
      doc.roundedRect(x, y, 2.5, h, 1, 1, 'F');
    }

    // Rank badge
    const badgeSize = 12;
    const badgeX = x + 5;
    const badgeY = y + 5;
    if (rank <= 3) {
      const colors = { 1: [255, 215, 0], 2: [192, 192, 192], 3: [205, 127, 50] };
      const c = colors[rank];
      doc.setFillColor(c[0], c[1], c[2]);
      doc.roundedRect(badgeX, badgeY, badgeSize, badgeSize, 2, 2, 'F');
      doc.setTextColor(20, 20, 20);
    } else {
      doc.setFillColor(35, 35, 58);
      doc.roundedRect(badgeX, badgeY, badgeSize, badgeSize, 2, 2, 'F');
      doc.setTextColor(160, 160, 184);
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(String(rank), badgeX + badgeSize / 2, badgeY + badgeSize / 2 + 1, { align: 'center' });

    // Kit image
    const imgPad = 8;
    const imgAreaTop = y + 6;
    const imgAreaH = h - 30;
    const imgAreaW = w - imgPad * 2;

    if (imageData) {
      // Calculate aspect-fit dimensions
      const tempImg = new Image();
      tempImg.src = imageData;
      const aspect = tempImg.naturalWidth / (tempImg.naturalHeight || 1);

      let drawW, drawH;
      if (aspect > imgAreaW / imgAreaH) {
        drawW = imgAreaW * 0.75;
        drawH = drawW / aspect;
      } else {
        drawH = imgAreaH * 0.75;
        drawW = drawH * aspect;
      }

      const drawX = x + (w - drawW) / 2;
      const drawY = imgAreaTop + (imgAreaH - drawH) / 2;

      try {
        doc.addImage(imageData, 'JPEG', drawX, drawY, drawW, drawH);
      } catch (e) {
        // Image failed — draw placeholder
        drawPlaceholder(doc, x, imgAreaTop, w, imgAreaH);
      }
    } else {
      drawPlaceholder(doc, x, imgAreaTop, w, imgAreaH);
    }

    // Team name
    const nameY = y + h - 16;
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    const displayName = getMedal(rank) + teamName;
    doc.text(displayName, x + w / 2, nameY, { align: 'center', maxWidth: w - 10 });

    // Kit type label
    doc.setTextColor(107, 107, 130);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.text(kitLabel.toUpperCase(), x + w / 2, nameY + 6, { align: 'center' });
  }

  /**
   * Draw placeholder for missing images
   */
  function drawPlaceholder(doc, x, y, w, h) {
    doc.setFillColor(30, 30, 45);
    doc.roundedRect(x + w * 0.3, y + h * 0.25, w * 0.4, h * 0.5, 3, 3, 'F');
    doc.setTextColor(80, 80, 100);
    doc.setFontSize(8);
    doc.text('No image', x + w / 2, y + h / 2, { align: 'center' });
  }

  /**
   * Export the current ranking as a directly downloadable PDF.
   */
  async function exportAsImage(categoryId, orderedTeamIds, category) {
    if (!orderedTeamIds || orderedTeamIds.length === 0) return;

    if (!window.jspdf) {
      if (window.App && window.App.showToast) {
        App.showToast('PDF-Bibliothek lädt noch… bitte nochmal versuchen.', 3000);
      }
      return;
    }

    if (window.App && window.App.showToast) {
      App.showToast('PDF wird erstellt… ⏳', 8000);
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const teams = orderedTeamIds.map(id => TEAMS_DATA.find(t => t.id === id)).filter(Boolean);
    const kitType = category.kitType;
    const kitLabel = kitType.charAt(0).toUpperCase() + kitType.slice(1) + ' Kit';
    const leagueColor = category.league === 'bundesliga' ? [214, 48, 49] : [9, 132, 227];

    // Preload all images as base64
    const imagePromises = teams.map(team => {
      const kit = team.kits[kitType];
      return kit && kit.img ? loadImageAsBase64(kit.img) : Promise.resolve(null);
    });
    const images = await Promise.all(imagePromises);

    // Group into pages of 4
    const perPage = COLS * ROWS;
    const totalPages = Math.ceil(teams.length / perPage);

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) doc.addPage();

      const isFirst = page === 0;
      const gridTop = isFirst ? GRID_TOP_FIRST : GRID_TOP_REST;
      const cellH = isFirst ? CELL_H_FIRST : CELL_H_REST;

      // Page background
      doc.setFillColor(10, 10, 15);
      doc.rect(0, 0, PAGE_W, PAGE_H, 'F');

      // Header
      if (isFirst) {
        // League accent bar
        doc.setFillColor(leagueColor[0], leagueColor[1], leagueColor[2]);
        doc.rect(0, 0, PAGE_W, 2, 'F');

        // Title
        doc.setTextColor(240, 240, 245);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.text('Trikot Ranking', MARGIN, MARGIN + 10);

        // Subtitle
        doc.setTextColor(160, 160, 184);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(category.label + '  —  Season 26/27', MARGIN, MARGIN + 17);
      } else {
        // Small header on subsequent pages
        doc.setFillColor(leagueColor[0], leagueColor[1], leagueColor[2]);
        doc.rect(0, 0, PAGE_W, 2, 'F');

        doc.setTextColor(160, 160, 184);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        const startRank = page * perPage + 1;
        const endRank = Math.min(startRank + perPage - 1, teams.length);
        doc.text(`${category.label}  —  Platz ${startRank}–${endRank}`, MARGIN, MARGIN + 7);
      }

      // Draw cards
      for (let i = 0; i < perPage; i++) {
        const teamIdx = page * perPage + i;
        if (teamIdx >= teams.length) break;

        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const x = MARGIN + col * (CELL_W + GAP);
        const y = gridTop + row * (cellH + GAP);

        drawCard(doc, x, y, CELL_W, cellH, teamIdx + 1, teams[teamIdx].name, kitLabel, images[teamIdx]);
      }

      // Footer
      doc.setTextColor(74, 74, 96);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.text('footballkitarchive.com • Season 2026/27', MARGIN, PAGE_H - MARGIN + 4);
      doc.text(
        `Seite ${page + 1}/${totalPages}`,
        PAGE_W - MARGIN, PAGE_H - MARGIN + 4,
        { align: 'right' }
      );
    }

    // Download
    doc.save(`trikot-ranking-${categoryId}.pdf`);

    if (window.App && window.App.showToast) {
      App.showToast('PDF heruntergeladen! 📄');
    }
  }

  return { exportAsImage };
})();

window.Export = Export;
