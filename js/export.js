/**
 * Export Module — PDF Export
 * Renders the current ranking as a print-ready page with 4 kits per page (2×2 grid).
 * Uses an iframe + window.print() for universal PDF support (desktop + mobile).
 */
const Export = (() => {
  'use strict';

  /**
   * Build the print-optimized HTML with 2×2 grid, 4 kits per page.
   */
  function buildPrintHTML(categoryId, orderedTeamIds, category, baseURL) {
    const kitType = category.kitType;
    const kitLabel = kitType.charAt(0).toUpperCase() + kitType.slice(1);
    const leagueColor = category.league === 'bundesliga' ? '#d63031' : '#0984e3';
    const dateStr = new Date().toLocaleDateString('de-DE', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    // Group teams into pages of 4
    const pages = [];
    for (let i = 0; i < orderedTeamIds.length; i += 4) {
      pages.push(orderedTeamIds.slice(i, i + 4));
    }

    // Build cards for each page
    let pagesHTML = '';
    pages.forEach((pageTeamIds, pageIndex) => {
      const isLast = pageIndex === pages.length - 1;

      let cardsHTML = '';
      pageTeamIds.forEach((teamId, indexInPage) => {
        const globalRank = pageIndex * 4 + indexInPage + 1;
        const team = TEAMS_DATA.find(t => t.id === teamId);
        if (!team) return;

        const kit = team.kits[kitType];
        const imgSrc = kit ? kit.img : '';

        // Medal for top 3
        let medal = '';
        let rankBg = '#23233a';
        let rankBorder = 'transparent';
        if (globalRank === 1) { medal = '🥇'; rankBg = 'linear-gradient(135deg, #ffd700, #ffaa00)'; rankBorder = '#ffd700'; }
        else if (globalRank === 2) { medal = '🥈'; rankBg = 'linear-gradient(135deg, #c0c0c0, #a0a0a0)'; rankBorder = '#c0c0c0'; }
        else if (globalRank === 3) { medal = '🥉'; rankBg = 'linear-gradient(135deg, #cd7f32, #b8690e)'; rankBorder = '#cd7f32'; }

        const rankBadgeStyle = globalRank <= 3
          ? `background:${rankBg};color:#1a1a00;box-shadow:0 2px 8px rgba(0,0,0,0.3);`
          : `background:#23233a;color:#a0a0b8;`;

        cardsHTML += `
          <div class="kit-card" style="border-color:${rankBorder};">
            <div class="rank-badge" style="${rankBadgeStyle}">
              ${globalRank}
            </div>
            <div class="kit-image-wrap">
              ${imgSrc
                ? `<img src="${imgSrc}" alt="${team.name}" class="kit-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
                   <div class="kit-placeholder" style="display:none;">👕</div>`
                : `<div class="kit-placeholder">👕</div>`
              }
            </div>
            <div class="kit-info">
              <div class="team-name">${medal ? medal + ' ' : ''}${team.name}</div>
              <div class="kit-type">${kitLabel} Kit</div>
            </div>
          </div>`;
      });

      pagesHTML += `
        <div class="page${isLast ? '' : ' page-break'}">
          ${pageIndex === 0 ? `
            <div class="page-header">
              <div class="header-bar" style="background:${leagueColor};"></div>
              <div class="header-title">⚽ Trikot Ranking</div>
              <div class="header-subtitle">${category.label} — Season 26/27</div>
            </div>
          ` : `
            <div class="page-header page-header-small">
              <div class="header-bar" style="background:${leagueColor};"></div>
              <div class="header-subtitle">${category.label} — Platz ${pageIndex * 4 + 1}–${Math.min(pageIndex * 4 + 4, orderedTeamIds.length)}</div>
            </div>
          `}
          <div class="kit-grid ${pageTeamIds.length <= 2 ? 'kit-grid-few' : ''}">
            ${cardsHTML}
          </div>
          <div class="page-footer">
            <span>footballkitarchive.com • Season 2026/27</span>
            <span>${dateStr}</span>
          </div>
        </div>`;
    });

    return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<base href="${baseURL}">
<title>Trikot Ranking — ${category.label}</title>
<style>
  @page {
    size: A4 portrait;
    margin: 12mm 14mm;
  }

  *, *::before, *::after {
    margin: 0; padding: 0; box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    background: #0a0a0f;
    color: #f0f0f5;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    width: 100%;
    min-height: calc(100vh - 24mm);
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  .page-break {
    page-break-after: always;
    break-after: page;
  }

  /* Header */
  .page-header {
    margin-bottom: 16px;
    flex-shrink: 0;
  }

  .header-bar {
    height: 4px;
    border-radius: 2px;
    margin-bottom: 16px;
  }

  .header-title {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-bottom: 4px;
  }

  .header-subtitle {
    font-size: 15px;
    color: #a0a0b8;
    font-weight: 500;
  }

  .page-header-small {
    margin-bottom: 12px;
  }

  .page-header-small .header-bar {
    margin-bottom: 10px;
  }

  /* 2×2 Grid */
  .kit-grid {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 12px;
    min-height: 0;
  }

  .kit-grid-few {
    grid-template-rows: 1fr;
  }

  /* Kit Card */
  .kit-card {
    position: relative;
    background: rgba(255,255,255,0.04);
    border: 2px solid transparent;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 12px 14px;
    overflow: hidden;
    min-height: 0;
  }

  .rank-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    font-weight: 800;
    font-size: 18px;
    z-index: 2;
  }

  .kit-image-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 0;
    padding: 8px;
  }

  .kit-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 4px 16px rgba(0,0,0,0.4));
  }

  .kit-placeholder {
    font-size: 48px;
    opacity: 0.3;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .kit-info {
    text-align: center;
    flex-shrink: 0;
    padding-top: 8px;
  }

  .team-name {
    font-size: 15px;
    font-weight: 700;
    color: #000000;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .kit-type {
    font-size: 11px;
    color: #6b6b82;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
  }

  /* Footer */
  .page-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    padding-top: 8px;
    border-top: 1px solid rgba(255,255,255,0.06);
    font-size: 10px;
    color: #4a4a60;
    flex-shrink: 0;
  }

  /* Print-specific */
  @media print {
    body { background: #0a0a0f !important; }
    .page {
      min-height: auto;
      height: calc(100vh - 1px);
    }
    .kit-grid {
      flex: 1;
    }
  }

  /* Screen preview styles */
  @media screen {
    body { padding: 20px; }
    .page {
      max-width: 700px;
      margin: 0 auto 40px;
      min-height: 900px;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 8px;
      padding: 24px;
    }
  }
</style>
</head>
<body>
  ${pagesHTML}
  <script>
    // Wait for all images to load, then auto-print
    const images = document.querySelectorAll('.kit-img');
    let loaded = 0;
    const total = images.length;

    function checkReady() {
      loaded++;
      if (loaded >= total) {
        setTimeout(() => window.print(), 400);
      }
    }

    if (total === 0) {
      setTimeout(() => window.print(), 300);
    } else {
      images.forEach(img => {
        if (img.complete) {
          checkReady();
        } else {
          img.addEventListener('load', checkReady);
          img.addEventListener('error', checkReady);
        }
      });
    }
  </script>
</body>
</html>`;
  }

  /**
   * Export the current ranking as PDF.
   * Opens a new tab with print-optimized layout and auto-triggers the print/save-as-PDF dialog.
   */
  async function exportAsImage(categoryId, orderedTeamIds, category) {
    if (!orderedTeamIds || orderedTeamIds.length === 0) return;

    if (window.App && window.App.showToast) {
      App.showToast('PDF wird vorbereitet… 📄', 3000);
    }

    // Compute base URL so relative image paths work in the new tab
    const baseURL = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
    const html = buildPrintHTML(categoryId, orderedTeamIds, category, baseURL);

    // Open in new tab — images use relative paths which resolve from the same origin
    const newWin = window.open('', '_blank');
    if (newWin) {
      newWin.document.write(html);
      newWin.document.close();
    } else {
      // Popup blocked — fallback to blob download
      try {
        const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `trikot-ranking-${categoryId}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        if (window.App && window.App.showToast) {
          App.showToast('HTML heruntergeladen — im Browser öffnen für PDF.', 4000);
        }
      } catch (err) {
        console.error('Export failed:', err);
        if (window.App && window.App.showToast) {
          App.showToast('Export fehlgeschlagen — Popup-Blocker deaktivieren.', 4000);
        }
      }
    }
  }

  return { exportAsImage };
})();

window.Export = Export;
