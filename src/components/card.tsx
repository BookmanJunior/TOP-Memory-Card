import { Data, gameDifficultyOptions } from "../gameOptions.types";

type handleClick = (id: number) => void;

type CardsProps = {
  data: Data[];
  gameDifficulty: gameDifficultyOptions;
  handleClick: handleClick;
};

type CardProps = {
  data: Data;
  handleClick: handleClick;
};

const cardsSize = {
  easy: "large",
  medium: "large",
  hard: "small",
} as const;

export default function Cards({
  data,
  gameDifficulty,
  handleClick,
}: CardsProps) {
  return (
    <div className={`cards-container ${cardsSize[gameDifficulty]}`}>
      {data.map((item) => (
        <Card key={item.id} data={item} handleClick={handleClick} />
      ))}
    </div>
  );
}

function Card({ data, handleClick }: CardProps) {
  const cardTitle = data.title?.english ?? data.title?.romaji;
  const cardImg = data.coverImage?.extraLarge ?? data.coverImage.large;
  return (
    <div className={`card-container`} onClick={() => handleClick(data.id)}>
      <img src={cardImg} alt={cardTitle} />
      <span className="font-bold bg-overlay">{cardTitle}</span>
    </div>
  );
}
