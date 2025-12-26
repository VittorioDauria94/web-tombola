import { useState } from "react";
import generateNumbers from "../components/generateNumber";

function App() {
  const [numbers, setNumbers] = useState(generateNumbers());
  const [extractNumber, setExtractNumber] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [pot, setPot] = useState(0);

  const prizeSplit = {
    ambo: 0.05,
    terna: 0.15,
    quaterna: 0.2,
    cinquina: 0.25,
    tombola: 0.35,
  };

  const prizes = {
    ambo: pot * prizeSplit.ambo,
    terna: pot * prizeSplit.terna,
    quaterna: pot * prizeSplit.quaterna,
    cinquina: pot * prizeSplit.cinquina,
    tombola: pot * prizeSplit.tombola,
  };

  function extractRandomNumber() {
    const availableNumbers = numbers.filter((n) => !n.extracted);

    if (availableNumbers.length === 0) {
      alert("Tutti i numeri sono stati estratti!");
      return;
    }

    setIsShaking(true);
    setExtractNumber("");

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const selected = availableNumbers[randomIndex];

      setExtractNumber(selected.value);

      setNumbers((prev) =>
        prev.map((n) =>
          n.value === selected.value ? { ...n, extracted: true } : n
        )
      );
      setIsShaking(false);
    }, 1200); // suspense (1.2s)
  }

  function resetGame() {
    setNumbers(generateNumbers());
    setExtractNumber("");
  }

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center">
        <h1 className="py-4 text-white vd-title">Tombola</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12 mb-4 mb-lg-0">
            <div className="vd-grid">
              {numbers.map((number) => (
                <span
                  key={number.value}
                  className={`vd-numbers ${
                    number.extracted ? "vd-extracted" : ""
                  }`}
                >
                  {number.value}
                </span>
              ))}
            </div>
          </div>
          <div className="col-lg-4 col-12 d-flex flex-column align-items-center">
            <h5>Ultimo numero estratto</h5>
            <div
              className={`vd-extract-number my-3 ${
                isShaking ? "vd-shake" : ""
              }`}
            >
              {extractNumber || "—"}
            </div>
            <button
              className="btn btn-warning mb-3"
              onClick={extractRandomNumber}
            >
              Estrai
            </button>
            <button className="btn btn-danger" onClick={resetGame}>
              Termina Gioco
            </button>
          </div>
        </div>
        <div className="vd-prize-box my-5">
          <h4 className="mb-3">Montepremi & Premi</h4>

          <div className="mb-3">
            <label className="form-label">Montepremi totale (€)</label>
            <input
              type="number"
              min="0"
              className="form-control"
              value={pot}
              onChange={(e) => setPot(Number(e.target.value))}
            />
          </div>

          <div className="vd-prizes">
            <div className="vd-prize-row">
              <span>Ambo (5%)</span>
              <strong>€ {prizes.ambo.toFixed(2)}</strong>
            </div>
            <div className="vd-prize-row">
              <span>Terna (15%)</span>
              <strong>€ {prizes.terna.toFixed(2)}</strong>
            </div>
            <div className="vd-prize-row">
              <span>Quaterna (20%)</span>
              <strong>€ {prizes.quaterna.toFixed(2)}</strong>
            </div>
            <div className="vd-prize-row">
              <span>Cinquina (25%)</span>
              <strong>€ {prizes.cinquina.toFixed(2)}</strong>
            </div>
            <div className="vd-prize-row vd-prize-highlight">
              <span>Tombola (35%)</span>
              <strong>€ {prizes.tombola.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
