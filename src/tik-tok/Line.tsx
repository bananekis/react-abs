import { Square } from "./Square";
import styled from "styled-components";

// styles

const Divflex = styled.div`
  display: flex;
`;

// types

type Props = {
  min: number;
};

export const Line = (props: Props) => {
  return (
    <Divflex>
      {Array.from({ length: 10 }, (item, index) => {
        return <Square index={index + props.min} key={Math.random()} />;
      })}
    </Divflex>
  );
};
