# Welcome Screen

- Let players choose difficulty
- 3 difficulty modes
  - easy
  - medium
  - hard
- Start game button
- State to store currently selected difficulty
  - Where to store the state? (Two possibilities: App component or Welcome Screen component)
- Difficulty
  - easy = 5 cards
  - medium = 10 cards
  - hard = 15 cards

## Start game button functionality

- Fetch data from Anilist GraphQl API
- Two options to get the right amount of cards from API
  - Pass difficulty as argument to API fetch function when its called ?
  - Get 15 cards regardless and use slice function on response ?
- Add loading screen while waiting for API response

## General functionality

- Shuffle cards on each successful click
- Add modal on game over and game won
