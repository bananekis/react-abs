import { ActiveTodos } from "./ActiveTodos";
import { AllTodos } from "./AllTodos";
import { CompletedTodos } from "./CompletedTodos";
import { Component } from "react";
import { Length } from "./SeeLength";
import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { theme } from "./theme";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import styled from "styled-components";

// styles

const InputText = styled.input`
  border: 1px solid ${theme.red};
  border-radius: 5px;
  background: ${theme.darkRed};
  outline: none;
  color: ${theme.white};
  text-align: center;
  width: 100%;
  font-size: 1.4em;
  padding: 0.3em;

  &::placeholder {
    color: #ffffffb9;
  }

  @media (max-width: 900px) {
    width: 100% !important;
    margin: 0 auto;
  }
`;

const Divwrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 900px;
  margin: 5em auto 0 auto;

  @media (max-width: 900px) {
    width: 80%;
    margin: 2em auto;
  }

  @media (max-width: 420px) {
    margin: 10em auto 2em auto;
  }
`;

const Li = styled.li`
  list-style: none;
  display: flex;
`;

const A = styled(NavLink)`
  color: ${theme.white};
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${theme.lightRed};
  }

  &.selected {
    color: ${theme.lightRed};
  }
`;

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;

  ${Li}:not(:last-child) {
    margin-right: 1em;
  }

  @media (max-width: 900px) {
    font-size: 16px;
  }

  @media (max-width: 420px) {
    align-items: center;
    text-align: center;
  }

  @media (max-width: 320px) {
    font-size: 11px;
  }
`;

const Nav = styled.nav`
  background-color: ${theme.darkRed};
  padding: 10px 50px;
  font-size: 20px;
  border-radius: 5px;
  margin-bottom: 1em;
`;

const DivInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

// types

export type Todo = {
  text: string;
  id: number;
  checked: boolean;
};

// props, state

type Props = {};
type State = {
  all_todos: Todo[];
  value: string;
  key: number;
};

// main component

export class TodoApp extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      all_todos: [],
      value: "",
      key: 0,
    };
  }

  // add TODO

  handleKeyDown = (event: any) => {
    if (
      (event.key === "Enter" && event.target.value !== "") ||
      event.type === "click"
    ) {
      const newTodo = {
        text: this.state.value,
        id: Math.random() * 1000,
        checked: false,
      };

      this.setState((prevState) => ({
        all_todos: [...prevState.all_todos, newTodo],
        value: "",
      }));
    }
  };

  // remove todos

  removeTodo = (todo: Todo) => {
    this.setState({
      all_todos: this.state.all_todos.filter((item) => item.id !== todo.id),
    });
  };

  // add competed todos to specific object

  addToCompleted = (check: boolean, todos: Todo) => {
    const newArray = this.state.all_todos.map((todo: Todo) => {
      if (todo.id === todos.id) {
        return {
          ...todo,
          checked: !todo.checked,
        };
      } else {
        return todo;
      }
    });

    this.setState({ all_todos: newArray });
  };

  // change key edit mode

  changeEditMode = (id: number) => {
    this.setState({ key: id });
  };

  // edit todo

  changeTodo = (text: string, id: number) => {
    this.setState((prevState) => ({
      all_todos: prevState.all_todos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      ),
    }));
  };

  render() {
    return (
      <Divwrapper>
        <DivInputWrapper>
          <InputText
            type="text"
            name="name"
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
            onKeyDown={this.handleKeyDown}
            placeholder={"add new task..."}
            autoFocus
          />
          <PlaylistAddIcon
            style={{ color: "white", fontSize: "3em", cursor: "pointer" }}
            onClick={this.handleKeyDown}
          />
        </DivInputWrapper>
        <Router>
          <Switch>
            <Route path="/todoapp">
              <AllTodos
                getAllTodos={this.state.all_todos}
                removeTodo={this.removeTodo}
                addToCompleted={this.addToCompleted}
                changeEditMode={this.changeEditMode}
                changeTodo={this.changeTodo}
                keyId={this.state.key}
              />
            </Route>
            <Route path="/completed">
              <CompletedTodos
                getCompletedTodos={this.state.all_todos.filter(
                  (item) => item.checked === true
                )}
                removeAllAndCompleted={this.removeTodo}
                keyId={this.state.key}
                changeEditMode={this.changeEditMode}
                changeTodo={this.changeTodo}
              />
            </Route>
            <Route path="/active">
              <ActiveTodos
                getActiveTodos={this.state.all_todos.filter(
                  (item) => item.checked !== true
                )}
                removeTodo={this.removeTodo}
                keyId={this.state.key}
                changeEditMode={this.changeEditMode}
                changeTodo={this.changeTodo}
                addToCompleted={this.addToCompleted}
              />
            </Route>
          </Switch>

          <Nav>
            <Ul>
              <Length length={this.state.all_todos.length} />
              <Li>
                <A to="/todoapp" activeClassName="selected">
                  All Tasks
                </A>
              </Li>
              <Li>
                <A to="/active" activeClassName="selected">
                  Active Tasks
                </A>
              </Li>
              <Li>
                <A to="/completed" activeClassName="selected">
                  Completed Tasks
                </A>
              </Li>
            </Ul>
          </Nav>
        </Router>
      </Divwrapper>
    );
  }
}
