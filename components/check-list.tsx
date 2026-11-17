import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    isCompleted?: boolean;
    onToggle?: () => void;
    href: string;
}

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
            <button type="button" onClick={onToggle} className="cursor-pointer">
                <img
                    src={isCompleted ? "/icon/checkbox-checked.svg" : "/icon/checkbox.svg"}
                    alt=""
                    className="w-8 h-8 shrink-0"
                />
            </button>
            <Link href={href} className={twMerge("flex-1", isCompleted && "line-through")}>
                {children}
            </Link>
        </div>
    );
}

export default CheckList;
