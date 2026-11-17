import { getTodos } from "@/api/api";
import AddTodo from "@/components/add-todo";
import { connection } from "next/server";
import TodoItem from "@/components/todo-item";

export default async function Home() {
    await connection()
    const todos = await getTodos();
    const doingTodos = todos.filter(todo => !todo.isCompleted);
    const doneTodos = todos.filter(todo => todo.isCompleted);

    return (
        <div className={"min-h-screen bg-slate-50"}>
            <main className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-6">
                {/* 검색 + 추가하기 */}
                <AddTodo />

                {/* TO DO / DONE 2열 */}
                <div className="mt-10 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <section>
                        <h2>
                            <img src="/image/todo.svg" alt="TO DO" />
                        </h2>
                        <ul className="mt-4 flex flex-col gap-4">
                            {doingTodos.map(todo => (
                                <li key={todo.id}>
                                    <TodoItem todo={todo} />
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2>
                            <img src="/image/done.svg" alt="DONE" />
                        </h2>
                        <ul className="mt-4 flex flex-col gap-4">
                            {doneTodos.map(todo => (
                                <li key={todo.id}>
                                    <TodoItem todo={todo} />
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </main>
        </div>
    );
}
