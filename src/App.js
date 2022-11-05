import Container from "./components/Container";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import React, { useState } from "react";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const noSpaces = (num) => num.toString().replace(/\s/g, "");


const App = () => {
    
  let [calculator, setCalculator] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalculator({
      ...calculator,
      num: !calculator.num.toString().includes(".") ? calculator.num + value : calculator.num,
    });
  };


  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (noSpaces(calculator.num).length < 16) {
      setCalculator({
        ...calculator,
        num:
          calculator.num === 0 && value === "0"
            ? "0"
            : noSpaces(calculator.num) % 1 === 0
            ? toLocaleString(Number(noSpaces(calculator.num + value)))
            : toLocaleString(calculator.num + value),
        res: !calculator.sign ? 0 : calculator.res,
      });
    }
  };

  

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalculator({
      ...calculator,
      sign: value,
      res: !calculator.res && calculator.num ? calculator.num : calculator.res,
      num: 0,
    });
  };
     

  const invertClickHandler = () => {
    setCalculator({
      ...calculator,
      num: calculator.num ? toLocaleString(noSpaces(calculator.num) * -1) : 0,
      res: calculator.res ? toLocaleString(noSpaces(calculator.res) * -1) : 0,
      sign: "",
    });
  };

  const equalsClickHandler = () => {
    if (calculator.sign && calculator.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

      setCalculator({
        ...calculator,
        res:
          calculator.num === "0" && calculator.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(noSpaces(calculator.res)),
                  Number(noSpaces(calculator.num)),
                  calculator.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  
  const percentClickHandler = () => {
    let num = calculator.num ? parseFloat(noSpaces(calculator.num)) : 0;
    let res = calculator.res ? parseFloat(noSpaces(calculator.res)) : 0;

    setCalculator({
      ...calculator,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalculator({
      ...calculator,
      sign: "",
      num: 0,
      res: 0,
    });
  };


  return (
    <Container>
      <Screen value={calculator.num ? calculator.num : calculator.res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                  ? invertClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Container>
  );
};

export default App