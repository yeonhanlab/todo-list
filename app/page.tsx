import { getTodos } from "@/api/api";
import Button from "@/components/button";
import CheckList from "@/components/check-list";
import Search from "@/components/search";

export default async function Home() {
    const todos = await getTodos();
    const doingTodos = todos.filter(todo => !todo.isCompleted);
    const doneTodos = todos.filter(todo => todo.isCompleted);

    return (
        <div className={"min-h-screen bg-slate-50"}>
            <main className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-6">
                {/* 검색 + 추가하기 */}
                <div className="flex gap-2 md:gap-4">
                    <div className="flex-1">
                        <Search />
                    </div>

                    {/* 모바일: 아이콘 버튼 */}
                    <div className="md:hidden">
                        <Button
                            shape="icon"
                            shadow="icon"
                            aria-label="추가하기"
                            icon={<img src="/icon/plus-dark.svg" alt="" />}
                        />
                    </div>

                    {/* 태블릿 이상: 글자 있는 버튼 */}
                    <div className="hidden md:block">
                        <Button icon={<img src="/icon/plus-dark.svg" alt="" />}>추가하기</Button>
                    </div>
                </div>

                {/* TO DO / DONE 2열 */}
                <div className="mt-10 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <section>
                        <h2>
                            <img src="/image/todo.svg" alt="TO DO" />
                        </h2>
                        <ul className="mt-4 flex flex-col gap-4">
                            {doingTodos.map(todo => (
                                <li key={todo.id}>
                                    <CheckList>{todo.name}</CheckList>
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
                                    <CheckList isCompleted>{todo.name}</CheckList>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </main>
        </div>
    );
}
