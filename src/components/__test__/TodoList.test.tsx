import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TodoProvider } from "../../contexts/TodosContext";
import { Todos } from "../../types";
import userEvent from "@testing-library/user-event";
import TodoList from "../TodoList";

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
      <TodoList />
    </TodoProvider>
  );

  const itemLeft = screen.getAllByRole("listitem");
  expect(itemLeft).toHaveLength(3);
});

test("delete todo", async () => {
  render(
    <TodoProvider initialTodos={todos}>
      <TodoList />
    </TodoProvider>
  );

  const itemLeft = screen.getAllByRole("listitem");
  expect(itemLeft).toHaveLength(3);

  const firstTodo = itemLeft[0];
  const btnDeleteFirstTodo = firstTodo.querySelector(
    "button"
  ) as HTMLButtonElement;

  const user = userEvent.setup();
  await user.hover(firstTodo);
  await user.click(btnDeleteFirstTodo);

  const itemLeftAfterDelete = screen.getAllByRole("listitem");
  expect(itemLeftAfterDelete).toHaveLength(2);
});
