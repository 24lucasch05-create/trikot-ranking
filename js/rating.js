/**
 * Rating Module
 * Allows the user to rate each kit from 0 to 100 in a random order,
 * then generates a new ranking based on the scores.
 */
const Rating = (() => {
  'use strict';

  let currentCategory = null;
  let shuffledTeams = [];
  let currentIndex = 0;
  let scores = {};

  // DOM Elements
  let modal, btnClose, progressDisplay;
  let imgElement, placeholderElement, nameDisplay, typeDisplay;
  let sliderInput, numberInput, btnNext;

  function init() {
    modal = document.getElementById('rating-modal');
    btnClose = document.getElementById('btn-close-rating');
    progressDisplay = document.getElementById('rating-progress');
    
    imgElement = document.getElementById('rating-image');
    placeholderElement = document.getElementById('rating-placeholder');
    nameDisplay = document.getElementById('rating-team-name');
    typeDisplay = document.getElementById('rating-kit-type');
    
    sliderInput = document.getElementById('rating-slider');
    numberInput = document.getElementById('rating-number');
    btnNext = document.getElementById('btn-rating-next');

    const btnRateMode = document.getElementById('btn-rate-mode');
    if (btnRateMode) {
      btnRateMode.addEventListener('click', startRating);
    }

    btnClose.addEventListener('click', closeRating);
    
    // Sync slider and number input
    sliderInput.addEventListener('input', (e) => {
      numberInput.value = e.target.value;
    });
    
    numberInput.addEventListener('input', (e) => {
      let val = parseInt(e.target.value, 10);
      if (isNaN(val)) val = 0;
      if (val < 0) val = 0;
      if (val > 100) val = 100;
      sliderInput.value = val;
    });

    btnNext.addEventListener('click', saveScoreAndNext);
    
    // Allow pressing Enter to go next
    numberInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') saveScoreAndNext();
    });
  }

  function startRating() {
    currentCategory = App.getCurrentCategory();
    if (!currentCategory) return;

    // Get all teams in this category
    const teams = TEAMS_DATA.filter(t => t.league === currentCategory.league && t.kits[currentCategory.kitType]);
    
    if (teams.length === 0) return;

    // Shuffle teams
    shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
    currentIndex = 0;
    scores = {};

    document.getElementById('rating-title').textContent = currentCategory.label + ' Rating';
    modal.hidden = false;
    
    showCurrentTeam();
  }

  function showCurrentTeam() {
    const team = shuffledTeams[currentIndex];
    const kit = team.kits[currentCategory.kitType];

    progressDisplay.textContent = `${currentIndex + 1} / ${shuffledTeams.length}`;
    nameDisplay.textContent = team.name;
    typeDisplay.textContent = currentCategory.kitType.charAt(0).toUpperCase() + currentCategory.kitType.slice(1) + ' Kit';
    
    // Reset inputs
    sliderInput.value = 50;
    numberInput.value = 50;

    // Show image or placeholder
    if (kit && kit.img) {
      imgElement.src = kit.img;
      imgElement.style.display = 'block';
      placeholderElement.style.display = 'none';
      imgElement.onerror = () => {
        imgElement.style.display = 'none';
        placeholderElement.style.display = 'flex';
      };
    } else {
      imgElement.style.display = 'none';
      placeholderElement.style.display = 'flex';
    }

    // Update button text
    if (currentIndex === shuffledTeams.length - 1) {
      btnNext.textContent = 'Finish & Rank';
    } else {
      btnNext.textContent = 'Next Kit';
    }
    
    // Focus the slider or number input so the user can use arrows/enter
    setTimeout(() => sliderInput.focus(), 50);
  }

  function saveScoreAndNext() {
    const team = shuffledTeams[currentIndex];
    const score = parseInt(numberInput.value, 10) || 0;
    scores[team.id] = score;

    currentIndex++;

    if (currentIndex >= shuffledTeams.length) {
      finishRating();
    } else {
      showCurrentTeam();
    }
  }

  function finishRating() {
    closeRating();
    
    // Sort teams based on scores (descending)
    shuffledTeams.sort((a, b) => {
      // If score is equal, fallback to alphabetical or random, here we keep existing
      return scores[b.id] - scores[a.id];
    });

    const newOrder = shuffledTeams.map(t => t.id);
    
    // Save to storage and apply
    Storage.saveRanking(currentCategory.id, newOrder);
    App.switchCategory(currentCategory); // Triggers re-render
    App.showToast('Ranking generated from your scores! 🏆', 4000);
  }

  function closeRating() {
    modal.hidden = true;
    imgElement.src = ''; // clear image
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { start: startRating };
})();
