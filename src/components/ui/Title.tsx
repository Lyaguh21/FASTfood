import cn from "classnames";
import { HTMLAttributes, ReactNode } from "react";

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export default function Title({ className, children, ...props }: TitleProps) {
  return (
    <p
      className={cn("text-4xl font-semibold font-openSans", className)}
      {...props}
    >
      {children}
    </p>
  );
}
