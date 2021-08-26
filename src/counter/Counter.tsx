import { Component } from "react";
import { DecrementButton } from "./DecrementButton";
import { IncrementButton } from "./IncrementButton";
import { theme } from "./theme";
import styled from "styled-components";

// styles

const H1 = styled.h1`
  margin: 0.7em;
  color: ${theme.yellow};
`;

const Divwrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  height: 40px;
  width: 40px;
  background: white;
  outline: none;
  border: none;
  font-size: 20px;
`;

// state, props

type State = {
  count: number;
};

type Props = {};

// component

export class Counter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handleDecrement = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }));
  };
  handleIncrement = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  render() {
    return (
      <Divwrapper>
        <DecrementButton handleDecrement={this.handleDecrement} />
        <H1>{this.state.count}</H1>
        <IncrementButton handleIncrement={this.handleIncrement} />
      </Divwrapper>
    );
  }
}
