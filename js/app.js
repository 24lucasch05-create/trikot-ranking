/**
 * App Module — Main Application Controller
 * Bundesliga & 2. Bundesliga Jersey Ranking 26/27
 */
(function () {
  'use strict';

  // --- State ---
  let currentCategory = CATEGORIES[0];
  let searchQuery = '';

  // --- DOM References ---
  const categoryTabsContainer = document.getElementById('category-tabs');
  const rankingGrid = document.getElementById('ranking-grid');
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  const btnReset = document.getElementById('btn-reset');
  const btnExport = document.getElementById('btn-export');
  const btnCompare = document.getElementById('btn-compare');
  const compareCancel = document.getElementById('compare-cancel');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const imageHelpModal = document.getElementById('image-help-modal');
  const modalClose = document.getElementById('modal-close');

  // --- Initialize ---
  function init() {
    renderCategoryTabs();
    initRanking();
    switchCategory(currentCategory);
    bindEvents();
  }

  // --- Category Tabs ---
  function renderCategoryTabs() {
    categoryTabsContainer.innerHTML = '';
    CATEGORIES.forEach((cat, index) => {
      const tab = document.createElement('button');
      tab.className = 'category-tab' + (index === 0 ? ' active' : '');
      tab.dataset.categoryId = cat.id;
      tab.dataset.league = cat.league;
      tab.innerHTML = `
        <span class="tab-icon">${cat.icon}</span>
        <span class="tab-label">${cat.label}</span>
      `;
      tab.addEventListener('click', () => {
        document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        switchCategory(cat);
      });
      categoryTabsContainer.appendChild(tab);
    });
  }

  function switchCategory(category) {
    currentCategory = category;
    searchQuery = '';
    searchInput.value = '';
    searchClear.classList.remove('visible');
    renderJerseyCards();
  }

  // --- Jersey Cards ---
  function renderJerseyCards() {
    // Get teams for this category
    const teams = TEAMS_DATA.filter(t => t.league === currentCategory.league);
    const kitType = currentCategory.kitType;

    // Check for saved ranking order
    const savedOrder = Storage.loadRanking(currentCategory.id);

    let orderedTeams;
    if (savedOrder && savedOrder.length > 0) {
      // Restore saved order
      orderedTeams = savedOrder
        .map(id => teams.find(t => t.id === id))
        .filter(Boolean);
      // Add any new teams not in saved order
      const savedIds = new Set(savedOrder);
      teams.forEach(t => {
        if (!savedIds.has(t.id)) orderedTeams.push(t);
      });
    } else {
      // Default alphabetical order
      orderedTeams = [...teams].sort((a, b) => a.name.localeCompare(b.name, 'de'));
    }

    rankingGrid.innerHTML = '';

    if (orderedTeams.length === 0) {
      rankingGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🏟️</div>
          <div class="empty-state-text">No teams found</div>
        </div>
      `;
      return;
    }

    orderedTeams.forEach((team, index) => {
      const card = createJerseyCard(team, kitType, index + 1);
      rankingGrid.appendChild(card);
    });

    // Apply search filter if active
    if (searchQuery) {
      filterCards(searchQuery);
    }
  }

  function createJerseyCard(team, kitType, rank) {
    const kit = team.kits[kitType];
    const card = document.createElement('div');
    card.className = 'jersey-card';
    card.draggable = true;
    card.dataset.teamId = team.id;
    card.dataset.teamName = team.name.toLowerCase();

    // Rank badge class
    let rankClass = 'rank-other';
    if (rank === 1) rankClass = 'rank-1';
    else if (rank === 2) rankClass = 'rank-2';
    else if (rank === 3) rankClass = 'rank-3';

    const kitTypeLabel = kitType.charAt(0).toUpperCase() + kitType.slice(1);

    card.innerHTML = `
      <div class="rank-badge ${rankClass}">${rank}</div>
      <a class="jersey-external-link" href="${kit.url}" target="_blank" rel="noopener" title="View on FootballKitArchive" onclick="event.stopPropagation()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </a>
      <div class="jersey-move-buttons">
        <button class="move-btn move-up" title="Move up" data-team-id="${team.id}" data-dir="-1">▲</button>
        <button class="move-btn move-down" title="Move down" data-team-id="${team.id}" data-dir="1">▼</button>
      </div>
      <div class="jersey-image-container">
        <img class="jersey-image"
             src="${kit.img}"
             alt="${team.name} ${kitTypeLabel} Kit 26/27"
             loading="lazy"
             onerror="this.parentElement.innerHTML = '<div class=\\'jersey-placeholder\\'><div class=\\'jersey-placeholder-icon\\'>👕</div><div class=\\'jersey-placeholder-text\\'>Click ↗ to view on<br>FootballKitArchive</div></div>'">
      </div>
      <div class="jersey-card-info">
        <div class="jersey-team-name" title="${team.name}">${team.name}</div>
        <div class="jersey-kit-type">${kitTypeLabel} Kit</div>
      </div>
    `;

    return card;
  }

  // --- Ranking Integration ---
  function initRanking() {
    Ranking.init(rankingGrid, (orderedIds) => {
      Storage.saveRanking(currentCategory.id, orderedIds);
      showToast('Ranking saved ✓');
    });

    // Move button delegation
    rankingGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.move-btn');
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        const teamId = btn.dataset.teamId;
        const dir = parseInt(btn.dataset.dir);
        Ranking.moveCard(teamId, dir);
      }
    });
  }

  // --- Search ---
  function filterCards(query) {
    const normalizedQuery = query.toLowerCase().trim();
    const cards = rankingGrid.querySelectorAll('.jersey-card');

    cards.forEach(card => {
      const teamName = card.dataset.teamName;
      if (normalizedQuery && !teamName.includes(normalizedQuery)) {
        card.classList.add('hidden-by-search');
      } else {
        card.classList.remove('hidden-by-search');
      }
    });
  }

  // --- Toast ---
  function showToast(message, duration = 2000) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // --- Event Binding ---
  function bindEvents() {
    // Search
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      filterCards(searchQuery);
      searchClear.classList.toggle('visible', searchQuery.length > 0);
    });

    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      filterCards('');
      searchClear.classList.remove('visible');
      searchInput.focus();
    });

    // Reset
    btnReset.addEventListener('click', () => {
      if (confirm(`Reset ranking for "${currentCategory.label}"?`)) {
        Storage.resetRanking(currentCategory.id);
        renderJerseyCards();
        showToast('Ranking reset');
      }
    });

    // Compare Game
    if (btnCompare) {
      btnCompare.addEventListener('click', () => {
        const order = Ranking.getCurrentOrder();
        if (!order || order.length === 0) return;
        Compare.start(currentCategory.id, order, (newOrder) => {
          // Save and re-render
          Storage.saveRanking(currentCategory.id, newOrder);
          renderJerseyCards();
        });
      });
    }

    if (compareCancel) {
      compareCancel.addEventListener('click', () => {
        Compare.cancel();
      });
    }

    // Export — dropdown menu
    btnExport.style.position = 'relative';

    // Create export dropdown
    const exportDropdown = document.createElement('div');
    exportDropdown.className = 'export-dropdown';
    exportDropdown.id = 'export-dropdown';
    exportDropdown.hidden = true;
    exportDropdown.innerHTML = `
      <button class="export-option" data-action="text">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
        <span>Copy as Text</span>
      </button>
      <button class="export-option" data-action="image">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        <span>Als PDF exportieren</span>
      </button>
    `;
    btnExport.appendChild(exportDropdown);

    btnExport.addEventListener('click', (e) => {
      // Don't toggle if clicking an option inside
      if (e.target.closest('.export-option')) return;
      exportDropdown.hidden = !exportDropdown.hidden;
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!btnExport.contains(e.target)) {
        exportDropdown.hidden = true;
      }
    });

    // Handle export option clicks
    exportDropdown.addEventListener('click', (e) => {
      const option = e.target.closest('.export-option');
      if (!option) return;

      exportDropdown.hidden = true;
      const action = option.dataset.action;
      const order = Ranking.getCurrentOrder();

      if (!order || order.length === 0) {
        showToast('No ranking to export');
        return;
      }

      if (action === 'text') {
        // Text export (original behavior)
        const categoryLabel = currentCategory.label;
        let text = `⚽ Trikot Ranking — ${categoryLabel} (26/27)\n`;
        text += '━'.repeat(40) + '\n\n';

        order.forEach((teamId, index) => {
          const team = TEAMS_DATA.find(t => t.id === teamId);
          const name = team ? team.name : teamId;
          const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '  ';
          const num = String(index + 1).padStart(2, ' ');
          text += `${medal} ${num}. ${name}\n`;
        });

        text += '\n' + '━'.repeat(40);
        text += '\nfootballkitarchive.com • Season 2026/27';

        navigator.clipboard.writeText(text).then(() => {
          showToast('Ranking copied to clipboard! 📋');
        }).catch(() => {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          showToast('Ranking copied to clipboard! 📋');
        });
      } else if (action === 'image') {
        // Image export with kit images
        Export.exportAsImage(currentCategory.id, order, currentCategory);
      }
    });

    // Modal
    modalClose.addEventListener('click', () => {
      imageHelpModal.hidden = true;
    });

    imageHelpModal.addEventListener('click', (e) => {
      if (e.target === imageHelpModal) {
        imageHelpModal.hidden = true;
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Escape closes modal
      if (e.key === 'Escape' && !imageHelpModal.hidden) {
        imageHelpModal.hidden = true;
      }

      // Ctrl+F focuses search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        searchInput.focus();
      }

      // Tab navigation with arrow keys when search not focused
      if (document.activeElement !== searchInput) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          const currentIdx = CATEGORIES.findIndex(c => c.id === currentCategory.id);
          let newIdx;
          if (e.key === 'ArrowLeft') {
            newIdx = currentIdx > 0 ? currentIdx - 1 : CATEGORIES.length - 1;
          } else {
            newIdx = currentIdx < CATEGORIES.length - 1 ? currentIdx + 1 : 0;
          }
          const tabs = document.querySelectorAll('.category-tab');
          tabs.forEach(t => t.classList.remove('active'));
          tabs[newIdx].classList.add('active');
          switchCategory(CATEGORIES[newIdx]);
          // Scroll tab into view
          tabs[newIdx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }
    });
  }

  window.App = {
    init,
    showToast,
    switchCategory,
    renderJerseyCards,
    getCurrentCategory: () => currentCategory
  };

  // --- Boot ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
