import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TodoProvider } from "../../contexts/TodosContext";
import { Todos } from "../../types";
import TodoFooter from "../TodoFooter";

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
      <TodoFooter />
    </TodoProvider>
  );

  const itemLeft = screen.getByText(/left/i, { exact: false });
  expect(itemLeft).toHaveTextContent("2");

  const clearBtn = screen.getByRole("button", { name: /Clear completed/i });
  expect(clearBtn).toBeEnabled();
});

const anotherTodos: Todos = [
  {
    id: "1",
    content: "Example Todo first",
    completed: false,
  },
];

test("clear button disabled when dont have completed todos", () => {
  render(
    <TodoProvider initialTodos={anotherTodos}>
      <TodoFooter />
    </TodoProvider>
  );

  const itemLeft = screen.getByText(/left/i, { exact: false });
  expect(itemLeft).toHaveTextContent("1 item left");

  const clearBtn = screen.getByRole("button", { name: /Clear completed/i });
  expect(clearBtn).toBeDisabled();
});
