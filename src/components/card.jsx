import { useEffect, useState } from "react";

export default function Cards({
  gameDifficulty,
  handleClick,
  setGameState,
  gameState,
}) {
  const [data, setData] = useState([]);

  const numberOfCards =
    gameDifficulty === "easy" ? 6 : gameDifficulty === "medium" ? 9 : 12;
  const cardsSize =
    gameDifficulty === "easy" || gameDifficulty === "medium"
      ? "large"
      : "small";

  const randomNum = () => Math.floor(Math.random() * numberOfCards);

  const shuffleCards = () => {
    const shuffledData = [];
    const doesNumExist = [];

    for (let index = 0; index < numberOfCards; index++) {
      let num = randomNum();
      while (doesNumExist.includes(num)) {
        num = randomNum();
      }
      doesNumExist.push(num);
      shuffledData.push(data[num]);
    }

    return shuffledData;
  };

  useEffect(() => {
    const isLoading = gameState === "loading";
    if (isLoading) {
      getData(numberOfCards)
        .then((apiData) => setData(apiData))
        .then(() => setGameState("game-on"))
        .catch(() => setGameState("error"));
    }
  }, [gameState, numberOfCards, setGameState]);

  if (gameState === "loading") {
    return <LoadingScreen />;
  }

  return (
    <div className={`cards-container ${cardsSize}`}>
      {data.map((item) => (
        <Card
          key={item.id}
          data={item}
          handleClick={() => {
            handleClick(item.id);
            setData(shuffleCards());
          }}
        />
      ))}
    </div>
  );
}

function Card({ data, handleClick }) {
  const cardTitle = data.title?.english ?? data.title?.romaji;
  const cardImg = data.coverImage?.extraLarge ?? data.coverImage.large;
  return (
    <div className={`card-container`} onClick={() => handleClick(data.id)}>
      <img src={cardImg} alt={cardTitle} />
      <span className="font-bold bg-overlay">{cardTitle}</span>
    </div>
  );
}

function LoadingScreen() {
  return (
    <p className="loading-screen">
      Game is Loading
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </p>
  );
}

const randomScore = () => {
  const scores = [75, 80, 81, 82, 83, 84, 85, 87, 88, 89];
  const randomScoreNum = Math.floor(Math.random() * scores.length);
  return scores[randomScoreNum];
};
async function getData(numOfItems) {
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
    averageScore_greater: randomScore(),
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
    const parsedData = jsonData.data.Page.media;
    return parsedData;
  } catch (e) {
    throw new Error();
  }
}
