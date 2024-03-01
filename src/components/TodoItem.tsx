import styled from "@emotion/styled";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { ENTER_KEY, ESCAPE_KEY } from "../constants";
import { useTodos } from "../contexts/TodosContext";
import { Todo } from "../types/index";

interface TodoItemProps {
  todo: Todo;
}

const Wrapper = styled.li`
  border-bottom: 1px solid #ededed;
  font-size: 1.25rem;
  display: flex;
  position: relative;

  &:last-child {
    border-bottom: none;
  }

  &.todo-focus {
    box-shadow: 0 0 2px 2px #cf7d7d;
  }

  & div.edit-clickable {
    position: absolute;
    top: 0;
    left: 3.75rem;
    right: 3rem;
    height: 100%;
    background-color: transparent;
  }

  @media (min-width: 48rem) {
    font-size: 1.5rem;
  }

  input {
    display: none;

    & + label {
      background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center left;
    }

    &:checked + label {
      background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E");
      color: #949494;
      text-decoration: line-through;
    }
  }

  & label {
    display: inline-block;
    word-break: break-all;
    padding: 1rem 3rem 1rem 3.75rem;
    line-height: 1.2;
    font-weight: 400;
    color: #484848;
    transition: color 0.4s ease;
    cursor: pointer;
  }

  & button {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    display: none;
    font-size: 30px;
    color: #949494;
    width: 40px;
    height: 40px;
    background-color: transparent;
    border: none;
    transition: color 0.2s ease-out;

    &:hover,
    &:focus {
      color: #c18585;
    }

    &::after {
      content: "×";
      display: block;
      height: 100%;
      line-height: 1.1;
    }
  }

  &:hover button {
    display: block;
  }

  & input[type="text"] {
    display: block;
    width: 100%;
    border: none;
    padding: 1rem 3rem 1rem 3.75rem;

    &:focus {
      outline: none;
    }
  }

  &.todo-edit {
    font-size: 1.5rem;
    line-height: 1.4;
    box-shadow: 0 0 2px 2px #cf7d7d;

    label {
      display: none;
    }
    button {
      display: none;
    }
  }
`;

function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo, updateTodo } = useTodos();
  const { id, content, completed } = todo;

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(content);
  const inputRef = useRef<HTMLInputElement>(null);
  const listItemRef = useRef<HTMLLIElement>(null);

  function handleDoubleClick() {
    setIsEdit(true);
  }

  function handleKeyDown(e: KeyboardEvent) {
    const todoContent = editText.trim();
    if (e.key === ESCAPE_KEY) {
      setIsEdit(false);
      setEditText(content);
    }
    if (e.key !== ENTER_KEY || todoContent === "") {
      return;
    }
    e.preventDefault();
    updateTodo(id, editText);
    setIsEdit(false);
  }

  function handleChangeCheckbox(e: ChangeEvent<HTMLInputElement>, id: string) {
    toggleTodo(e, id);
    listItemRef.current && listItemRef.current.classList.add("todo-focus");

    function handleClickOutside(event: MouseEvent): void {
      if (
        listItemRef.current &&
        !listItemRef.current.contains(event.target as Node)
      ) {
        listItemRef.current.classList.remove("todo-focus");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        isEdit &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsEdit(false);
        setEditText(content);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEdit, content]);

  return (
    <Wrapper className={isEdit ? "todo-edit" : ""} ref={listItemRef}>
      <div className="full-width">
        <input
          type="checkbox"
          id={`todo-${id}`}
          checked={completed}
          onChange={(e) => handleChangeCheckbox(e, todo.id)}
        />
        <label htmlFor={`todo-${id}`}>{content}</label>
        {isEdit ? (
          <>
            <input
              type="text"
              name={`edit-todo-${id}`}
              id={`edit-todo-${id}`}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
            <label htmlFor={`edit-todo-${id}`} hidden>
              Edit content
            </label>
          </>
        ) : (
          <div
            className="edit-clickable"
            onDoubleClick={handleDoubleClick}
            data-testid={`edit-clickable-${id}`}
          ></div>
        )}
      </div>
      <button onClick={() => deleteTodo(todo.id)}></button>
    </Wrapper>
  );
}

export default TodoItem;
