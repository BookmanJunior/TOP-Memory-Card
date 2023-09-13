export default function Card({ data, handleClick }) {
  const cardTitle = data.title?.english ?? data.title?.romaji;
  const cardImg = data.coverImage?.extraLarge ?? data.coverImage.large;
  return (
    <div className={`card-container`} onClick={() => handleClick(data.id)}>
      <img src={cardImg} alt={cardTitle} />
      <span className="font-bold bg-overlay">{cardTitle}</span>
    </div>
  );
}
