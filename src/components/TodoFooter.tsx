import styled from "@emotion/styled";
import { useTodos } from "../contexts/TodosContext";
import { pluralize } from "../utils";
import { ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS } from "../constants";

const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
  border-top: 1px solid #e6e6e6;
  font-size: .875rem;
  padding: 1rem;
  text-align: left;
  position: relative;

  @media (min-width: 48rem) {
    display: flex;
    justify-content: space-between;
  }

  &::before {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    pointer-events: none;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }

  & button {
    background-color: transparent;
    border: none;
    text-align: left;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Filter = styled.ul`
  display: flex;
  list-style: none;
  gap: 1rem;

  @media (min-width: 48rem) {
    gap: 0.25rem;
  }

  & li a {
    color: inherit;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;

    &:hover {
      border-color: #db7676;
    }

    &:focus {
      box-shadow: 0 0 2px 2px #cf7d7d;
      outline: 0;
    }

    &.selected {
      border-color: #ce4646;
    }
  }
`;

function TodoFooter() {
  const { todos, clearCompletedTodos, filterText } = useTodos();

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  if (todos.length === 0) return null;

  return (
    <Wrapper>
      <p>
        {activeTodos.length} {pluralize(activeTodos.length, "item")} left
      </p>
      <Filter>
        <li>
          <a href="#/" className={filterText === ALL_TODOS ? "selected" : ""}>
            All
          </a>
        </li>
        <li>
          <a
            href="#/active"
            className={filterText === ACTIVE_TODOS ? "selected" : ""}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/completed"
            className={filterText === COMPLETED_TODOS ? "selected" : ""}
          >
            Completed
          </a>
        </li>
      </Filter>
      <button
        onClick={clearCompletedTodos}
        disabled={completedTodos.length === 0}
      >
        Clear completed
      </button>
    </Wrapper>
  );
}

export default TodoFooter;
