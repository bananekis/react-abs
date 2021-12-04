import { BlogApp } from "./blog/BlogApp";
import { CounterApp } from "./redux-counter/CounterApp";
import { HackerApp } from "./hacker-typer/HackerApp";
import { MemoryApp } from "./memory/MemoryApp";
import {
  NavLink,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { NorrisApp } from "./chucknorris/NorrisApp";
import { TikTokApp } from "./tik-tok/TikTokApp";
import { TodoApp } from "./todo/TodoApp";
import { theme } from "./todo/theme";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import blog from "./assets/blog.png";
import counter from "./assets/counter.png";
import github from "./GitHub-Mark.png";
import hackertyper from "./assets/hackertyper.png";
import norris from "./assets/chuckNorris.png";
import pexeso from "./assets/pexeso.png";
import styled from "styled-components";
import tikTok from "./assets/tik-tok.png";
import todoList from "./assets/todolist.png";

// Styles

const DivImgWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 30px;
  position: absolute;
  top: 0px;
  right: 0;
  flex-direction: column;

  @media (max-width: 900px) {
    align-items: center;
    justify-content: space-around;
  }
`;

const Nav = styled.nav`
  margin-bottom: 3em;
  margin-top: 3em;
  display: flex;
  width: 100%;
  margin: 5em auto;
`;

const Ul = styled.ul`
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 25px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const Li = styled.li`
  width: 25%;
  display: flex;
  text-align: center;
  margin: 10px;
  justify-content: center;
  @media (max-width: 1024px) {
    justify-content: center;
    width: 47%;
  }

  @media (max-width: 768px) {
    width: 60%;
  }
`;

const A = styled(NavLink)`
  color: ${theme.white};
  text-decoration: none;

  &.selected {
    color: yellow;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 40vh;

  @media (max-width: 420px) {
    width: 14em;
    height: 17em;
  }

  @media (max-width: 320px) {
    width: 11em;
    height: 12em;
  }
`;

const PTitle = styled.p`
  font-family: cursive;
`;

// Component

export default function App() {
  const location = useLocation();
  const history = useHistory();

  return (
    <div>
      <DivImgWrapper>
        <a
          href="https://github.com/bananekis/react-abs"
          style={{ marginBottom: "2em" }}
        >
          <img src={github} alt="github" />
        </a>
        {location.pathname !== "/" && (
          <ArrowBackIosNewIcon
            onClick={() => history.push("/")}
            style={{ color: "white", fontSize: "2em", cursor: "pointer" }}
          />
        )}
      </DivImgWrapper>

      {location.pathname === "/" && (
        <Nav>
          <Ul>
            <Li>
              <A activeClassName="selected" to="/todoapp">
                <PTitle>Todo List</PTitle>
                <Img src={todoList} alt="" />
              </A>
            </Li>
            <Li>
              <A activeClassName="selected" to="/hacker-typer">
                <PTitle>Hacker Typer</PTitle>
                <Img src={hackertyper} alt="" />
              </A>
            </Li>
            <Li>
              <A activeClassName="selected" to="/tik-tok">
                <PTitle>Tik-Tok</PTitle>
                <Img src={tikTok} alt="" />
              </A>
            </Li>
            <Li>
              <A activeClassName="selected" to="/memory">
                <PTitle>Pexeso</PTitle>
                <Img src={pexeso} alt="" />
              </A>
            </Li>
            <Li>
              <A activeClassName="selected" to="/blog">
                <PTitle>Blog</PTitle>
                <Img src={blog} alt="" />
              </A>
            </Li>
            <Li>
              <A activeClassName="selected" to="/chucknorris">
                <PTitle>Chuck Norris API</PTitle>
                <Img src={norris} alt="" />
              </A>
            </Li>
            <Li>
              <A activeClassName="selected" to="/counter-redux">
                <PTitle>Counter Redux</PTitle>
                <Img src={counter} alt="" />
              </A>
            </Li>
          </Ul>
        </Nav>
      )}
      <Switch>
        <Route path="/todoapp">
          <TodoApp />
        </Route>
        <Route path="/hacker-typer">
          <HackerApp />
        </Route>
        <Route path="/tik-tok">
          <TikTokApp />
        </Route>
        <Route path="/memory">
          <MemoryApp />
        </Route>
        <Route path="/blog">
          <BlogApp />
        </Route>
        <Route path="/chucknorris">
          <NorrisApp />
        </Route>
        <Route path="/counter-redux">
          <CounterApp />
        </Route>
      </Switch>
    </div>
  );
}
