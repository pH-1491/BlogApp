import {type ButtonHTMLAttributes, type ReactNode} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    type?: "button" | "submit" | "reset";
    bgColor?: string;
    textColor?: string;
    className?: string;
}

export default function Button({
                                   children,
                                   type = "button",
                                   bgColor = "bg-blue-600",
                                   textColor = "text-white",
                                   className = "",
                                   ...props
                               }: ButtonProps) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
