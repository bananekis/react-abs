import {
  Button,
  DivItem,
  Divwrapper,
  InputText,
  Label,
  Li,
  Ul,
} from "./AllTodos";
import { Todo } from "./TodoApp";

// types

type Props = {
  getActiveTodos: Todo[];
  keyId: number;
  removeTodo: (name: Todo) => void;
  changeEditMode: (id: number) => void;
  changeTodo: (text: string, id: number) => void;
};

export const ActiveTodos = (props: Props) => {
  return (
    <Divwrapper onClick={() => props.changeEditMode(0)}>
      <Ul>
        {props.getActiveTodos.map((t) => (
          <Li key={t.id}>
            <DivItem>
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
                <Label onDoubleClick={() => props.changeEditMode(t.id)}>
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
