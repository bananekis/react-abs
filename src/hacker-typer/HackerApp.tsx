import { text } from "./text";
import React, { Component, useRef } from "react";

import styled from "styled-components";

// styles

const TextArea = styled.textarea`
  width: 95%;
  color: greenyellow;
  background-color: black;
  outline: none;
  border: none;
  font-size: 10px;
  height: 60vh;
  resize: none;
  overflow: scroll;
  font-size: 16px;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  @media (max-width: 900px) {
    margin-bottom: 6em;
  }
`;

const Divwrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1em;
`;

// types

type Props = {};
type State = {
  text: string;
  cut: number;
};

// main componennt

export class HackerApp extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      text: "",
      cut: 0,
    };
  }

  cutCharacters = (text: string) => {
    this.setState((prevState) => ({ cut: prevState.cut + 3 }));
    let cut = this.state.cut;
    cut += 3;

    this.setState({ text: text.substring(0, cut) });
  };

  render() {
    return (
      <Divwrapper>
        <TextArea
          onKeyPress={() => this.cutCharacters(text)}
          autoFocus
          value={this.state.text}
        ></TextArea>
      </Divwrapper>
    );
  }
}
