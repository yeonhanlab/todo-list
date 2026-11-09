import React from "react";
import { twMerge } from "tailwind-merge";

type Color = "darkgray" | "gray" | "purple" | "red" | "lime";
type Shape = "pill" | "icon" | "circle";
type Shadow = "pill" | "icon";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: Color;
    shape?: Shape;
    shadow?: Shadow;
    icon?: React.ReactNode;
}

const COLOR_STYLE = {
    darkgray: "bg-slate-900/50",
    gray: "bg-slate-200 text-slate-900",
    purple: "bg-violet-600 text-white",
    red: "bg-rose-500 text-white",
    lime: "bg-lime-300 text-slate-900",
};

const SHAPE_STYLE = {
    pill: "w-[164.35px] h-[52px] rounded-[24px]",
    icon: "w-[54.78px] h-[52px] rounded-[24px]",
    circle: "w-[64px] h-[64px] rounded-full",
};

const SHADOW_STYLE = {
    pill: "shadow-[3.65px_4px_0_#0F172A]",
    icon: "shadow-[1.22px_4px_0_#0F172A]",
};

function Button({
    color = "gray",
    shape = "pill",
    shadow = "pill",
    icon,
    className,
    children,
    ...props
}: Props) {
    return (
        <button
            className={twMerge(
                "inline-flex items-center justify-center gap-1",
                "border-2 border-slate-900 font-bold text-base cursor-pointer",
                "active:translate-x-[1px] active:translate-y-[3px]",
                SHADOW_STYLE[shadow],
                COLOR_STYLE[color],
                SHAPE_STYLE[shape],
                className,
            )}
            {...props}>
            {icon && <span className={twMerge("inline-flex")}>{icon}</span>}
            {children}
        </button>
    );
}

export default Button;

