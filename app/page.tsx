import { getTodos } from "@/api/api";
import AddTodo from "@/components/add-todo";
import { connection } from "next/server";
import TodoItem from "@/components/todo-item";

export default async function Home() {
    await connection();
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
                        {doingTodos.length === 0 ? (
                            <div className="mt-6 flex flex-col items-center text-center text-base font-bold text-slate-400 md:mt-4">
                                <img src="/image/emptylogo-c.svg" alt="" className="md:hidden" />
                                <img
                                    src="/image/emptylogo-a.svg"
                                    alt=""
                                    className="hidden md:block"
                                />
                                <p>
                                    할 일이 없어요.
                                    <br />
                                    TODO를 새롭게 추가해주세요!
                                </p>
                            </div>
                        ) : (
                            <ul className="mt-4 flex flex-col gap-4">
                                {doingTodos.map(todo => (
                                    <li key={todo.id}>
                                        <TodoItem todo={todo} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    <section>
                        <h2>
                            <img src="/image/done.svg" alt="DONE" />
                        </h2>
                        {doneTodos.length === 0 ? (
                            <div className="mt-6 flex flex-col items-center text-center text-base font-bold text-slate-400">
                                <img src="/image/emptylogo-d.svg" alt="" className="md:hidden" />
                                <img
                                    src="/image/emptylogo-b.svg"
                                    alt=""
                                    className="hidden md:block"
                                />
                                <p>
                                    아직 다 한 일이 없어요.
                                    <br />
                                    해야 할 일을 체크해보세요!
                                </p>
                            </div>
                        ) : (
                            <ul className="mt-4 flex flex-col gap-4">
                                {doneTodos.map(todo => (
                                    <li key={todo.id}>
                                        <TodoItem todo={todo} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}
