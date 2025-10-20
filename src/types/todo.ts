// src/types/todo.ts
export interface Todo {
  id: number | string;
  todo: string;
  completed: boolean;

  // Optional flags for temporary/optimistic todos
  __temp?: boolean;
  isOptimistic?: boolean;
}
