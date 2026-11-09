import React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

function Search({ className, ...props }: Props) {
    return (
        <input
            type="text"
            placeholder="할 일을 입력해주세요"
            className={twMerge(
                ["w-full h-14 px-6"],
                ["border-2 border-slate-900 rounded-full bg-slate-100"],
                ["text-base text-slate-900 placeholder:text-slate-500"],
                ["shadow-[3.65px_4px_0_#0F172A] outline-none"],
                className,
            )}
            {...props}
        />
    );
}

export default Search;
