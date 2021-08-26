import { DivAllAWrapper, DivCard, H2, H5, MainContext, P } from "./BlogApp";
import { useContext } from "react";
import ReactMarkdown from "react-markdown";

// component

export const AllArticles = () => {
  const context = useContext(MainContext);

  return (
    <DivAllAWrapper>
      {context.articles.header.map((item, index) => {
        return (
          <DivCard key={index}>
            <H2>
              <ReactMarkdown>{item}</ReactMarkdown>
            </H2>
            <H5>URL: /{context.articles.url[index]}</H5>
            <P>
              Text:
              <ReactMarkdown>{context.articles.text[index]}</ReactMarkdown>
            </P>
          </DivCard>
        );
      })}
    </DivAllAWrapper>
  );
};
