import { getTodos } from "@/api/api";

export default async function Home() {
    const todos = await getTodos();

    const doingTodos = todos.filter(todo => !todo.isCompleted);
    const doneTodos = todos.filter(todo => todo.isCompleted);

    return (
        <div>
            <h2>TO DO</h2>
            <ul>
                {doingTodos.map(todo => (
                    <li key={todo.id}>{todo.name}</li>
                ))}
            </ul>

            <h2>DONE</h2>
            <ul>
                {doneTodos.map(todo => (
                    <li key={todo.id}>{todo.name}</li>
                ))}
            </ul>
        </div>
    );
}
