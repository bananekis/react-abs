import { Button } from "./Counter";

//  props
type Props = {
  handleDecrement: () => void;
};

// component

export const DecrementButton = (props: Props) => {
  return <Button onClick={props.handleDecrement}>-</Button>;
};
