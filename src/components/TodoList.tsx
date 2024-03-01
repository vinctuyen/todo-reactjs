import styled from "@emotion/styled";
import { useTodos } from "../contexts/TodosContext";
import TodoItem from "./TodoItem";

const Wrapper = styled.ul`
  list-style: none;
`;

function TodoList() {
  const {filterTodos} = useTodos()
  return (
    <Wrapper>
      {filterTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </Wrapper>
  );
}

export default TodoList;
