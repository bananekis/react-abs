import {
  Button,
  DivItem,
  Divwrapper,
  InputText,
  Label,
  Li,
  Ul,
  YellowCheckbox,
} from "./AllTodos";
import { Todo } from "./TodoApp";

// types
type Props = {
  keyId: number;
  getCompletedTodos: Todo[];
  removeAllAndCompleted: (x: Todo) => void;
  changeEditMode: (id: number) => void;
  changeTodo: (text: string, id: number) => void;
};

export const CompletedTodos = (props: Props) => {
  return (
    <Divwrapper onClick={() => props.changeEditMode(0)}>
      <Ul>
        {props.getCompletedTodos.map((t) => (
          <Li key={t.id}>
            <DivItem>
              <YellowCheckbox checked={t.checked} />
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
                  props.removeAllAndCompleted(t);
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
