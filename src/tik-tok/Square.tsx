import { Button, MainContext } from "./TikTokApp";
import { useContext } from "react";

// types

type Props = {
  index: number;
};

export const Square = (props: Props) => {
  const context = useContext(MainContext);

  return (
    <Button onClick={() => context.passClickFunc(props.index)}>
      {context.squares[props.index]}
    </Button>
  );
};
