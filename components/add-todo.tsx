"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postTodo } from "@/api/api";
import Search from "@/components/search";
import Button from "@/components/button";

export default function AddTodo() {
    const [name, setName] = useState("");
    const router = useRouter();

    const handleAdd = async () => {
        if (!name.trim()) return;
        await postTodo({ name: name.trim() });
        setName("");
        router.refresh();
    };

    return (
        <div className={"flex gap-2 md:gap-4"}>
            <div className={"flex-1"}>
                <Search value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className={"md:hidden"}>
                <Button
                    shape={"icon"}
                    shadow={"icon"}
                    aria-label={"추가하기"}
                    onClick={handleAdd}
                    icon={<img src="/icon/plus-dark.svg" alt="" />}
                />
            </div>

            <div className="hidden md:block">
                <Button onClick={handleAdd} icon={<img src="/icon/plus-dark.svg" alt="" />}>
                    추가하기
                </Button>
            </div>
        </div>
    )
}