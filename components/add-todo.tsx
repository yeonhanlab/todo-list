"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { postTodo } from "@/api/api";
import Search from "@/components/search";
import Button from "@/components/button";

// 할 일 추가 영역 : 입력창 + 추가하기 버튼 (입력·클릭이 필요해서 클라이언트 컴포넌트)
// form으로 묶어서 엔터를 치거나 버튼을 눌러도 같은 방식(onSubmit)으로 추가된다
export default function AddTodo() {
    // 입력창에 적힌 글자
    const [name, setName] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 폼의 기본 동작(페이지 새로고침)을 막는다
        if (!name.trim()) return;
        await postTodo({ name: name.trim() });
        setName("");
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} className={"flex gap-2 md:gap-4"}>
            <div className={"flex-1"}>
                <Search value={name} onChange={e => setName(e.target.value)} />
            </div>

            {/* 모바일: 아이콘만 있는 버튼 */}
            <div className={"md:hidden"}>
                <Button
                    type="submit"
                    shape={"icon"}
                    shadow={"icon"}
                    aria-label={"추가하기"}
                    icon={<img src="/icon/plus-dark.svg" alt="" />}
                />
            </div>

            {/* 태블릿 이상: 글자가 있는 버튼 */}
            <div className="hidden md:block">
                <Button type={"submit"} icon={<img src="/icon/plus-dark.svg" alt="" />}>
                    추가하기
                </Button>
            </div>
        </form>
    )
}