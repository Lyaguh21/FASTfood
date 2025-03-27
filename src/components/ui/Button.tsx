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
        "bg-orangeMain hover:bg-orangeHover active:bg-orangeMain text-white text-base font-normal rounded-full  ",
        {
          ["w-[248px] h-[60px] uppercase font-semibold "]: appearance == "big",
          ["w-[116px] h-[43px]  "]: appearance == "exit",
          ["w-[34px] h-[34px] flex justify-center items-center rounded-full"]:
            appearance == "nav",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
