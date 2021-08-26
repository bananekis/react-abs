import { AllArticles } from "./AllArticles";
import { CreateArticle } from "./CreateArticle";
import { DetailArticles } from "./DetailArticles";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
  useLocation,
} from "react-router-dom";
import { theme } from "./theme";
import { useLocalStorage } from "./LocalStorage";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

// styles

const Nav = styled.nav`
  background-color: ${theme.yellow};
  padding: 5px;
  font-size: 20px;
  margin: 0 auto;

  @media (max-width: 900px) {
    font-size: 16px;
  }

  @media (max-width: 420px) {
    font-size: 11px;
    margin-bottom: 3em;
  }
`;

const Li = styled.li`
  list-style: none;
  display: flex;
`;

const A = styled(Link)`
  color: ${theme.black};
`;

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: center;

  ${Li}:not(:last-child) {
    margin-right: 1em;
  }
`;

// styles used across the entire app

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.white};
  margin-top: 2em;
  text-align: center;
  font-size: 17px;
`;

export const DivAllAWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  flex-wrap: wrap;
  width: 1500px;
  height: 100%;
  margin: 3em auto 0 auto;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const DivCard = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 20%;
  height: 20%;
  border: 3px solid ${theme.darkyellow};
  background-color: ${theme.yellow};
  margin: 0 3em 3em 3em;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const DivForm = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 0.5em;
`;

export const Input = styled.input`
  padding: 5px;
  margin-bottom: 1em;
  outline: none;
  text-align: center;
  font-size: 16px;
`;

export const Textarea = styled.textarea`
  height: 200px;
  font-size: 17px;
  outline: none;
`;

export const P = styled.p`
  width: 75%;
  word-wrap: break-word;
  text-align: center;
  border: 1px solid black;
  padding: 10px;
`;

export const H2 = styled.h2`
  margin: 0;
  text-align: center;
`;

export const H5 = styled.h5`
  margin: 0.3em 0 0 0;
  text-align: center;
`;

export const Button = styled.button`
  font-size: 15px;
  height: 38px;
`;

export const Form = styled.form`
  width: 80%;
`;

// types

type InputState = string;
type EventTarget =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;
type FormEvent =
  | React.FormEvent<HTMLInputElement>
  | React.FormEvent<HTMLFormElement>;
type ContextType = {
  urlOnChange: (e: EventTarget) => void;
  headerOnChange: (e: EventTarget) => void;
  textareaOnChange: (e: EventTarget) => void;
  handleSubmit: (e: FormEvent) => void;
  urlValue: string;
  headerValue: string;
  textareaValue: string;
  articles: Articles;
};

// types used across the entire app

export type Articles = {
  url: string[];
  header: string[];
  text: string[];
};

// constants

const LOCAL_VALUE = "articles";

//context
export const MainContext = React.createContext<ContextType>({
  urlOnChange: function () {},
  headerOnChange: function () {},
  textareaOnChange: function () {},
  handleSubmit: function () {},
  urlValue: "",
  headerValue: "",
  textareaValue: "",
  articles: { url: [], header: [], text: [] },
});

// main app

export const BlogApp = () => {
  // input typing states...

  const [url, setUrl] = useState<InputState>("");
  const [header, setHeader] = useState<InputState>("");
  const [textarea, setTextarea] = useState<InputState>("");

  const [articles, setArticles] = useLocalStorage(LOCAL_VALUE, {
    url: [],
    header: [],
    text: [],
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setArticles((p: Articles) => {
      return {
        url: [...p.url, url],
        header: [...p.header, header],
        text: [...p.text, textarea],
      };
    });

    setUrl("");
    setHeader("");
    setTextarea("");
  };

  return (
    <MainContext.Provider
      value={{
        urlOnChange: (e) => setUrl(e.target.value),
        headerOnChange: (e) => setHeader(e.target.value),
        textareaOnChange: (e) => setTextarea(e.target.value),
        handleSubmit: handleSubmit,
        urlValue: url,
        headerValue: header,
        textareaValue: textarea,
        articles: articles,
      }}
    >
      <Router>
        <Nav>
          <Ul>
            <Li>
              <A to="/blog/article-all">All articles</A>
            </Li>
            <Li>
              <A to="/blog/article-create">Create article</A>
            </Li>
            {articles.url.map((item: string, index: number) => {
              return (
                <Li key={index}>
                  <A to={`/blog/${item}`}>specific: {item}</A>
                </Li>
              );
            })}
          </Ul>
        </Nav>
        <Switch>
          <Route path="/blog/article-all">
            <AllArticles />;
          </Route>
          <Route path="/blog/article-create">
            <CreateArticle />;
          </Route>
          <Route path="/blog/:id">
            <DetailArticles />;
          </Route>
        </Switch>
      </Router>
    </MainContext.Provider>
  );
};
// function to get the unique position within array to display filtered blogs

export const getUniqueIndex = () => {
  const location = useLocation();
  const context = useContext(MainContext);

  let uniqueURLIndex = context.articles.url.indexOf(
    location.pathname.split("/")[2]
  );

  return uniqueURLIndex;
};
