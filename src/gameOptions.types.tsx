export type gameStateOptions =
  | "welcome-screen"
  | "loading"
  | "reloading"
  | "game-over"
  | "game-won"
  | "game-on";

export type gameDifficultyOptions = "easy" | "medium" | "hard" | "master";

export type Data = {
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  coverImage: {
    extraLarge: string;
    large: string;
  };
};
