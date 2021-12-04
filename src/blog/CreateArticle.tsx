import {
  Button,
  Div,
  DivForm,
  Form,
  Input,
  MainContext,
  Textarea,
} from "./BlogApp";
import { theme } from "./theme";
import { useContext } from "react";
import CheckIcon from "@mui/icons-material/Check";
import styled from "styled-components";

//styles

const Label = styled.label`
  font-size: 1.2em;
  margin-bottom: 0.5em;
`;

const DivButton = styled.div`
  margin: 0px auto;
  width: 30%;
  justify-content: center;
  text-align: center;
  margin-top: 3em;
`;

const P = styled.p`
  margin: 0;
  display: flex;
  width: 100%;
`;

// component

export const CreateArticle = () => {
  const context = useContext(MainContext);

  return (
    <Div>
      <Form onSubmit={context.handleSubmit}>
        <DivForm>
          <Label>URL slug input:</Label>
          <Input
            type="text"
            onChange={context.urlOnChange}
            value={context.urlValue}
            required
          />
          <Label>Header input:</Label>
          <Input
            type="text"
            onChange={context.headerOnChange}
            value={context.headerValue}
            required
          />
        </DivForm>
        <DivForm>
          <Label>What do you have in mind?...</Label>
          <Textarea
            onChange={context.textareaOnChange}
            value={context.textareaValue}
            placeholder="#markdown"
            required
          ></Textarea>
        </DivForm>
        <DivButton>
          <Button type="submit">
            <P>Save</P>
            <CheckIcon />
          </Button>
        </DivButton>
      </Form>
    </Div>
  );
};
