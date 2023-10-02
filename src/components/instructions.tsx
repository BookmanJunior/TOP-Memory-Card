import { useEffect } from "react";

type InstructionsProps = {
  isActive: boolean;
  setIsActive: (arg0: boolean) => void;
};

export default function Instructions({
  isActive,
  setIsActive,
}: InstructionsProps) {
  const handleOutsideClick = (e: any) => {
    if (e.target.matches(".instructions-container")) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    localStorage.setItem("isFirstLoad", JSON.stringify("false"));
  }, []);

  return (
    <div
      className={`instructions-container modal-container ${
        isActive ? "active" : ""
      } bg-overlay font-bold`}
      onClick={handleOutsideClick}
    >
      <div className="instructions-content flex-column box">
        <ul className="instructions-list">
          <li>Click on a card to increase your score.</li>
          <li>Cards shuffle on each click.</li>
          <li>If you click on the same card twice you lose.</li>
          <li>Click on each card once to win.</li>
        </ul>
        <button className="hover-underline" onClick={() => setIsActive(false)}>
          OK
        </button>
      </div>
    </div>
  );
}
