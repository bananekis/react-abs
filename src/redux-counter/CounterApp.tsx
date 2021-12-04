import { Diverror, P } from "../chucknorris/NorrisApp";
import { RootState } from "..";
import { decrement, diversify, increment, power, square } from "./actions";
import { theme } from "./theme";
import { useDispatch, useSelector } from "react-redux";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styled from "styled-components";

// styles

const Div = styled.div`
  text-align: center;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 73%;
    margin: 0 auto;
  }

  @media (max-width: 420px) {
    width: 80%;
    margin: 10em auto 2em auto;
  }
`;

const DivFlex = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
`;

const Button = styled.button`
  outline: none;
  padding: 10px;
  width: 25%;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background: ${theme.darkRed};
  color: white;
  font-family: cursive;
`;

const Pdiv = styled.p`
  width: 75%;
  text-align: left;
  color: white;
  font-size: 18px;
  font-family: cursive;
  display: flex;
  align-items: center;

  @media (max-width: 420px) {
    font-size: 11px;
  }
`;

const PCounter = styled.p`
  background: ${theme.darkRed};
  border-radius: 5px;
  padding: 10px;
  font-size: 6em;
  font-family: cursive;
  color: white;
  margin: 1em auto 0.5em auto;
  word-break: break-all;
`;

const selectCounter = (state: RootState): number => state.counter.count;
const selectError = (state: RootState): string | null => state.counter.error;

export const CounterApp = () => {
  const counter = useSelector(selectCounter);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  return error === null ? (
    <Div>
      <PCounter>{counter}</PCounter>
      <DivFlex>
        <Pdiv>
          Increment by one <ArrowForwardIcon />
        </Pdiv>
        <Button onClick={() => dispatch(increment(1))}>click me!</Button>
      </DivFlex>
      <DivFlex>
        <Pdiv>
          Increment by two <ArrowForwardIcon />
        </Pdiv>
        <Button onClick={() => dispatch(increment(2))}>click me!</Button>
      </DivFlex>
      <DivFlex>
        <Pdiv>
          Decrement by one <ArrowForwardIcon />
        </Pdiv>
        <Button onClick={() => dispatch(decrement(1))}>click me!</Button>
      </DivFlex>
      <DivFlex>
        <Pdiv>
          Decrement by two <ArrowForwardIcon />
        </Pdiv>
        <Button onClick={() => dispatch(decrement(2))}>click me!</Button>
      </DivFlex>
      <DivFlex>
        <Pdiv>
          Divide by two <ArrowForwardIcon />
        </Pdiv>
        <Button onClick={() => dispatch(diversify(2))}>click me!</Button>
      </DivFlex>
      <DivFlex>
        <Pdiv>
          Power by two <ArrowForwardIcon />
        </Pdiv>
        <Button onClick={() => dispatch(power(2))}>click me!</Button>
      </DivFlex>
      <DivFlex>
        <Pdiv>
          Power by current state counter <ArrowForwardIcon />
        </Pdiv>
        <Button onClick={() => dispatch(power(counter))}>click me!</Button>
      </DivFlex>
      <DivFlex>
        <Pdiv>
          Square by two <ArrowForwardIcon />
        </Pdiv>
        <Button onClick={() => dispatch(square(2))}>click me!</Button>
      </DivFlex>
    </Div>
  ) : (
    <Diverror>error</Diverror>
  );
};
