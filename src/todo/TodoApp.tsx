import { ActiveTodos } from "./ActiveTodos";
import { AllTodos } from "./AllTodos";
import { CompletedTodos } from "./CompletedTodos";
import { Component } from "react";
import { Length } from "./SeeLength";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { theme } from "./theme";
import styled from "styled-components";

// styles

const InputText = styled.input`
  border: none;
  background: transparent;
  border-bottom: 1px solid yellow;
  outline: none;
  color: ${theme.yellow};
  text-align: center;
  width: 500px;
  font-size: 25px;

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

  @media (max-width: 900px) {
    width: 80%;
    margin: 2em auto;
  }
`;

const Li = styled.li`
  list-style: none;
  display: flex;
`;

const A = styled(Link)`
  color: ${theme.white};
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
`;

const Nav = styled.nav`
  background-color: ${theme.darkYellow};
  padding: 5px;
  font-size: 20px;
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
    if (event.key === "Enter" && event.target.value !== "") {
      const newTodo = {
        text: event.target.value,
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
      <>
        <Divwrapper>
          <InputText
            type="text"
            name="name"
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
            onKeyDown={this.handleKeyDown}
            autoFocus
          />

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
                />
              </Route>
            </Switch>

            <Nav>
              <Ul>
                <Length length={this.state.all_todos.length} />
                <Li>
                  <A to="/todoapp">All</A>
                </Li>
                <Li>
                  <A to="/active">Active</A>
                </Li>
                <Li>
                  <A to="/completed">Completed</A>
                </Li>
              </Ul>
            </Nav>
          </Router>
        </Divwrapper>
      </>
    );
  }
}
