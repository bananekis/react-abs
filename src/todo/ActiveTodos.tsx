import {
  DivItem,
  Divwrapper,
  InputText,
  Label,
  Li,
  PNotFound,
  Ul,
  YellowCheckbox,
} from "./AllTodos";
import { Todo } from "./TodoApp";
import { theme } from "./theme";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

// types

type Props = {
  getActiveTodos: Todo[];
  keyId: number;
  removeTodo: (name: Todo) => void;
  changeEditMode: (id: number) => void;
  changeTodo: (text: string, id: number) => void;
  addToCompleted: (check: boolean, todos: Todo) => void;
};

export const ActiveTodos = (props: Props) => {
  return (
    <Divwrapper onClick={() => props.changeEditMode(0)}>
      <Ul>
        {props.getActiveTodos.length > 0 ? (
          props.getActiveTodos.map((t) => (
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
