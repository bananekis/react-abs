import { theme } from "./theme";
import styled from "styled-components";

// styles

const Span = styled.span`
  color: ${theme.white};
  margin-right: 1em;
`;

// types

type Props = {
  length: number;
};

// component

export const Length = (props: Props) => {
  return (
    <Span>
      <strong>{props.length} item(s) left</strong>
    </Span>
  );
};
