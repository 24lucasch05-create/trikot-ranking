# 🏆 Bundesliga & 2. Bundesliga Jersey Ranking — Season 26/27

## Overview

An interactive web application to browse and rank all jerseys (Home, Away, Third) for every team in the **Bundesliga** and **2. Bundesliga** for the 2026/27 season.

---

## 📊 Data Source

- **Kit Images**: Sourced from [FootballKitArchive](https://www.footballkitarchive.com/) for season 2026-27
- **Teams**: 18 per league × 2 leagues = **36 teams**
- **Jerseys**: 3 per team (Home, Away, Third) = **108 total jerseys**

---

## 🏟️ Teams

### Bundesliga (18 Teams)
| # | Team | Slug |
|---|------|------|
| 1 | FC Augsburg | augsburg |
| 2 | Bayer 04 Leverkusen | bayer-leverkusen |
| 3 | Bayern Munich | bayern-munich |
| 4 | Borussia Dortmund | borussia-dortmund |
| 5 | Borussia Mönchengladbach | borussia-monchengladbach |
| 6 | Eintracht Frankfurt | eintracht-frankfurt |
| 7 | SC Freiburg | freiburg |
| 8 | Hamburger SV | hamburger-sv |
| 9 | TSG Hoffenheim | hoffenheim |
| 10 | 1. FC Köln | fc-koln |
| 11 | RB Leipzig | rb-leipzig |
| 12 | Mainz 05 | mainz |
| 13 | SC Paderborn 07 | paderborn |
| 14 | FC Schalke 04 | schalke |
| 15 | SV Elversberg | elversberg |
| 16 | VfB Stuttgart | stuttgart |
| 17 | Union Berlin | union-berlin |
| 18 | Werder Bremen | werder-bremen |

### 2. Bundesliga (18 Teams)
| # | Team | Slug |
|---|------|------|
| 1 | Arminia Bielefeld | arminia-bielefeld |
| 2 | VfL Bochum | bochum |
| 3 | Eintracht Braunschweig | eintracht-braunschweig |
| 4 | SV Darmstadt 98 | darmstadt |
| 5 | Dynamo Dresden | dynamo-dresden |
| 6 | Energie Cottbus | energie-cottbus |
| 7 | SpVgg Greuther Fürth | greuther-furth |
| 8 | Hannover 96 | hannover |
| 9 | 1. FC Heidenheim | heidenheim |
| 10 | Hertha BSC | hertha-berlin |
| 11 | Holstein Kiel | holstein-kiel |
| 12 | 1. FC Kaiserslautern | kaiserslautern |
| 13 | Karlsruher SC | karlsruher |
| 14 | 1. FC Magdeburg | magdeburg |
| 15 | 1. FC Nürnberg | nurnberg |
| 16 | VfL Osnabrück | osnabruck |
| 17 | FC St. Pauli | st-pauli |
| 18 | VfL Wolfsburg | wolfsburg |

---

## 🎨 Ranking Categories (6 Total)

Each jersey type × league combination gets its own independent ranking:

| # | Category | Jerseys |
|---|----------|---------|
| 1 | 🏠 Bundesliga — Home | 18 jerseys |
| 2 | ✈️ Bundesliga — Away | 18 jerseys |
| 3 | 🎽 Bundesliga — Third | 18 jerseys |
| 4 | 🏠 2. Bundesliga — Home | 18 jerseys |
| 5 | ✈️ 2. Bundesliga — Away | 18 jerseys |
| 6 | 🎽 2. Bundesliga — Third | 18 jerseys |

---

## 🛠️ Technical Implementation

### Architecture
- **Single-page app** using vanilla HTML/CSS/JavaScript
- **No framework** — lightweight and fast
- **Local storage** for persisting rankings
- **Data file** (`js/data.js`) containing all team info and image URLs

### File Structure
```
ranking/
├── plan.md                  # This plan document
├── index.html               # Main entry point
├── css/
│   └── styles.css           # All styles (design system + components)
├── js/
│   ├── app.js               # Main application logic
│   ├── data.js              # Team data with image URLs
│   ├── ranking.js           # Ranking logic + drag-and-drop
│   └── storage.js           # LocalStorage persistence
```

### UI Design
- **Dark mode** with glassmorphism cards
- **Tab navigation** to switch between 6 ranking categories
- **Jersey gallery view**: Grid of jersey cards showing team name + kit image
- **Ranking mode**: Drag-and-drop to reorder jerseys within a category
- **Position numbers** (1st, 2nd, 3rd…) displayed on ranked items
- **Smooth animations** on drag, reorder, and tab switch
- **Responsive**: Works on desktop and mobile
- **Filter/search**: Quick search to find a specific team

### Key Features
1. **Browse Mode**: View all jerseys in a category as a beautiful grid
2. **Rank Mode**: Drag-and-drop to rank jerseys from 1 to 18
3. **Persistence**: Rankings saved to localStorage automatically
4. **Reset**: Option to reset rankings per category or all
5. **Export**: Copy rankings as text (for sharing)

### Ranking Mechanism
- Each category starts with jerseys in alphabetical order (unranked)
- User drags jerseys to reorder them
- Rankings persist across page reloads via localStorage
- Each category is independently ranked

---

## 📋 Implementation Steps

### Phase 1: Data Collection ✅
- [x] Identify all 36 teams across both leagues
- [x] Confirm kit availability on FootballKitArchive for 26/27
- [x] Build `data.js` with complete team & image data (36 teams, 108 kits)

### Phase 2: Core UI ✅
- [x] Create `index.html` with semantic structure
- [x] Build design system in `styles.css` (colors, typography, spacing)
- [x] Implement dark mode with glassmorphism aesthetic
- [x] Create tab navigation for 6 categories
- [x] Build jersey card component

### Phase 3: Ranking Logic ✅
- [x] Implement drag-and-drop reordering (desktop + touch)
- [x] Add position numbering (gold/silver/bronze badges)
- [x] Build localStorage persistence layer
- [x] Add reset functionality
- [x] Add move up/down buttons

### Phase 4: Polish ✅
- [x] Add micro-animations (hover, drag, tab switch, card entry)
- [x] Implement search/filter (with Ctrl+F shortcut)
- [x] Add export/share feature (copies formatted text)
- [x] Responsive design (desktop, tablet, mobile)
- [x] Keyboard navigation (arrow keys for tabs)

---

## 🖼️ Image Strategy

Kit images need to be **manually saved** from FootballKitArchive (the site blocks automated scraping/hotlinking).

### How to add images:
1. Visit each team's kit page (links embedded in every card via ↗ button)
2. Right-click the kit image → "Save image as..."
3. Save to `images/bundesliga/` or `images/2bundesliga/` with the correct filename

### Filename convention:
```
images/bundesliga/{slug}-{kitType}.png
images/2bundesliga/{slug}-{kitType}.png
```

**Examples:**
- `images/bundesliga/bayern-munchen-home.png`
- `images/bundesliga/borussia-dortmund-away.png`
- `images/2bundesliga/hertha-berlin-third.png`

Until images are added, placeholder icons are shown with a link to view the kit on FootballKitArchive.

---

> **Status**: ✅ App complete and running at `http://localhost:3000`. Images need manual download from FootballKitArchive.
