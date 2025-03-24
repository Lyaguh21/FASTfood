import { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  appearance?: string;
}

export default function Button({
  children,
  className,
  appearance,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "bg-orangeMain hover:bg-orangeHover active:bg-orangeMain text-white text-base font-normal rounded-full w-[141px] h-[44px] ",
        {
          ["w-[248px] h-[60px] uppercase font-semibold "]: appearance == "big",
          ["w-auto h-auto"]: appearance == "nav",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
