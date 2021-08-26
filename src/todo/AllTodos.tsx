import { Todo } from "./TodoApp";
import { theme } from "./theme";
import { withStyles } from "@material-ui/core/styles";
import { yellow } from "@material-ui/core/colors";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import styled from "styled-components";

// styles

export const Ul = styled.ul`
  list-style: none;
  padding: 0;
`;

export const Divwrapper = styled.div`
  width: 300px;
  text-align: center;
  font-size: 25px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const Button = styled.button`
  color: ${theme.yellow};
  background: transparent;
  border: none;
  display: block;
  padding: 0;
  font-size: 20px;
  height: 40px;
`;

export const DivItem = styled.div`
  display: flex;
  overflow-wrap: anywhere;
  /* &:hover ${Button} {
    display: inline-block;
  } */
`;

export const InputText = styled.input`
  width: 100%;
  font-size: 25px;
`;

export const InputCheckBox = styled.input`
  display: block;
  width: 25px;
  height: 25px;
`;

export const Li = styled.li`
  margin-bottom: 0.6em;
  height: 40px;
`;

export const Label = styled.label<{ primary?: boolean }>`
  width: 100%;
  text-align: left;
  color: ${(props) => (props.primary ? theme.white : theme.yellow)};
`;

// custom-checkbox

export const YellowCheckbox = withStyles({
  root: {
    color: yellow[400],
    "&$checked": {
      color: yellow[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

//props

type Props = {
  getAllTodos: Todo[];
  keyId: number;
  addToCompleted: (check: boolean, todos: Todo) => void;
  removeTodo: (todo: Todo) => void;
  changeEditMode: (id: number) => void;
  changeTodo: (text: string, id: number) => void;
};

// component

export const AllTodos = (props: Props) => {
  return (
    <Divwrapper onClick={() => props.changeEditMode(0)}>
      <Ul>
        {props.getAllTodos.map((t) => (
          <Li key={t.id}>
            <DivItem>
              <YellowCheckbox
                onChange={(e) => {
                  props.addToCompleted(e.target.checked, t);
                }}
                checked={t.checked}
              />
              {props.keyId === t.id ? (
                <InputText
                  type="text"
                  value={t.text}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) =>
                    props.changeTodo(e.currentTarget.value, t.id)
                  }
                />
              ) : (
                <Label primary onDoubleClick={() => props.changeEditMode(t.id)}>
                  {t.text}
                </Label>
              )}
              <Button
                onClick={() => {
                  props.removeTodo(t);
                }}
              >
                X
              </Button>
            </DivItem>
          </Li>
        ))}
      </Ul>
    </Divwrapper>
  );
};
