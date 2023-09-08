export default function Card({ data, handleClick }) {
  const cardTitle = data.title?.english ?? data.title?.romaji;
  return (
    <div className="card-container" onClick={() => handleClick(data.id)}>
      <img src={data.coverImage.extraLarge} alt={cardTitle} />
      <p>{cardTitle}</p>
    </div>
  );
}
