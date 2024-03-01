import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TodoProvider } from "../../contexts/TodosContext";
import { Todos } from "../../types";
import TodoHeader from "../TodoHeader";
import userEvent from "@testing-library/user-event";

const todos: Todos = [
  {
    id: "1",
    content: "Example Todo first",
    completed: false,
  },
  {
    id: "2",
    content: "Example Todo second",
    completed: true,
  },
  {
    id: "3",
    content: "Example Todo third",
    completed: false,
  },
];

test("initial render properly", () => {
  render(
    <TodoProvider initialTodos={todos}>
      <TodoHeader />
    </TodoProvider>
  );

  const toggleAll = screen.getByRole("checkbox");
  expect(toggleAll).not.toBeChecked();

  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
});

const anotherTodos: Todos = [
  {
    id: "1",
    content: "Example Todo first",
    completed: true,
  }
];

test("toggle all not be checked when add new todo", async () => {
  render(
    <TodoProvider initialTodos={anotherTodos}>
      <TodoHeader />
    </TodoProvider>
  );

  const toggleAll = screen.getByRole("checkbox");
  expect(toggleAll).toBeChecked();

  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();

  const user = userEvent.setup()
  await user.clear(input)
  await user.type(input, 'new todo')
  await user.keyboard("{enter}")

  expect(toggleAll).not.toBeChecked()
});