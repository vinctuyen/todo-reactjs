import {
  ChangeEvent,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ACTIVE_TODOS,
  ALL_TODOS,
  COMPLETED_TODOS,
  LOCAL_STORAGE_NAME,
} from "../constants";
import { Todos } from "../types";
import { getData, storeData, uuid } from "../utils";

type TodoProviderValue = {
  todos: Todos;
  filterTodos: Todos;
  filterText: string;
  setTodos: React.Dispatch<React.SetStateAction<Todos>>;
  handleToggleAll(e: ChangeEvent<HTMLInputElement>): void;
  toggleTodo(e: ChangeEvent<HTMLInputElement>, id: string): void;
  clearCompletedTodos(): void;
  addNewTodo(content: string): void;
  deleteTodo(id: string): void;
  updateTodo(id: string, content: string): void;
} | null;

interface TodoProviderProps {
  children: React.ReactNode;
  initialTodos?: Todos;
}

const TodosContext = createContext<TodoProviderValue>(null);

export function useTodos() {
  const contextValue = useContext(TodosContext);

  if (!contextValue) {
    throw new Error("useTodos must be called from within an TodoProvider");
  }

  return contextValue;
}

export function TodoProvider({ children, initialTodos }: TodoProviderProps) {
  const [todos, setTodos] = useState<Todos>(getInitTodos(initialTodos));
  const [filterText, setFilterText] = useState<string>(getFilterText());

  function updateTodos(updatedTodos: Todos): void {
    setTodos(updatedTodos);
    storeData(LOCAL_STORAGE_NAME, updatedTodos);
  }

  function handleToggleAll(e: ChangeEvent<HTMLInputElement>): void {
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: e.target.checked,
    }));
    updateTodos(updatedTodos);
  }

  function toggleTodo(e: ChangeEvent<HTMLInputElement>, id: string): void {
    const updatedTodos = todos.map((todo) => {
      if (todo.id !== id) return todo;
      return {
        ...todo,
        completed: e.target.checked,
      };
    });
    updateTodos(updatedTodos);
  }

  function clearCompletedTodos(): void {
    const unCompletedTodos = todos.filter((todo) => !todo.completed);
    updateTodos(unCompletedTodos);
  }

  function addNewTodo(content: string): void {
    const updatedTodos = [
      ...todos,
      {
        id: uuid(),
        content: content,
        completed: false,
      },
    ];
    updateTodos(updatedTodos);
  }

  function deleteTodo(id: string): void {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    updateTodos(updatedTodos);
  }

  function updateTodo(id: string, content: string): void {
    const updatedTodos = todos.map((todo) => {
      if (todo.id !== id) return todo;
      return {
        ...todo,
        content: content,
      };
    });
    updateTodos(updatedTodos);
  }

  useEffect(() => {
    function handleHashChange() {
      setFilterText(getFilterText());
    }

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const filterTodos = useMemo(
    () => getFilterTodos(todos, filterText),
    [todos, filterText]
  );

  const value = {
    todos,
    filterTodos,
    filterText,
    setTodos,
    handleToggleAll,
    toggleTodo,
    clearCompletedTodos,
    addNewTodo,
    deleteTodo,
    updateTodo,
  };
  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
}

function getInitTodos(initValues?: Todos) {
  const localTodos = getData(LOCAL_STORAGE_NAME);
  if (!initValues) return localTodos;
  if (localTodos.length === 0 && initValues) return initValues;
  return [];
}

function getFilterText(): string {
  const locationHash = window.location.hash;
  if (!locationHash || locationHash.length < 3) return ALL_TODOS;
  return locationHash.substring(2);
}

function getFilterTodos(todos: Todos, filter: string): Todos {
  let filterTodos: Todos;
  switch (filter) {
    case ALL_TODOS:
      filterTodos = todos;
      break;
    case ACTIVE_TODOS:
      filterTodos = todos.filter((todo) => !todo.completed);
      break;
    case COMPLETED_TODOS:
      filterTodos = todos.filter((todo) => todo.completed);
      break;
    default:
      filterTodos = todos;
  }
  return filterTodos;
}
