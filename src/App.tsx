import { useState } from "react";
import styles from "./App.module.css";
import poweredImg from "./assets/img/powered.png";
import { levels, calculateImc, Level } from "./assets/utils/imc";
import leftArrow from "./assets/img/leftarrow.png";
import { GridItem } from "./components/GridItem/GridItem";
const App = () => {
  const [heightFild, setHeightField] = useState<number>(0);
  const [weigthFiled, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);
  const handleCalculateButton = () => {
    if (heightFild && weigthFiled) {
      setToShow(calculateImc(heightFild, weigthFiled));
    } else {
      alert("digite todos os campos");
    }
  };
  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  };
  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <h3>Calculadora IMC</h3>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>
            IMC é a sigla de Índice de massa corpórea. Parâmetro adotado pela
            Organização Mundial da Saúde para calcular o peso ideal de cada
            pessoa.
          </p>
          <input
            type={"number"}
            placeholder="Digite sua altura em metros EX: 1.90"
            value={heightFild > 0 ? heightFild : ""}
            onChange={(e) => setHeightField(parseFloat(e.target.value))}
          />
          <input
            type={"number"}
            placeholder="Digite seu peso em kg EX: 96"
            value={weigthFiled > 0 ? weigthFiled : ""}
            onChange={(e) => setWeightField(parseFloat(e.target.value))}
          />
          <button
            disabled={toShow ? true : false}
            onClick={handleCalculateButton}
          >
            Calcular
          </button>
        </div>
        <div className={styles.rigthSide}>
          {!toShow && (
            <div className={styles.grid}>
              {levels.map((item, index) => (
                <GridItem key={index} item={item} />
              ))}
            </div>
          )}
          {toShow && (
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrow} width={25} alt="" />
              </div>
              <GridItem item={toShow} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
