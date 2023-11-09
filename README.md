# Tenzies Game
It's a dice game where you have to have ten identical dice to win. With each roll, the dice you haven't pressed changes! If your pressed dice are different, you must undo holding die by clicking it again and keep rolling until they are all the same. After you win, your best score is saved to local storage.
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

- Roll untill the dice are the same.
- Click each die to freeze it at its current value between rolls.
- You can undo holding die by clicking/pressing it again.
- Try to match the dice quickly with lowest amount of roll.

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
- Create timeAndScore component to prevent re render in Game.js
- Dots are made instead of numbers for each die
- API to take your IP adress
- Custom logo (Figma is used)
- Custom hook for window width and height (it was necessary for the React Confetti to be responsive)
- Custom hook to format time
- Create TopScore component where save your top score in local storage
- SVG file for background
- Popup
- Footer which navigates to my github account

### Built with

- HTML
- CSS
- JavaScript
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
