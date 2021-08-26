import { Button } from "./Counter";

//  props

type Props = {
  handleIncrement: () => void;
};

// component

export const IncrementButton = (props: Props) => {
  return <Button onClick={props.handleIncrement}>+</Button>;
};
