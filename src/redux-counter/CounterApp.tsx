import { Diverror, P } from "../chucknorris/NorrisApp";
import { RootState } from "..";
import { decrement, diversify, increment, power, square } from "./actions";
import { theme } from "./theme";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

// styles

const Div = styled.div`
  text-align: center;
  width: 400px;
  margin: 0 auto;

  @media (max-width: 420px) {
    width: 80%;
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
`;

const Pdiv = styled.p`
  width: 75%;
  text-align: left;
  color: ${theme.yellow};
  font-size: 18px;
`;

const selectCounter = (state: RootState): number => state.counter.count;
const selectError = (state: RootState): string | null => state.counter.error;

export const CounterApp = () => {
  const counter = useSelector(selectCounter);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  return error === null ? (
    <Div>
      <P>Counter {counter}</P>
      <DivFlex>
        <Pdiv>Increment by one</Pdiv>
        <Button onClick={() => dispatch(increment(1))}>add 1</Button>
      </DivFlex>
      <DivFlex>
        <Pdiv>Increment by two</Pdiv>
        <Button onClick={() => dispatch(increment(2))}>add 2</Button>
      </DivFlex>
      <DivFlex>
        <Pdiv>Decrement by one</Pdiv>
        <Button onClick={() => dispatch(decrement(1))}>sub 1</Button>
      </DivFlex>
      <DivFlex>
        <Pdiv>Decrement by two</Pdiv>
        <Button onClick={() => dispatch(decrement(2))}>sub 2</Button>
      </DivFlex>
      <DivFlex>
        <Pdiv>Divide by two</Pdiv>
        <Button onClick={() => dispatch(diversify(2))}>div 2</Button>
      </DivFlex>
      <DivFlex>
        <Pdiv>Power by two</Pdiv>
        <Button onClick={() => dispatch(power(2))}>pow 2</Button>
      </DivFlex>
      <DivFlex>
        <Pdiv>Power by current state counter</Pdiv>
        <Button onClick={() => dispatch(power(counter))}>pow counter</Button>
      </DivFlex>
      <DivFlex>
        <Pdiv>Square by two</Pdiv>
        <Button onClick={() => dispatch(square(2))}>sqrt</Button>
      </DivFlex>
    </Div>
  ) : (
    <Diverror>error</Diverror>
  );
};
