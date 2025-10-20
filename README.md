# 📝 My-Todo-NextJs

A modern, responsive **Todo App** built with **Next.js**, converted from a previous React + TypeScript version.  
This app allows users to **add**, **edit**, **delete**, and **filter todos** by status (completed or pending).  
It showcases a clean UI, state management, and API integration — all optimized for performance and scalability.

---

## 🚀 Features

- ➕ **Add Todo:** Create new tasks quickly and easily
- ✏️ **Edit Todo:** Update existing todos inline
- ❌ **Delete Todo:** Remove tasks instantly
- 🔍 **Search & Filter:** View completed or pending tasks
- ⚡ **Optimistic Updates:** Instant UI feedback when adding or deleting todos
- 💾 **Local Storage Caching:** Keeps todos even after page refresh
- 🎨 **Responsive Design:** Built with Tailwind CSS for seamless display across all devices

---

## 🛠️ Tech Stack

| Category             | Technologies                                  |
| -------------------- | --------------------------------------------- |
| **Framework**        | [Next.js 14](https://nextjs.org/)             |
| **Language**         | [TypeScript](https://www.typescriptlang.org/) |
| **Styling**          | [Tailwind CSS](https://tailwindcss.com/)      |
| **Data Handling**    | React Query + LocalForage                     |
| **State Management** | React Hooks                                   |
| **Deployment**       | [PipeOps](https://pipeops.io)                 |

---

## 📂 Folder Structure

```yaml
src/
┣ 📁 app/                  # Next.js app directory
┣ 📁 api/                  # API utilities (e.g., todos.ts)
┣ 📁 components/           # Reusable UI components
┣ 📁 styles/               # Global CSS and Tailwind config
┣ 📄 page.tsx              # Main Todo page
┣ 📄 layout.tsx            # App layout
┗ 📄 globals.css           # Global styles

```

## ⚙️ Installation & Setup

Follow the steps below to run the project locally:

```bash
# Clone the repository
git clone https://github.com/OpeyemiKol/My-Todo-NextJs.git

# Navigate to the project directory
cd My-Todo-NextJs

# Install dependencies
npm install

# Run the development server
npm run dev


```

Your app will be running on **http://localhost:3000**

---

## 🧩 API Integration

Todos are fetched and managed via [DummyJSON API](https://dummyjson.com/todos).

### Example Endpoints

```bash
GET    https://dummyjson.com/todos
POST   https://dummyjson.com/todos/add
PUT    https://dummyjson.com/todos/{id}
DELETE https://dummyjson.com/todos/{id}


```

## 🚢 Deployment

The project is deployed using **[PipeOps](https://pipeops.io)** for easy CI/CD integration and scalability.

---

## 🧑‍💻 Author

**Opeyemi Michael Kolurejo**  
Frontend Web Developer

📧 [kolurejohorpy@gmail.com](mailto:kolurejohorpy@gmail.com)  
🐙 [GitHub: OpeyemiKol](https://github.com/OpeyemiKol)

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🌟 Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TanStack Query (React Query)](https://tanstack.com/query/latest)
- [PipeOps Deployment Platform](https://pipeops.io)
- [DummyJSON API](https://dummyjson.com)

---

## 💡 Inspiration

This project was originally built using **React + TypeScript** and later converted to **Next.js** to leverage server-side rendering, routing, and performance optimization.

---

## 🧠 Future Improvements

- 🔔 Add notifications for task actions
- 📅 Add due dates and reminders
- 🌙 Implement dark mode
- 💻 Add user authentication for personalized todos
