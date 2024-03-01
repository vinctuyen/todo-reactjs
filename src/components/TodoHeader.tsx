import styled from "@emotion/styled";
import { KeyboardEvent, useState } from "react";
import { ENTER_KEY } from "../constants";
import { useTodos } from "../contexts/TodosContext";

const ToggleAllWrapper = styled.div`
  position: relative;

  label {
    position: absolute;
    width: 2.8rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0;
    top: 0;
    left: 0;
    cursor: pointer;

    &:before {
      content: "❯";
      display: inline-block;
      font-size: 22px;
      color: #949494;
      padding: 10px 27px 10px 27px;
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }

  input {
    position: absolute;
    right: 100%;
    bottom: 100%;
    width: 1px;
    height: 1px;
    border: none; /* Mobile Safari */
    opacity: 0;

    &:checked + label:before {
      color: #484848;
    }
  }
`;

const TodoInputWrapper = styled.div`
  border-bottom: 1px solid #ededed;

  input {
    background: rgba(0, 0, 0, 0.003);
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    height: 4rem;
    padding: 1rem 1rem 1rem 3.75rem;
    font-size: 1.5rem;
    line-height: 1.4;
    width: 100%;

    @media (min-width: 48rem) {
      padding: 1rem 1rem 1rem 3.75rem;
    }

    &:focus {
      box-shadow: 0 0 2px 2px #cf7d7d;
      outline: 0;
    }
    &::placeholder {
      font-style: italic;
      font-size: 1.2rem;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);

      @media (min-width: 23rem) {
        font-size: inherit;
      }
    }
  }
`;

function TodoHeader() {
  const { todos, handleToggleAll, addNewTodo } = useTodos();
  const [newTodoText, setNewTodoText] = useState<string>("");

  function handleKeyDown(e: KeyboardEvent): void {
    const todoContent = newTodoText.trim();
    if (e.key !== ENTER_KEY || todoContent === "") {
      return;
    }
    e.preventDefault();
    addNewTodo(todoContent);
    setNewTodoText("");
  }

  const isCheckedAll = todos.every((todo) => todo.completed);

  return (
    <div>
      {todos.length > 0 && (
        <ToggleAllWrapper>
          <input
            type="checkbox"
            id="toggle-all"
            onChange={handleToggleAll}
            checked={isCheckedAll}
          />
          <label htmlFor="toggle-all" hidden>
            Toggle All
          </label>
        </ToggleAllWrapper>
      )}
      <TodoInputWrapper>
        <label htmlFor="new-todo" hidden>
          New todo
        </label>
        <input
          name="new-todo"
          id="new-todo"
          placeholder="What needs to be done?"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </TodoInputWrapper>
    </div>
  );
}

export default TodoHeader;
