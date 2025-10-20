import localforage from "localforage";

const todoUrl = "https://dummyjson.com/todos";
const STORAGE_KEY = "cached_todos";

export interface Todo {
  id: number | string;
  todo: string;
  completed: boolean;
  userId: number;
  __temp?: boolean;
}

// ✅ Fetch all todos
export const fetchTodos = async (): Promise<Todo[]> => {
  const cached = await localforage.getItem<Todo[]>(STORAGE_KEY);
  if (cached) return cached;

  const res = await fetch(todoUrl);
  if (!res.ok) throw new Error("Error fetching todos");

  const data: { todos: Todo[] } = await res.json();
  await localforage.setItem(STORAGE_KEY, data.todos);
  return data.todos;
};

// ✅ Fetch a single todo
export const fetchTodosById = async (id: number | string): Promise<Todo> => {
  const res = await fetch(`${todoUrl}/${id}`);
  if (!res.ok) throw new Error("Error fetching todo by ID");
  return res.json();
};

// ✅ Create a new todo
export const createTodo = async (newTodo: Omit<Todo, "id">): Promise<Todo> => {
  const res = await fetch(`${todoUrl}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  if (!res.ok) throw new Error("Error creating todo");

  const created: Todo = await res.json();
  const existing = (await localforage.getItem<Todo[]>(STORAGE_KEY)) || [];

  const finalCreated: Todo = { ...created, __temp: true };
  const updated = [finalCreated, ...existing];
  await localforage.setItem(STORAGE_KEY, updated);

  return finalCreated;
};

// ✅ Delete a todo
export const deleteTodo = async (
  id: number | string
): Promise<{ isDeleted: boolean }> => {
  const res = await fetch(`${todoUrl}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error deleting todo");

  const result: { isDeleted: boolean } = await res.json();
  const existing = (await localforage.getItem<Todo[]>(STORAGE_KEY)) || [];
  const updated = existing.filter((todo) => todo.id !== id);
  await localforage.setItem(STORAGE_KEY, updated);

  return result;
};

// ✅ Update a todo
export const updateTodo = async (
  id: number | string,
  updatedData: Partial<Todo>
): Promise<Todo> => {
  const existing = (await localforage.getItem<Todo[]>(STORAGE_KEY)) || [];
  const todo = existing.find((t) => t.id === id);

  // If it's temporary, just update locally
  if (todo?.__temp) {
    const updatedList = existing.map((t) =>
      t.id === id ? { ...t, ...updatedData } : t
    );
    await localforage.setItem(STORAGE_KEY, updatedList);
    return { ...todo, ...updatedData };
  }

  // Otherwise update via API
  const res = await fetch(`${todoUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) throw new Error("Error updating todo");

  const updated: Todo = await res.json();
  const updatedList = existing.map((t) =>
    t.id === id ? { ...t, ...updated } : t
  );
  await localforage.setItem(STORAGE_KEY, updatedList);

  return updated;
};

// ✅ Clear cache
export const clearTodoCache = async (): Promise<void> => {
  await localforage.removeItem(STORAGE_KEY);
};
