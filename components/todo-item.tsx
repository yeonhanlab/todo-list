"use client";

import { Item } from "@/types/todo";
import { useRouter } from "next/navigation";
import CheckList from "@/components/check-list";
import { patchTodo } from "@/api/api";

interface Props {
    todo: Item;
}

// 목록의 할 일 한 줄 : 체크 버튼으로 완료 상태를 바꾸고, 글자를 누르면 상세 페이지로 이동
export default function TodoItem({ todo }: Props) {
    const router = useRouter();

    // 완료 상태를 반대로 바꿔 서버에 저장한 뒤 목록을 새로 불러온다
    const handleToggle = async () => {
        await patchTodo(todo.id, { isCompleted: !todo.isCompleted });
        router.refresh();
    };

    return (
        <CheckList
            isCompleted={todo.isCompleted}
            onToggle={handleToggle}
            href={`/items/${todo.id}`}>
            {todo.name}
        </CheckList>
    );
}
