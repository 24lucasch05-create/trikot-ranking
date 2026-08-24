/**
 * Compare Module — Comparison-based ranking game
 * Uses insertion sort: start from the bottom, bubble up until the kit finds its place.
 */
const Compare = {
  // State
  active: false,
  categoryId: null,
  items: [],         // array of team IDs in current ranking order (index 0 = #1)
  currentPos: 1,     // the position of the item we're currently inserting (1-indexed into items)
  challengerIdx: -1, // current index of the challenger in the items array
  totalComparisons: 0,
  madeComparisons: 0,
  onComplete: null,

  /**
   * Start a new comparison game
   * @param {string} categoryId - e.g. 'bundesliga-home'
   * @param {Array} teamIds - array of team IDs to rank
   * @param {Function} onComplete - callback(orderedTeamIds) when done
   */
  start(categoryId, teamIds, onComplete) {
    this.categoryId = categoryId;
    this.onComplete = onComplete;
    this.madeComparisons = 0;

    // Shuffle randomly
    this.items = [...teamIds];
    for (let i = this.items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }

    // Estimate total comparisons (average case for insertion sort ≈ n*n/4)
    const n = this.items.length;
    this.totalComparisons = Math.round(n * (n - 1) / 4);

    // Start inserting from position 1 (second element)
    this.currentPos = 1;
    this.challengerIdx = 1;
    this.active = true;

    this._showOverlay();
    this._showComparison();
  },

  /**
   * User picked a winner
   * @param {'left'|'right'} choice - which side the user picked
   */
  pick(choice) {
    if (!this.active) return;

    this.madeComparisons++;

    // Left card = the one currently above (challengerIdx - 1)
    // Right card = the challenger (challengerIdx)
    const aboveIdx = this.challengerIdx - 1;

    if (choice === 'right') {
      // Challenger wins — swap it up
      [this.items[aboveIdx], this.items[this.challengerIdx]] = 
        [this.items[this.challengerIdx], this.items[aboveIdx]];
      this.challengerIdx = aboveIdx;

      if (this.challengerIdx > 0) {
        // Compare with the next one above
        this._showComparison();
      } else {
        // Challenger reached #1, move to next item
        this._nextItem();
      }
    } else {
      // Challenger loses — it found its place, move to next item
      this._nextItem();
    }
  },

  /**
   * Move to the next item to insert
   */
  _nextItem() {
    this.currentPos++;
    if (this.currentPos >= this.items.length) {
      // All done!
      this._finish();
    } else {
      this.challengerIdx = this.currentPos;
      this._showComparison();
    }
  },

  /**
   * Display the current comparison
   */
  _showComparison() {
    const overlay = document.getElementById('compare-overlay');
    if (!overlay) return;

    const aboveIdx = this.challengerIdx - 1;
    const challengerTeamId = this.items[this.challengerIdx];
    const aboveTeamId = this.items[aboveIdx];

    const category = CATEGORIES.find(c => c.id === this.categoryId);
    const kitType = category ? category.kitType : 'home';

    const challengerTeam = TEAMS_DATA.find(t => t.id === challengerTeamId);
    const aboveTeam = TEAMS_DATA.find(t => t.id === aboveTeamId);

    if (!challengerTeam || !aboveTeam) return;

    const leftKit = aboveTeam.kits[kitType];
    const rightKit = challengerTeam.kits[kitType];

    // Update progress
    const progress = Math.min(100, Math.round((this.currentPos / (this.items.length - 1)) * 100));
    document.getElementById('compare-progress-fill').style.width = progress + '%';
    document.getElementById('compare-progress-text').textContent = 
      `Kit ${this.currentPos} of ${this.items.length - 1} • ${this.madeComparisons} comparisons`;

    // Update position context
    document.getElementById('compare-context').textContent = 
      `Currently ranked #${aboveIdx + 1} vs challenger from #${this.challengerIdx + 1}`;

    // Left card (currently above)
    const leftCard = document.getElementById('compare-left');
    leftCard.innerHTML = this._renderCompareCard(aboveTeam, leftKit, kitType, 'left');

    // Right card (challenger)
    const rightCard = document.getElementById('compare-right');
    rightCard.innerHTML = this._renderCompareCard(challengerTeam, rightKit, kitType, 'right');

    // Animate cards in
    leftCard.classList.remove('compare-card-enter');
    rightCard.classList.remove('compare-card-enter');
    void leftCard.offsetWidth; // force reflow
    leftCard.classList.add('compare-card-enter');
    rightCard.classList.add('compare-card-enter');
  },

  _renderCompareCard(team, kit, kitType, side) {
    const kitTypeLabel = kitType.charAt(0).toUpperCase() + kitType.slice(1);
    return `
      <div class="compare-card-image">
        <img src="${kit.img}" alt="${team.name} ${kitTypeLabel}" 
             onerror="this.src=''; this.alt=''; this.parentElement.innerHTML='<div class=\\'jersey-placeholder\\'><div class=\\'jersey-placeholder-icon\\'>👕</div></div>'">
      </div>
      <div class="compare-card-info">
        <div class="compare-card-name">${team.name}</div>
        <div class="compare-card-kit">${kitTypeLabel} Kit</div>
      </div>
    `;
  },

  _showOverlay() {
    const overlay = document.getElementById('compare-overlay');
    if (overlay) {
      overlay.hidden = false;
      document.body.style.overflow = 'hidden';
    }
  },

  _hideOverlay() {
    const overlay = document.getElementById('compare-overlay');
    if (overlay) {
      overlay.hidden = true;
      document.body.style.overflow = '';
    }
  },

  _finish() {
    this.active = false;
    this._hideOverlay();

    // Show result toast
    if (window.App && window.App.showToast) {
      window.App.showToast(`Ranking complete! ${this.madeComparisons} comparisons made 🏆`);
    }

    if (this.onComplete) {
      this.onComplete(this.items);
    }
  },

  cancel() {
    this.active = false;
    this._hideOverlay();
  }
};

window.Compare = Compare;
