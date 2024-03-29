# Tenzies Game
This is a game where you have to have ten identical dice to win. With each roll, the dice you haven't pressed change! If you press the wrong die, just click on it to deselect and roll it again. Once you win, your high score is saved to local storage.
Made with React JS.

Click here: 👉  [Tenzies-Game](https://elena-stoyanova-tenzies-game.netlify.app/)

## Table of contents

- [Overview](#overview)
  - [Instructions](#instructions)
  - [Run Locally](#RunLocally)
- [My process](#my-process)
  - [Added features](#added-features)
  - [Built with](#built-with)
  - [Useful resources](#useful-resources)

## Overview

### Instructions

- Roll until the dice are the same.
- Click each die to freeze it at its current value between rolls.
- You can undo holding the die by clicking/pressing it again.
- Try to match the dice quickly with the lowest amount of roll.

### Run Locally

Clone the project

```bash
  git clone https://github.com/Elena-Stoyanova/Tenzies-Game
```

Go to the project directory

```bash
  cd Tenzies-Game
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## My process

### Added features

- Stopwatch as a custom hook (build with setInterval() and Date.now())
- Create timeAndScore component to prevent re-render in Game.js
- Dots are made instead of numbers for each die
- API to take your IP address
- Custom logo (Figma is used)
- Custom hook for window width and height (the React Confetti needed to be responsive)
- Custom hook to format time
- Create a TopScore component where save your top score in local storage
- SVG file for background
- Popup
- Footer which navigates to my GitHub account

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Java Script
- [React](https://reactjs.org/) - JS library
- React Confetti
- React custom hooks
- Geolocation API
- Figma
- setInterval
- Date.now()
- react-uuid

### Useful resources

- [Scrimba's react crash course](https://scrimba.com/learn/learnreact) - This project idea was taken from Scrimba's react course from where I've been learning React.
- [stackOverFlow](https://stackoverflow.com/)
- [Google](https://google.com)
- [YouTube](https://www.youtube.com/)
