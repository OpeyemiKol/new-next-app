import type { FC } from "react";
import type { Todo } from "@/types/todo";
import TodoItem from "@/components/TodoItem";

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number | string) => void;
}

const TodoList: FC<TodoListProps> = ({ todos, onDelete }) => {
  return (
    <ul className="mt-6 space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default TodoList;
