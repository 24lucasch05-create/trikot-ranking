/**
 * Ranking Module
 * Handles drag-and-drop reordering of jersey cards.
 */
const Ranking = {
  draggedElement: null,
  draggedIndex: -1,
  placeholder: null,

  /**
   * Initialize drag-and-drop on a container
   * @param {HTMLElement} container - The grid container
   * @param {Function} onReorder - Callback when order changes, receives ordered array of team IDs
   */
  init(container, onReorder) {
    this.container = container;
    this.onReorder = onReorder;

    // Use event delegation on the container
    container.addEventListener('dragstart', this._onDragStart.bind(this));
    container.addEventListener('dragend', this._onDragEnd.bind(this));
    container.addEventListener('dragover', this._onDragOver.bind(this));
    container.addEventListener('dragenter', this._onDragEnter.bind(this));
    container.addEventListener('dragleave', this._onDragLeave.bind(this));
    container.addEventListener('drop', this._onDrop.bind(this));

    // Touch support
    container.addEventListener('touchstart', this._onTouchStart.bind(this), { passive: false });
    container.addEventListener('touchmove', this._onTouchMove.bind(this), { passive: false });
    container.addEventListener('touchend', this._onTouchEnd.bind(this), { passive: false });
  },

  /**
   * Get the current order of team IDs from the DOM
   * @returns {string[]}
   */
  getCurrentOrder() {
    const cards = this.container.querySelectorAll('.jersey-card:not(.hidden-by-search)');
    return Array.from(cards).map(card => card.dataset.teamId);
  },

  /**
   * Move a card up or down by one position
   * @param {string} teamId
   * @param {number} direction - -1 for up, 1 for down
   */
  moveCard(teamId, direction) {
    const cards = Array.from(this.container.querySelectorAll('.jersey-card:not(.hidden-by-search)'));
    const index = cards.findIndex(c => c.dataset.teamId === teamId);
    if (index === -1) return;

    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= cards.length) return;

    const card = cards[index];
    const target = cards[newIndex];

    if (direction === -1) {
      this.container.insertBefore(card, target);
    } else {
      if (target.nextSibling) {
        this.container.insertBefore(card, target.nextSibling);
      } else {
        this.container.appendChild(card);
      }
    }

    // Animate
    card.style.transition = 'transform 0.3s ease';
    card.style.transform = 'scale(1.03)';
    setTimeout(() => {
      card.style.transform = '';
      setTimeout(() => { card.style.transition = ''; }, 300);
    }, 150);

    // Update ranks and notify
    this._updateRanks();
    if (this.onReorder) {
      this.onReorder(this.getCurrentOrder());
    }
  },

  // --- Drag & Drop Handlers ---

  _getCard(element) {
    return element.closest('.jersey-card');
  },

  _onDragStart(e) {
    const card = this._getCard(e.target);
    if (!card) return;

    this.draggedElement = card;
    card.classList.add('dragging');

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', card.dataset.teamId);

    // Create a nice drag image
    requestAnimationFrame(() => {
      card.style.opacity = '0.4';
    });
  },

  _onDragEnd(e) {
    const card = this._getCard(e.target);
    if (!card) return;

    card.classList.remove('dragging');
    card.style.opacity = '';
    this.draggedElement = null;

    // Remove all drag-over states
    this.container.querySelectorAll('.drag-over').forEach(el => {
      el.classList.remove('drag-over');
    });

    this._updateRanks();
  },

  _onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  },

  _onDragEnter(e) {
    e.preventDefault();
    const card = this._getCard(e.target);
    if (card && card !== this.draggedElement) {
      card.classList.add('drag-over');
    }
  },

  _onDragLeave(e) {
    const card = this._getCard(e.target);
    if (card) {
      card.classList.remove('drag-over');
    }
  },

  _onDrop(e) {
    e.preventDefault();
    const targetCard = this._getCard(e.target);
    if (!targetCard || !this.draggedElement || targetCard === this.draggedElement) return;

    targetCard.classList.remove('drag-over');

    // Determine position
    const cards = Array.from(this.container.querySelectorAll('.jersey-card:not(.hidden-by-search)'));
    const draggedIdx = cards.indexOf(this.draggedElement);
    const targetIdx = cards.indexOf(targetCard);

    if (draggedIdx < targetIdx) {
      targetCard.parentNode.insertBefore(this.draggedElement, targetCard.nextSibling);
    } else {
      targetCard.parentNode.insertBefore(this.draggedElement, targetCard);
    }

    this._updateRanks();

    if (this.onReorder) {
      this.onReorder(this.getCurrentOrder());
    }
  },

  // --- Touch Support ---

  _touchStartPos: null,
  _touchElement: null,
  _touchClone: null,

  _onTouchStart(e) {
    const card = this._getCard(e.target);
    if (!card) return;

    // Don't interfere with link clicks or button clicks
    if (e.target.closest('.jersey-external-link') || e.target.closest('.move-btn')) return;

    this._touchStartPos = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
    this._touchElement = card;

    // Long press to start drag
    this._touchTimeout = setTimeout(() => {
      card.classList.add('dragging');
      // Create visual clone
      this._touchClone = card.cloneNode(true);
      this._touchClone.style.position = 'fixed';
      this._touchClone.style.zIndex = '1000';
      this._touchClone.style.opacity = '0.8';
      this._touchClone.style.pointerEvents = 'none';
      this._touchClone.style.width = card.offsetWidth + 'px';
      this._touchClone.style.transform = 'scale(1.05)';
      this._touchClone.style.boxShadow = '0 8px 32px rgba(0,0,0,0.6)';
      document.body.appendChild(this._touchClone);
      this._positionTouchClone(e.touches[0]);
    }, 300);
  },

  _onTouchMove(e) {
    if (!this._touchElement) return;

    if (this._touchClone) {
      e.preventDefault();
      this._positionTouchClone(e.touches[0]);

      // Find element under touch
      this._touchClone.style.display = 'none';
      const elementBelow = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
      this._touchClone.style.display = '';

      // Clear all drag-over
      this.container.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));

      const targetCard = this._getCard(elementBelow);
      if (targetCard && targetCard !== this._touchElement) {
        targetCard.classList.add('drag-over');
      }
    } else {
      // Cancel long press if moved too much
      const dx = e.touches[0].clientX - this._touchStartPos.x;
      const dy = e.touches[0].clientY - this._touchStartPos.y;
      if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
        clearTimeout(this._touchTimeout);
      }
    }
  },

  _onTouchEnd(e) {
    clearTimeout(this._touchTimeout);

    if (this._touchClone) {
      // Find drop target
      this._touchClone.style.display = 'none';
      const touch = e.changedTouches[0];
      const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
      this._touchClone.style.display = '';

      const targetCard = this._getCard(elementBelow);
      if (targetCard && targetCard !== this._touchElement) {
        const cards = Array.from(this.container.querySelectorAll('.jersey-card:not(.hidden-by-search)'));
        const draggedIdx = cards.indexOf(this._touchElement);
        const targetIdx = cards.indexOf(targetCard);

        if (draggedIdx < targetIdx) {
          targetCard.parentNode.insertBefore(this._touchElement, targetCard.nextSibling);
        } else {
          targetCard.parentNode.insertBefore(this._touchElement, targetCard);
        }

        this._updateRanks();
        if (this.onReorder) {
          this.onReorder(this.getCurrentOrder());
        }
      }

      // Cleanup
      document.body.removeChild(this._touchClone);
      this._touchClone = null;
      this._touchElement.classList.remove('dragging');
    }

    this.container.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    this._touchElement = null;
    this._touchStartPos = null;
  },

  _positionTouchClone(touch) {
    if (!this._touchClone) return;
    this._touchClone.style.left = (touch.clientX - this._touchClone.offsetWidth / 2) + 'px';
    this._touchClone.style.top = (touch.clientY - this._touchClone.offsetHeight / 2) + 'px';
  },

  // --- Rank Update ---

  _updateRanks() {
    const cards = this.container.querySelectorAll('.jersey-card:not(.hidden-by-search)');
    cards.forEach((card, index) => {
      const badge = card.querySelector('.rank-badge');
      if (badge) {
        const rank = index + 1;
        badge.textContent = rank;
        badge.className = 'rank-badge';
        if (rank === 1) badge.classList.add('rank-1');
        else if (rank === 2) badge.classList.add('rank-2');
        else if (rank === 3) badge.classList.add('rank-3');
        else badge.classList.add('rank-other');
      }
    });
  }
};

window.Ranking = Ranking;
