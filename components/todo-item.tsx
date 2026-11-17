"use client";

import { Item } from "@/types/todo";
import { useRouter } from "next/navigation";
import CheckList from "@/components/check-list";
import { getTodo, patchTodo } from "@/api/api";

interface Props {
    todo: Item;
}

export default function TodoItem({ todo }: Props) {
    const router = useRouter();

    const handleToggle = async () => {
        await patchTodo(todo.id, { isCompleted: !todo.isCompleted });
        router.refresh();
    };

    return (
        <CheckList isCompleted={todo.isCompleted} onToggle={handleToggle}>
            {todo.name}
        </CheckList>
    );
}
