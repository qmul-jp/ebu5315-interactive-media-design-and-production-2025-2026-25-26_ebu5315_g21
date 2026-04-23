# EBU5315

## Group Number: 25/26_EBU5315_G21

## Project Title: Circle Conquer: Play & Learn Geo Theorems

## Members:

Yining Qin, 2024213629, 241118382, 3029970043@qq.com

Yafei Yang, 2024213628, 241118692, 1662060048@qq.com

Yiran Fan, 2024213630, 241118027, van52985@foxmail.com

## Assigned TA: Wenyue Tong

## Task Allocation:

1. Homepage: Yining Qin
   
2. Game: Yafei Yang
   
3. Quiz: Yiran Fan

## Project Overview
Circle Conquer: Play & Learn Geo Theorems is a static interactive educational website designed to support GCSE circle theorem learning through visual explanation, gameplay, and quiz-based practice.

This project aims to make GCSE circle theorem learning more interactive, engaging, and visually accessible for teenage learners through a browser-based educational website.

The website is built with **HTML, CSS, and JavaScript only**, with no server or database required.

## Project Features
- Clear navigation across Homepage, Game, and Quiz
- Interactive learning experience for circle theorems
- Progress-based game structure
- Theorem collection and progress tracking
- Quiz-based knowledge checking
- Shared visual and accessibility settings
- Static front-end website structure

## Technologies Used
- HTML
- CSS
- JavaScript
- GitHub

## Repository Structure

The project is modularly structured. `shared.js` and `shared.css` form the core foundation used by all team members to ensure consistent styling, accessibility, and navigation. The three main functional sections (Homepage, Game, and Quiz) are developed independently on top of this foundation with their own specific files.

### 1. Shared Foundation
All pages include these files to maintain a consistent global user experience:
* **`shared.css`**: Defines global visual standards, including CSS variables, typography, and an Apple-style glassmorphism design. It also contains overrides for appearance themes (Light, Dark, Eye-Care) and accessibility features (Brutal High Contrast, Enhanced Legibility, Reduced Motion).
* **`shared.js`**: Provides global interactive logic, including navigation routing, the UI engine for the Settings modal, and persistent user preference management via `localStorage`. It utilizes global event listeners to enable seamless, no-reload bilingual switching and AI assistant integration.

### 2. Homepage Section (by Yining Qin)
* **`homepage.html`**: The main landing page, featuring interactive SVG carousels to visually demonstrate core circle theorem concepts.

### 3. Game Section (by Yafei Yang)
* **`gamehome.html`**: The main entry point for the game, featuring an 8-room quest map, progress tracking (star system), and archive unlock status.
* **`play.html`**: The core level page containing the interactive SVG puzzle rooms, puzzle console, and real-time feedback system.
* **`theorems.html`**: The theorem archive, which progressively unlocks detailed geometric properties and dynamic demonstrations as the user clears rooms.
* **`complete.html`**: The final completion screen, showcasing achievements and guiding users to the full archive.
* **`game.css`**: Specific styling for game-specific UI, mission strips, puzzle consoles, and level feedback effects.
* **`script.js`**: The core game engine, handling SVG point-dragging algorithms, real-time geometric theorem validation, timers, confetti particle effects, and the Web Audio API sound effect engine.

### 4. Quiz Section (by Yiran Fan)
* **`index.html`**: The main interface for the knowledge quiz module.
* **`main.css`**: Specific styling for quiz layouts and question cards.
* **`main.js`**: The logic engine handling quiz interactions, progress control, and result calculations.
* **`api.js`**: Manages the dynamic retrieval and handling of the question bank data.

## Version Control
Each team member works on their own branch and contributes to the project through GitHub version control.

Major updates are developed in individual branches before being merged into the main branch for version releases.

## Development Progress
- **V1**: Initial development version. In this version, each team member built the basic framework for their own section separately. The three sections had not yet been fully connected.
- **V2**: Added bilingual switching between English and Chinese, completed navigation links across the Homepage, Game, and Quiz sections, and deployed the AI assistant across all pages as a floating widget in the bottom right corner.  
- **V3**: Premium UI & Game Feel Enhancement**
  * **Settings Persistence:** Added `localStorage` (cookies) to automatically save language, theme, and accessibility preferences across all pages.
  * **Apple-esque UI:** Redesigned the Settings modal with iOS-style glassmorphism, smooth segmented controls, and animated toggle switches.
  * **Game Audio:** Introduced a dynamic Web Audio API engine with sound effects for dragging, success, errors, and system lockdown.
- **V4**: Final Integration & Polish
  * **Seamless Routing:** Comprehensive system adjustments to ensure smooth, instantaneous transitions and consistent navigation states across the Homepage, Game, and Quiz sections.
  * **Overall Optimization:** Final codebase refactoring, alignment of UI details across all modules, and overall performance optimization for a cohesive user experience.
