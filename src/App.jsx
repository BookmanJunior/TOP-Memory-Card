import { useEffect, useState } from "react";
import WelcomeScreen from "./components/welcomeScreen";
import Card from "./components/card";
import Modal from "./components/modal";
import { ReactComponent as ArrowLeft } from "./assets/arrow-left.svg";

export default function App() {
  const [gameState, setGameState] = useState("welcome-screen");
  const [gameDifficulty, setGameDifficulty] = useState("easy");
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [data, setData] = useState();
  const [clickedCards, setClickedCards] = useState([]);

  const isWelcomeScreen = gameState === "welcome-screen";
  const isLoading = gameState === "loading";
  const numberOfCards =
    gameDifficulty === "easy" ? 6 : gameDifficulty === "medium" ? 9 : 12;
  const cardsSize =
    gameDifficulty === "easy" || gameDifficulty === "medium"
      ? "large"
      : "small";

  const handleGameMode = (mode) => {
    setGameDifficulty(mode);
  };

  const handleGameState = (state) => {
    setGameState(state);
  };

  const handleCardClick = (id) => {
    if (gameState !== "game-on") {
      return;
    }

    if (clickedCards.includes(id)) {
      setClickedCards([]);
      setGameState("game-over");
      return;
    }
    setClickedCards([...clickedCards, id]);
    setScore((prev) => prev + 1);
    const shuffledData = shuffleCards();
    setData(shuffledData);
  };

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
    if (score > topScore) {
      setTopScore(score);
    }
  }, [score, topScore]);

  useEffect(() => {
    if (score >= numberOfCards) {
      setGameState("game-won");
      setClickedCards([]);
    }
  }, [score, numberOfCards]);

  useEffect(() => {
    const randomScore = () => {
      const scores = [75, 80, 82, 85, 87, 88, 89];
      const randomScoreNum = Math.floor(Math.random() * scores.length);
      return scores[randomScoreNum];
    };

    async function getCharacters(numOfItems, queryScore) {
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
        averageScore_greater: queryScore,
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
        setData(parsedData);
        setGameState("game-on");
        return jsonData;
      } catch (error) {
        return console.log(error);
      }
    }
    if (isLoading) {
      getCharacters(numberOfCards, randomScore());
    }
  }, [isLoading, gameDifficulty, numberOfCards]);

  if (isLoading) {
    return (
      <p className="loading-screen">
        Game is Loading
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </p>
    );
  }

  return (
    <>
      <Modal
        gameState={gameState}
        score={score}
        handleClick={() => {
          handleGameState("loading");
          setScore(0);
        }}
      />
      {isWelcomeScreen && (
        <WelcomeScreen cb={handleGameMode} gameDifficulty={gameDifficulty}>
          <button
            className="hover-underline"
            onClick={() => handleGameState("loading")}
          >
            Start Game
          </button>
        </WelcomeScreen>
      )}
      {!isWelcomeScreen && (
        <>
          <div className="top-screen flex-row">
            <button
              className="back-btn"
              onClick={() => {
                handleGameState("welcome-screen");
                setScore(0);
                setData([]);
              }}
            >
              <ArrowLeft />
            </button>
            <div className="score-container">
              <p className="current-score">Current Score: {score}</p>
              <p className="top-score">Top Score: {topScore}</p>
            </div>
          </div>
          <div className={`cards-container ${cardsSize}`}>
            {data.map((item) => (
              <Card key={item.id} data={item} handleClick={handleCardClick} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
