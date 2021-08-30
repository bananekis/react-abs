import { theme } from "./theme";
import { useState } from "react";
import image from "./js-logo.png";
import load from "./loading.svg";
import styled from "styled-components";

export const DivContainer = styled.div`
  max-width: 1140px;
  display: block;
  margin: 0 auto;
`;

export const DivImg = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const DivRow = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
    width: 95%;
    margin: 0 auto;
    text-align: center;
  }
`;

export const DivCol1 = styled.div`
  width: 100%;
  text-align: inherit;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const DivCol2 = styled.div`
  width: 100%;
  padding: 10px;
  text-align: center;
`;

export const DivCol2Last = styled.div`
  width: 100%;
  padding: 10px;
  text-align: center;
  padding: 0 40px 40px 40px;

  @media (max-width: 900px) {
    padding: 0;
  }
`;

export const DivCol3 = styled.div`
  width: 33.333333333%;
  padding: 0 40px 40px 40px;
  text-align: center;

  @media (max-width: 900px) {
    width: 100%;
    padding: 0;
  }
`;

export const DivBox = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid yellow;
  margin-bottom: 3em;

  @media (max-width: 900px) {
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }
`;

export const H1 = styled.h1`
  text-align: center;
  color: ${theme.yellow};

  @media (max-width: 900px) {
    font-size: 20px;
  }
`;

export const H2 = styled.h2`
  color: ${theme.yellow};
`;

export const Strong = styled.strong`
  color: ${theme.yellow};
`;

export const Img = styled.img<{ isLoader: boolean }>`
  width: 10%;
  margin-bottom: 40px;
  display: ${(props) => (props.isLoader === true ? "none" : "block")};

  @media (max-width: 900px) {
    width: 33%;
  }
`;

export const P = styled.p`
  color: ${theme.white};
  font-size: 20px;
  letter-spacing: 0.5px;
  line-height: 23px;
  word-spacing: 0.5px;
  padding: 20px;
`;

export function History() {
  const [loader, setLoader] = useState(true);

  const imageLoaded = () => {
    setLoader(false);
  };

  return (
    <DivContainer>
      <H1>History of Javascript</H1>
      <DivImg>
        <Img
          src={image}
          alt="js-logo"
          isLoader={loader}
          style={{ display: loader === true ? "none" : " block" }}
          onLoad={imageLoaded}
        />
        {loader === true ? "loading..." : null}
      </DivImg>
      <DivRow>
        <DivCol1>
          <P>
            JavaScript is a scripting language that is one of the three core
            languages used to develop websites. Whereas{" "}
            <Strong>HTML and CSS</Strong> give a website structure and style,
            JavaScr ipt lets you add functionality and behaviors to your
            website, allowing your website’s visitors to interact with content
            in many imaginative ways.
          </P>
        </DivCol1>
        <DivCol1>
          <P>
            JavaScript is primarily a client-side language, meaning it runs on
            your computer within your browser. However, more recently the
            introduction of Node.js has allowed JavaScript to also execute code{" "}
            <Strong>on servers.</Strong>
          </P>
        </DivCol1>
      </DivRow>
      <DivBox>
        <DivCol2>
          <P>
            Since its release, JavaScript has surpassed Java, Flash, and other
            languages because it is relatively easy to learn, has a free and
            open community, and, most importantly, is incredibly useful,
            allowing developers to quickly create apps with audiences in the
            millions.
          </P>
          <H1>
            Uses of Javascript <br />
            &#8595;
          </H1>
        </DivCol2>
      </DivBox>
    </DivContainer>
  );
}

export default History;
