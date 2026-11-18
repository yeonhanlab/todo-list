"use client";

import { Item } from "@/types/todo";
import { twMerge } from "tailwind-merge";
import Button from "@/components/button";
import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTodo, patchTodo, postImage } from "@/api/api";

interface Props {
    todo: Item;
}

export default function ItemDetail({ todo }: Props) {

    const router = useRouter();
    const [name, setName] = useState(todo.name);
    const [memo, setMemo] = useState(todo.memo ?? "");
    const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
    const [imageUrl, setImageUrl] = useState(todo.imageUrl ?? "");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 파일 이름은 영어, 숫자, 점, 밑줄, 하이픈만 가능해요
        if (!/^[A-Za-z0-9._-]+$/.test(file.name)) {
            alert("이미지 파일 이름은 영어로만 이루어져야 해요.");
            e.target.value = "";
            return;
        }

        // 5MB = 5 * 1024 * 1024 바이트
        if (file.size > 5 * 1024 * 1024) {
            alert("파일 크기는 5MB 이하여야 해요.");
            e.target.value = "";
            return;
        }

        try {
            const { url } = await postImage(file);
            setImageUrl(url);
        } catch {
            alert("이미지 업로드에 실패했어요.");
        }
        e.target.value = "";
    };

    const handleSave = async () => {
        if (!name.trim()) return;
        await patchTodo(todo.id, { name, memo, imageUrl: imageUrl || undefined, isCompleted });
        router.push("/");
    };

    const handleDelete = async () => {
        await deleteTodo(todo.id);
        router.push("/");
    }


    return (
        <div className="bg-slate-50">
            <main
                className={twMerge(
                    ["mx-auto min-h-[calc(100vh-60px)] max-w-[1200px]", "bg-white"],
                    ["px-4 py-4 md:px-6 md:py-6 lg:px-[102px] lg:py-6"],
                )}>
                {/* 이름 칸 */}
                <div
                    className={twMerge(
                        ["flex items-center justify-center gap-4", "h-16"],
                        ["rounded-3xl border-2 border-slate-900"],
                        isCompleted ? "bg-violet-100" : "bg-white",
                    )}>
                    <button
                        type={"button"}
                        onClick={() => setIsCompleted(!isCompleted)}
                        className={"cursor-pointer"}>
                        <img
                            src={isCompleted ? "/icon/checkbox-checked.svg" : "/icon/checkbox.svg"}
                            alt=""
                            className="h-8 w-8"
                        />
                    </button>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className={twMerge(
                            ["bg-transparent outline-none field-sizing-content"],
                            ["text-[20px] font-bold"],
                            ["text-slate-900 underline"],
                        )}
                    />
                </div>

                {/* 이미지 칸 + 메모 칸 */}
                <div
                    className={twMerge(
                        ["mt-6 grid grid-cols-1 gap-6"],
                        ["lg:grid-cols-[384px_1fr]"],
                    )}>
                    {/* 이미지 칸 */}
                    <div
                        className={twMerge(
                            [
                                "relative flex items-center justify-center overflow-hidden",
                                "h-[311px]",
                            ],
                            ["rounded-3xl"],
                            ["bg-slate-50"],
                            imageUrl ? "" : "border-2 border-dashed border-slate-300",
                        )}>
                        {imageUrl ? (
                            <img src={imageUrl} alt="" className="h-full w-full object-cover" />
                        ) : (
                            <img src="/image/img.svg" alt="" />
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <button
                            type="button"
                            aria-label={imageUrl ? "이미지 수정" : "이미지 추가"}
                            onClick={() => fileInputRef.current?.click()}
                            className={twMerge(
                                ["absolute bottom-4 right-4"],
                                ["flex h-16 w-16 items-center justify-center"],
                                ["cursor-pointer rounded-full"],
                                imageUrl ? "border-2 border-slate-900 bg-slate-900/50" : "bg-slate-200",
                            )}>
                            <img
                                src={imageUrl ? "/icon/edit.svg" : "/icon/plus-dark.svg"}
                                alt=""
                                className="h-6 w-6"
                            />
                        </button>
                    </div>

                    {/* 메모 칸 */}
                    <div
                        className={twMerge(
                            ["relative flex h-[311px] flex-col items-center", "overflow-hidden px-4 py-6"],
                            ["rounded-3xl"],
                            ["bg-[url('/image/memo.svg')] bg-cover bg-center"],
                        )}>
                        <span
                            className={twMerge(
                                ["absolute left-0 right-0 text-center"],
                                ["text-[16px] font-extrabold text-amber-800"],
                            )}>
                            Memo
                        </span>
                        <div className={"mt-8.5 flex min-h-0 w-full flex-1 items-center justify-center"}>
                            <textarea
                                value={memo}
                                onChange={e => setMemo(e.target.value)}
                                className={twMerge(
                                    ["field-sizing-content max-h-full w-full resize-none overflow-y-auto"],
                                    ["bg-transparent outline-none"],
                                    ["text-center text-[16px] font-normal text-slate-800"],
                                    ["[scrollbar-width:thin] [scrollbar-color:var(--color-amber-300)_transparent]"],
                                )}
                            />
                        </div>
                    </div>
                </div>

                {/* 버튼 */}
                <div className={twMerge(["mt-6 flex justify-center gap-4"], ["lg:justify-end"])}>
                    <Button
                        color={isCompleted ? "lime" : "gray"}
                        onClick={handleSave}
                        icon={<img src="/icon/check.svg" alt="" />}>
                        수정 완료
                    </Button>
                    <Button color="red" onClick={handleDelete} icon={<img src="/icon/x.svg" alt="" />}>
                        삭제하기
                    </Button>
                </div>
            </main>
        </div>
    );
}
