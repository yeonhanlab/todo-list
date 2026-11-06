import { getTodos } from "@/lib/api";

export default async function Home() {

    const todos = await getTodos();

    return <div>{JSON.stringify(todos)}</div>;
}
