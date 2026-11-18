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

// 상세 화면 : 이름·메모·이미지를 수정하고 저장/삭제한다 (입력·클릭이 필요해서 클라이언트 컴포넌트)
export default function ItemDetail({ todo }: Props) {
    const router = useRouter();
    // 수정 중인 값들은 상태로 들고 있다가 '수정 완료'를 누를 때 한 번에 저장한다
    const [name, setName] = useState(todo.name);
    const [memo, setMemo] = useState(todo.memo ?? "");
    const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
    const [imageUrl, setImageUrl] = useState(todo.imageUrl ?? "");

    // 숨겨둔 파일 선택창(<input type="file">)을 + 버튼으로 대신 열기 위한 참조
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 파일을 고르면 조건(영문 이름, 5MB 이하)을 검사하고 서버에 업로드한다
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

        // 업로드가 끝나면 받은 주소를 상태에 저장해 미리 보여준다
        try {
            const { url } = await postImage(file);
            setImageUrl(url);
        } catch {
            alert("이미지 업로드에 실패했어요.");
        }
        e.target.value = ""; // 같은 파일을 다시 고를 수 있도록 선택 초기화
    };

    // 수정 완료 : 입력한 내용을 서버에 저장하고 목록 페이지로 이동
    const handleSave = async () => {
        if (!name.trim()) return; // 이름이 비어 있으면 저장하지 않는다
        await patchTodo(todo.id, { name, memo, imageUrl: imageUrl || undefined, isCompleted });
        router.push("/");
    };

    // 삭제하기 : 서버에서 삭제하고 목록 페이지로 이동
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
