import { Todo } from "./TodoApp";
import { red } from "@material-ui/core/colors";
import { theme } from "./theme";
import { withStyles } from "@material-ui/core/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import styled from "styled-components";

// styles

export const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const Divwrapper = styled.div`
  width: 100%;
  text-align: center;
  font-size: 25px;
  margin-bottom: 1em;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const Button = styled.button`
  color: ${theme.white};
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
  background: ${theme.darkRed};
  border-radius: 5px;
  border: 1px solid ${theme.red};
  width: 100%;
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
  /* height: 40px; */
`;

export const Label = styled.label`
  width: 100%;
  text-align: left;
  color: ${theme.white};
`;

export const PNotFound = styled.p`
  margin: 0.5em 0;
  font-size: 0.6em;
  color: ${theme.white};
  text-align: center;
  width: 100%;
`;

// custom-checkbox

export const YellowCheckbox = withStyles({
  root: {
    color: red[400],
    "&$checked": {
      color: red[400],
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
        {props.getAllTodos.length > 0 ? (
          props.getAllTodos.map((t) => (
            <Li key={t.id}>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <DivItem>
                  <YellowCheckbox
                    onChange={(e) => {
                      props.addToCompleted(e.target.checked, t);
                    }}
                    checked={t.checked}
                  />
                  {props.keyId === t.id ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <InputText
                        type="text"
                        value={t.text}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          props.changeTodo(e.currentTarget.value, t.id)
                        }
                      />
                      <CheckIcon
                        style={{ cursor: "pointer", color: theme.white }}
                        onClick={() => props.changeEditMode(0)}
                      />
                    </div>
                  ) : (
                    <Label onDoubleClick={() => props.changeEditMode(t.id)}>
                      {t.text}
                    </Label>
                  )}
                </DivItem>
                <CancelIcon
                  onClick={() => {
                    props.removeTodo(t);
                  }}
                  style={{
                    fontSize: "2em",
                    width: "48px",
                    height: "27px",
                    color: theme.white,
                    cursor: "pointer",
                  }}
                />
              </div>
            </Li>
          ))
        ) : (
          <Li>
            <div
              style={{ display: "flex", alignItems: "center", height: "44px" }}
            >
              <DivItem>
                <PNotFound>no tasks found</PNotFound>
              </DivItem>
              <SentimentVeryDissatisfiedIcon
                style={{
                  fontSize: "2em",
                  width: "48px",
                  height: "27px",
                  color: theme.white,
                }}
              />
            </div>
          </Li>
        )}
      </Ul>
    </Divwrapper>
  );
};
