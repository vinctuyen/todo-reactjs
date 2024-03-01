export interface Todo {
  id: string;
  content: string;
  completed: boolean;
}

export type Todos = Todo[]