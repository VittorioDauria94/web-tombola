import { useState } from "react";
import generateNumbers from "../components/generateNumber";

function App() {
  const [numbers, setNumbers] = useState(generateNumbers());
  const [extractNumber, setExtractNumber] = useState("");

  function extractRandomNumber() {
    const availableNumbers = numbers.filter((n) => !n.extracted);

    if (availableNumbers.length === 0) {
      alert("Tutti i numeri sono stati estratti!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const selected = availableNumbers[randomIndex];

    setExtractNumber(selected.value);

    setNumbers((prev) =>
      prev.map((n) =>
        n.value === selected.value ? { ...n, extracted: true } : n
      )
    );
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
            <div className="vd-extract-number my-3">{extractNumber}</div>
            <button className="btn btn-light" onClick={extractRandomNumber}>
              Estrai numero
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
