import { connection } from "next/server";
import { getTodo } from "@/api/api";
import Button from "@/components/button";

export default async function ItemDetailPage({ params }: { params: Promise<{ itemId: string }> }) {
    await connection();
    const { itemId } = await params;
    const todo = await getTodo(Number(itemId));

    return (
        <div className="bg-slate-50">
            <main className="mx-auto min-h-[calc(100vh-60px)] max-w-[1200px] bg-white px-4 py-4 md:px-6 md:py-6 lg:px-[102px] lg:py-6">
                {/* 이름 칸 */}
                <div
                    className={`flex h-16 items-center justify-center gap-4 rounded-3xl border-2 border-slate-900 ${
                        todo.isCompleted ? "bg-violet-100" : "bg-white"
                    }`}>
                    <img
                        src={todo.isCompleted ? "/icon/checkbox-checked.svg" : "/icon/checkbox.svg"}
                        alt=""
                        className="h-8 w-8"
                    />
                    <span className="text-[20px] font-bold text-slate-900 underline">
                        {todo.name}
                    </span>
                </div>

                {/* 이미지 칸 + 메모 칸 */}
                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[384px_1fr]">
                    {/* 이미지 칸 */}
                    <div className="relative flex h-[311px] items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50">
                        {todo.imageUrl ? (
                            <img
                                src={todo.imageUrl}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <img src="/image/img.svg" alt="" />
                        )}
                        <button
                            type="button"
                            aria-label="이미지 추가"
                            className="absolute bottom-4 right-4 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-slate-200">
                            <img src="/icon/plus-dark.svg" alt="" className={"h-6 w-6"} />
                        </button>
                    </div>

                    {/* 메모 칸 */}
                    <div className="flex h-[311px] flex-col items-center overflow-hidden rounded-3xl bg-[url('/image/memo.svg')] bg-cover bg-center px-4 py-3">
                        <span className="text-[16px] font-extrabold text-amber-800">Memo</span>
                        <p className="flex flex-1 items-center text-center text-[16px] font-normal text-slate-800">
                            {todo.memo}
                        </p>
                    </div>
                </div>

                {/* 버튼 */}
                <div className="mt-6 flex justify-center gap-4 lg:justify-end">
                    <Button color="gray" icon={<img src="/icon/check.svg" alt="" />}>
                        수정 완료
                    </Button>
                    <Button color="red" icon={<img src="/icon/x.svg" alt="" />}>
                        삭제하기
                    </Button>
                </div>
            </main>
        </div>
    );
}
