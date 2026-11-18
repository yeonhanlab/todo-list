import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    isCompleted?: boolean;
    onToggle?: () => void;
    href: string;
}

// 할 일 한 줄의 모양 : [체크 버튼] + [이름(상세 페이지 링크)]
// onToggle: 체크 버튼을 눌렀을 때, href: 이름을 눌렀을 때 이동할 주소
function CheckList({ isCompleted = false, onToggle, href, className, children, ...props }: Props) {
    return (
        <div
            className={twMerge(
                ["flex items-center gap-4", "w-full h-[50px] pl-3"],
                ["border-[2px] border-slate-900", "rounded-[27px]"],
                ["text-base text-slate-800 text-left"],
                isCompleted ? "bg-violet-100" : "bg-white",
                className,
            )}
            {...props}>
            {/* 체크 버튼: 완료 여부에 따라 아이콘이 바뀐다 */}
            <button type="button" onClick={onToggle} className="cursor-pointer">
                <img
                    src={isCompleted ? "/icon/checkbox-checked.svg" : "/icon/checkbox.svg"}
                    alt=""
                    className="w-8 h-8 shrink-0"
                />
            </button>
            {/* 이름 영역: flex-1로 빈 공간까지 눌러도 이동하고, 완료되면 취소선 */}
            <Link href={href} className={twMerge("flex-1", isCompleted && "line-through")}>
                {children}
            </Link>
        </div>
    );
}

export default CheckList;
