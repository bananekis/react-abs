// import "./App.css";
import { Counter } from "./counter/Counter";
import { History } from "./homepage/History";
import { TodoApp } from "./todo/TodoApp";
import Use from "./homepage/Use";
import github from "./GitHub-Mark.png";

import { BiMenu } from "react-icons/bi";
import { BlogApp } from "./blog/BlogApp";
import { CounterApp } from "./redux-counter/CounterApp";
import { HackerApp } from "./hacker-typer/HackerApp";
import {
  Link,
  NavLink,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { MemoryApp } from "./memory/MemoryApp";
import { NorrisApp } from "./chucknorris/NorrisApp";
import { TikTokApp } from "./tik-tok/TikTokApp";
import { theme } from "./todo/theme";
import styled from "styled-components";

// Styles

const DivImgWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 30px;
  position: sticky;
  top: 20px;

  @media (max-width: 900px) {
    align-items: center;
    justify-content: space-around;
  }
`;

const Nav = styled.nav`
  margin-bottom: 3em;
  margin-top: 3em;
`;

const Ul = styled.ul`
  justify-content: center;
  margin: 0;
  list-style: none;
  font-size: 25px;
  display: flex;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Li = styled.li`
  &:not(:last-child) {
    margin-right: 1em;
  }
`;

const H1 = styled.h1`
  color: ${theme.yellow};
  text-align: center;
`;

const A = styled(NavLink)`
  color: ${theme.white};

  &.selected {
    color: yellow;
  }
`;

const InputCheckbox = styled.input`
  display: none;
  &#click:checked + Nav > Ul {
    display: block;
  }
`;

const Label = styled.label`
  font-size: 26px;
  color: white;
  display: none;

  @media (max-width: 900px) {
    display: block;
  }
`;

// Component

export default function App() {
  return (
    <Router>
      <div>
        <DivImgWrapper>
          <Label htmlFor="click">
            <BiMenu />
          </Label>
          <a href="https://github.com/bananekis/react-abs">
            <img src={github} alt="github" />
          </a>
        </DivImgWrapper>

        <InputCheckbox type="checkbox" id="click" />
        <Nav>
          <Ul>
            <Li>
              <A activeClassName="selected" to="/" exact>
                Home
              </A>
            </Li>
            <Li>
              <A activeClassName="selected" to="/counter">
                Counter
              </A>
            </Li>
            <Li>
              <A activeClassName="selected" to="/todoapp">
                TodoApp
              </A>
            </Li>
            <Li>
              <A activeClassName="selected" to="/hacker-typer">
                Hacker-typer
              </A>
            </Li>
            <Li>
              <A activeClassName="selected" to="/tik-tok">
                Tik-Tok
              </A>
            </Li>
            <Li>
              <A activeClassName="selected" to="/memory">
                Memory Game
              </A>
            </Li>
            <Li>
              <A activeClassName="selected" to="/blog">
                Blog
              </A>
            </Li>
            <Li>
              <A activeClassName="selected" to="/chucknorris">
                Chuck Norris
              </A>
            </Li>
            <Li>
              <A activeClassName="selected" to="/counter-redux">
                Counter-redux
              </A>
            </Li>
          </Ul>
        </Nav>
        <Switch>
          <Route path="/counter">
            <H1>Counter</H1>
            <Counter />
          </Route>
          <Route path="/todoapp">
            <H1>Todo App</H1>
            <TodoApp />
          </Route>
          <Route path="/hacker-typer">
            <H1>Hacker Typer</H1>
            <HackerApp />
          </Route>
          <Route path="/tik-tok">
            <H1>Tik Tok Game</H1>
            <TikTokApp />
          </Route>
          <Route path="/memory">
            <H1>Memory Game</H1>
            <MemoryApp />
          </Route>
          <Route path="/blog">
            <H1>Blog</H1>
            <BlogApp />
          </Route>
          <Route path="/chucknorris">
            <H1>Chuck Norris</H1>
            <NorrisApp />
          </Route>
          <Route path="/counter-redux">
            <H1>Counter-redux</H1>
            <CounterApp />
          </Route>
          <Route path="/">
            <H1>Homepage</H1>
            <History />
            <Use />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
