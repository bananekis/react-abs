import { countInArray } from "./countInArray";
import { deleteUnmatchedPairs } from "./deletePairs";
import { shuffle } from "./shuffleArray";
import { theme } from "./theme";
import { useEffect, useState } from "react";
import styled from "styled-components";

// styles
const DivMain = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 800px;
  height: 400px;
  margin: 0 auto;

  @media (max-width: 900px) {
    width: 100%;
    margin-bottom: 3em;
  }
`;

const DivMatched = styled.div`
  text-align: center;
  font-size: 16px;
  color: yellow;
  width: 200px;
  margin: 1.5em auto;
  padding: 5px;
`;

const DivFront = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 21%;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;

const DivCard = styled.div`
  position: relative;
  width: 20%;
  height: 20%;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 1s;
  border: 0.5px solid ${theme.white};

  margin: 0.5em;
`;

const DivBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${theme.black};
  backface-visibility: hidden;
  transform: rotateY(180deg);
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

// constants --------------------------------------------------

const valuesOfCards = [0, 1, 2, 3, 4, 5, 6, 7];
const WIN_VALUE = 8;

// get a pair of valuesOfCards and shuffle it
const playground = shuffle([...valuesOfCards, ...valuesOfCards]);

// -------------------------------------------------------------

type TypeMatch = {
  counter: number;
};

// main app

export function MemoryApp() {
  const [pairs, setPairs] = useState<number[]>([]);
  const [position, setPositions] = useState<number[]>([]);
  const [matched, setMatched] = useState<TypeMatch>({ counter: 0 });

  const handleClick = (index: number) => {
    let current_square = playground[index];

    // if already clicked or matched values do nothing

    if (pairs.includes(current_square) && position.includes(index)) return;

    setPositions((p) => {
      const unmatched = deleteUnmatchedPairs(pairs, position, index, p);
      return unmatched ? unmatched : [...p, index];
    });

    setPairs((p) => {
      const unmatched = deleteUnmatchedPairs(pairs, pairs, current_square, p);
      return unmatched ? unmatched : [...p, current_square];
    });
  };

  useEffect(() => {
    if (
      pairs.length % 2 === 0 &&
      countInArray(pairs, pairs[pairs.length - 1]) === 2 &&
      pairs.length !== 0
    ) {
      setMatched((p) => {
        return {
          ...p,
          counter: p.counter + 1,
        };
      });
    }
  }, [pairs]);

  return (
    <>
      <DivMatched>
        {matched.counter === WIN_VALUE
          ? "You guessed 'em all!"
          : `Number of matched pairs: ${matched.counter}`}
      </DivMatched>
      <DivMain>
        {playground.map((item, index) => {
          return (
            <DivCard
              onClick={() => handleClick(index)}
              key={index}
              style={{
                transform: position.includes(index)
                  ? "rotateY(0deg)"
                  : "rotateY(180deg)",
              }}
            >
              <DivFront>
                <Img src={require("./images/" + item + ".png").default} />
              </DivFront>
              <DivBack></DivBack>
            </DivCard>
          );
        })}
      </DivMain>
    </>
  );
}
