import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { TodoProvider } from "../../contexts/TodosContext";
import { Todo } from "../../types";
import TodoItem from "../TodoItem";
import userEvent from "@testing-library/user-event";

const todo: Todo = {
  id: "1",
  content: "Example Todo",
  completed: false,
};

test("initial render properly", () => {
  render(<TodoItem todo={todo} />, {
    wrapper: TodoProvider,
  });

  const checkbox = screen.getByLabelText(/Example Todo/i);
  expect(checkbox).not.toBeChecked();

  const inputEdit = screen.queryByLabelText(/Edit content/i);
  expect(inputEdit).not.toBeInTheDocument();

  const deleteBtn = screen.getByRole("button");
  expect(deleteBtn).toBeInTheDocument();
});

test("show edit input when double click", async () => {
  render(<TodoItem todo={todo} />, {
    wrapper: TodoProvider,
  });

  const checkbox = screen.getByLabelText(/Example Todo/i);
  expect(checkbox).not.toBeChecked();

  const editDiv = screen.getByTestId("edit-clickable-1");
  const user = userEvent.setup();
  await user.dblClick(editDiv);

  const inputEdit = screen.getByLabelText(/Edit content/i);
  expect(inputEdit).toBeInTheDocument();

  await user.type(inputEdit, "updated content");
  await user.keyboard("{enter}");

  const inputEditNull = screen.queryByLabelText(/Edit content/i);
  expect(inputEditNull).not.toBeInTheDocument();
});
