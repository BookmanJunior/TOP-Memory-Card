import { useEffect, useState } from "react";
import {
  gameStateOptions,
  Data,
  gameDifficultyOptions,
} from "../gameOptions.types";

type APIDataProps = {
  gameState: gameStateOptions;
  gameDifficulty: gameDifficultyOptions;
  setGameState: (status: gameStateOptions) => void;
  setData: (res: Data[]) => void;
};

const numberOfCards = {
  easy: 8,
  medium: 12,
  hard: 15,
} as const;

export default function APIData({
  gameState,
  setGameState,
  setData,
  gameDifficulty,
}: APIDataProps) {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (gameState === "loading") {
      const firstScore = getRandomScore(74, 89);
      const amountOfCards = numberOfCards[gameDifficulty];
      const extraCards = amountOfCards === 12 ? 3 : 6;

      // score of 89 doesn't return enough cards for medium and hard mode. Make second request to get extra cards
      if (firstScore >= 89) {
        const secondScore = getRandomScore(74, 88);

        const firstRequest = getData(amountOfCards, firstScore);
        const secondRequest = getData(extraCards, secondScore);

        Promise.all([firstRequest, secondRequest])
          .then((res) => setData(res.flat()))
          .then(() => setGameState("game-on"))
          .catch(() => {
            setError(true);
            setGameState("reloading");
          });

        return;
      }

      getData(amountOfCards, firstScore)
        .then((res) => setData(res))
        .then(() => setGameState("game-on"))
        .catch(() => {
          setError(true);
          setGameState("reloading");
        });
    }
  }, [gameState, gameDifficulty]);

  return { error, setError };
}

// anilist api lacks randomize, generate random score between desired min and maxScore score
function getRandomScore(minScore: number, maxScore: number): number {
  return Math.floor(Math.random() * (maxScore - minScore + 1)) + minScore;
}

async function getData(numOfItems: number, score: number) {
  // Here we define our query as a multi-line string
  // Storing it in a separate .graphql/.gql file is also possible
  const query = `
query ($page: Int, $perPage: Int, $averageScore_greater: Int) {
Page (page: $page, perPage: $perPage) {
  pageInfo {
    total
    currentPage
    lastPage
    hasNextPage
    perPage
  }
  media (averageScore_greater: $averageScore_greater, type: MANGA) {
    id
    title {
      romaji
      english
    }
    coverImage {
      extraLarge
      large
    }
}
}
}
`;

  // Define our query variables and values that will be used in the query request
  const variables = {
    averageScore_greater: score,
    page: 1,
    perPage: numOfItems,
  };

  // Define the config we'll need for our Api request
  const url = "https://graphql.anilist.co";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  };

  try {
    const response = await fetch(url, options);
    const jsonData = await response.json();
    return jsonData.data.Page.media;
  } catch (e) {
    throw new Error();
  }
}
