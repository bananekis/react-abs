import { Button, MainContext } from "./TikTokApp";
import { useContext } from "react";
import styled from "styled-components";

// styles

const PButton = styled.p`
  font-size: 1.5em;
  display: flex;
  margin: 0;
  justify-content: center;

  @media (max-width: 420px) {
    line-height: 0;
    font-size: 0.8em;
  }
`;

// types

type Props = {
  index: number;
};

export const Square = (props: Props) => {
  const context = useContext(MainContext);

  return (
    <Button onClick={() => context.passClickFunc(props.index)}>
      <PButton>{context.squares[props.index]}</PButton>
    </Button>
  );
};
