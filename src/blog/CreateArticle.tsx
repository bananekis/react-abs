import {
  Button,
  Div,
  DivForm,
  Form,
  Input,
  MainContext,
  Textarea,
} from "./BlogApp";
import { useContext } from "react";
// component

export const CreateArticle = () => {
  const context = useContext(MainContext);

  return (
    <Div>
      <Form onSubmit={context.handleSubmit}>
        <DivForm>
          <label>URL slug input:</label>
          <Input
            type="text"
            onChange={context.urlOnChange}
            value={context.urlValue}
            required
          />
          <label>Header input:</label>
          <Input
            type="text"
            onChange={context.headerOnChange}
            value={context.headerValue}
            required
          />
        </DivForm>
        <DivForm>
          <label>What do you have in mind?...</label>
          <Textarea
            onChange={context.textareaOnChange}
            value={context.textareaValue}
            placeholder="#markdown"
            required
          ></Textarea>
        </DivForm>
        <DivForm style={{ width: "100px", margin: "0 auto" }}>
          <Button type="submit">Save</Button>
        </DivForm>
      </Form>
    </Div>
  );
};
