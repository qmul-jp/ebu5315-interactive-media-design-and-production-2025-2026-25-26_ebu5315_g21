# EBU5315

## Group Number: 2026EBU5315G21

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
This repository contains shared files and section files for Homepage, Game, and Quiz.  
The structure will be further refined as the project develops in later versions.

- shared.css
- shared.js
- README.md

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
- **V4**: To be updated

### Shared Files

The project includes two shared files used across Homepage, Game, and Quiz.

**`shared.css`**
Provides common visual styles for the whole website, including:
* CSS Colour variables & Typography.
* Premium Apple-esque design (Glassmorphism & deep shadows).
* Appearance Themes (Light, Dark, Eye-Care).
* Accessibility Overrides (Brutal High Contrast, Enhanced Legibility, Reduced Motion).

**`shared.js`**
Provides common interactive functions for the whole website, including:
* Navigation routing and dropdown logic.
* UI engine for the Apple-style Settings modal (smooth sliding animations).
* `localStorage` management for persisting user preferences.
* Global event dispatcher (`languageChanged`) for seamless, no-reload bilingual switching and AI assistant integration.
Pages in each section should include both files:

```html
<link rel="stylesheet" href="shared.css" />
<script src="shared.js"></script>
