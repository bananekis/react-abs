import {
  DivAllAWrapper,
  DivCard,
  H2,
  H5,
  MainContext,
  P,
  getUniqueIndex,
} from "./BlogApp";
import { useContext } from "react";
import ReactMarkdown from "react-markdown";

// component

export const DetailArticles = () => {
  const context = useContext(MainContext);
  let uniqueIndex = +getUniqueIndex();

  return (
    <DivAllAWrapper>
      <DivCard>
        <H2>
          <ReactMarkdown>{context.articles.header[uniqueIndex]}</ReactMarkdown>
        </H2>
        <H5>URL: /{context.articles.url[uniqueIndex]}</H5>
        <P>
          Text:
          <ReactMarkdown>{context.articles.text[uniqueIndex]}</ReactMarkdown>
        </P>
      </DivCard>
    </DivAllAWrapper>
  );
};
