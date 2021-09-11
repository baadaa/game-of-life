# Conway's Game of Life

A classic cellular automaton devised by British mathematician John Conway, implemented in JavaScript. In a nut-shell, it's a zero-player game in which cells will continue to evolve and multiply based on a simple set of mathematic rules. Read more from [Wikipedia entry here](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

### Live demo

https://bald-game-of-life.netlify.app

### Built with

- **Vanilla JavaScript for logic**
  - `/src/components/GameOfLife.js` contains all core progression logic and basic grid structure methods.
  - `/src/data/patterns.js` contains some of the well-known patterns for the game
- **Gatsby/React for scaffolding**
  - `useState` for all state management
  - `styled-components` for visual styling
  - CSS Custom Properties for reusable style values

### Why I built it

After reading John Maeda's blog article "[Life is just a big math problem](https://johnmaeda.medium.com/life-is-just-a-big-math-problem-7c4d823e088f)," I felt inspired to implement this mathematical simulation on my own. It turned out to be a good, fun JavaScript exercise for handling 2-dimensional matrices, and I felt pretty good about the result.

Granted, the code is messy and not something to study from, but hope this might be useful for someone someday. (Even if _that someone_ might be myself in the future.)
