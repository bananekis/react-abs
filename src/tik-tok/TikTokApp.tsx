// import { Playground } from "./Playground";
import { Playground } from "./Playground";
import { theme } from "./theme";
import React, { useState } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import styled from "styled-components";

// styles

const Divwrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto;
`;

const P = styled.p`
  color: ${theme.white};
  font-size: 22px;
  width: 31%;
  background: ${theme.darkRed};
  border-radius: 5px;
  padding: 10px;

  @media (max-width: 768px) {
    width: 45%;
  }

  @media (max-width: 420px) {
    font-size: 13px;
  }
`;

export const Button = styled.button`
  outline: none;
  border: 0.5px solid ${theme.black};
  padding: 15px;
  font-weight: 500;
  font-size: 20px;
  width: 3.5em;
  height: 3.5em;

  @media (max-width: 900px) {
    width: 3em;
    height: 3em;
    display: flex;
    justify-content: center;
    line-height: 1;
  }

  @media (max-width: 420px) {
    width: 1em;
    height: 1em;
  }

  @media (max-width: 420px) {
    padding: 13px;
  }
`;

export const ButtonRestart = styled.button`
  outline: none;
  padding: 10px;
  background: transparent;
  border: 1px solid yellow;
  color: ${theme.white};
  cursor: pointer;
  margin-bottom: 3em;
`;

const DivPlayground = styled.div`
  @media (max-width: 900px) {
    margin-bottom: 3em;
  }
`;

const DivInfo = styled.div`
  display: flex;
  margin: 3em 0;
  width: 100%;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 420px) {
    margin: 10em auto 2em auto;
  }
`;

// types
type Squares = ("X" | "O" | null)[];

type Playground = {
  squares: Squares;
  signX: boolean;
};

type ContextType = {
  squares: Squares;
  passClickFunc: (i: number) => void;
};

// context

export const MainContext = React.createContext<ContextType>({
  squares: [],
  passClickFunc: function () {},
});

// constants
const ARR_LENGTH = 100;

// main component

export function TikTokApp() {
  const [playground, setPlayground] = useState<Playground>({
    squares: Array(ARR_LENGTH).fill(null),
    signX: true,
  });

  const handleClick = (i: number) => {
    setPlayground((p) => {
      const squares = p.squares.slice();
      const unchangedState = {
        squares: squares,
        signX: playground.signX,
      };

      if (squares[i] !== null || calculateWinner(squares))
        return unchangedState;

      squares[i] = playground.signX ? "X" : "O";

      return {
        ...p,
        squares: squares,
        signX: !playground.signX,
      };
    });
  };

  const handleRestartGame = () => {
    setPlayground((p) => ({
      ...p,
      squares: Array(ARR_LENGTH).fill(null),
      signX: true,
    }));
  };

  return (
    <Divwrapper>
      <DivInfo>
        {calculateWinner(playground.squares) ? (
          <P>Player {calculateWinner(playground.squares)} wins</P>
        ) : (
          <P>Currently is playing player {playground.signX ? "X" : "O"}</P>
        )}
        <RestartAltIcon
          onClick={handleRestartGame}
          style={{ color: theme.white, fontSize: "3em", cursor: "pointer" }}
        />
      </DivInfo>
      <DivPlayground>
        <MainContext.Provider
          value={{ squares: playground.squares, passClickFunc: handleClick }}
        >
          <Playground />
        </MainContext.Provider>
      </DivPlayground>
    </Divwrapper>
  );
}

// algorithm to calculate the winner

function calculateWinner(squares: Squares) {
  // ----------------------------
  // RD = right diagonal
  // LD = left diagonal
  // CL = column direction
  // RW = row direction
  // ----------------------------

  // all clicked squares
  let clickedSquares: number[] = [];

  // diagonal arrays
  let rightDiagonal: number[] = [];
  let leftDiagonal: number[] = [];
  let columnArray: number[] = [];
  let rowArray: number[] = [];

  // numbers that define which direction the current clicked signes are using
  const RD_DIRECTION = 11;
  const LD_DIRECTION = 9;
  const CL_DIRECTION = 10;
  const RW_DIRECTION = 1;

  // get indexes of clicked squares only

  for (let i = 0; i < squares.length; i++) {
    if (squares[i] !== null) {
      clickedSquares.push(i);
    }
  }

  // push squares to new array depending on direction

  for (let i = 0; i < clickedSquares.length; i++) {
    for (let x = 0; x < clickedSquares.length; x++) {
      if (clickedSquares[x] + RD_DIRECTION === clickedSquares[i]) {
        rightDiagonal.push(clickedSquares[x], clickedSquares[i]);
      } else if (clickedSquares[x] + LD_DIRECTION === clickedSquares[i]) {
        leftDiagonal.push(clickedSquares[x], clickedSquares[i]);
      } else if (clickedSquares[x] + CL_DIRECTION === clickedSquares[i]) {
        columnArray.push(clickedSquares[x], clickedSquares[i]);
      } else if (clickedSquares[x] + RW_DIRECTION === clickedSquares[i]) {
        rowArray.push(clickedSquares[x], clickedSquares[i]);
      }
    }
  }

  // filter each diagonal array direction to get unique values

  const uniqueArrayRD = arrayUnique(rightDiagonal);
  const uniqueArrayLD = arrayUnique(leftDiagonal);
  const uniqueArrayCL = arrayUnique(columnArray);
  const uniqueArrayRW = arrayUnique(rowArray);

  // get count of same signs within specific direction

  const arrayOfSignsRD = getArrayOfSigns(uniqueArrayRD, squares, RD_DIRECTION);
  const arrayOfSignsLD = getArrayOfSigns(uniqueArrayLD, squares, LD_DIRECTION);
  const arrayOfSignsCL = getArrayOfSigns(uniqueArrayCL, squares, CL_DIRECTION);
  const arrayOfSignsRW = getArrayOfSigns(uniqueArrayRW, squares, RW_DIRECTION);

  // check if any sign is equal to WIN_NUMBER to calculate the winner

  const winRD = checkLenghtOfSameSigns(arrayOfSignsRD, RD_DIRECTION, squares);
  const winLD = checkLenghtOfSameSigns(arrayOfSignsLD, LD_DIRECTION, squares);
  const winCL = checkLenghtOfSameSigns(arrayOfSignsCL, CL_DIRECTION, squares);
  const winRW = checkLenghtOfSameSigns(arrayOfSignsRW, RW_DIRECTION, squares);

  if (winRD !== null) return winRD;
  else if (winLD !== null) return winLD;
  else if (winCL !== null) return winCL;
  else if (winRW !== null) return winRW;

  return null;
}

//----------------------------- FUNCTIONS -----------------------------

function arrayUnique(array: number[]) {
  return array.filter((value, index) => array.indexOf(value) === index);
}
function getArrayOfSigns(
  uniqueArray: number[],
  squares: (null | "X" | "O")[],
  counter: number
) {
  let signsArray: number[] = [];

  for (let y = 0; y < uniqueArray.length; y++) {
    for (let x = 0; x < uniqueArray.length; x++) {
      if (
        uniqueArray[x] === uniqueArray[y] + counter &&
        squares[uniqueArray[x]] === squares[uniqueArray[x] - counter]
      ) {
        signsArray.push(uniqueArray[y], uniqueArray[x]);
      }
    }
  }

  return arrayUnique(signsArray);
}

// function to check if the same signs located in any direction equals to WIN_NUMBER

function checkLenghtOfSameSigns(
  signArray: number[],
  counter: number,
  squares: Squares
) {
  let count = 1;
  let max = signArray[0] - counter;

  const WIN_NUMBER = 4;

  for (let y = 0; y < signArray.length; y++) {
    max = max + counter;

    if (signArray.includes(max)) {
      squares[max] === squares[max + counter] ? count++ : (count = 1);
      if (count === WIN_NUMBER) return squares[max];
    } else {
      y--;

      count = 1;
      max = signArray[y] - counter;
    }
  }
  return null;
}
