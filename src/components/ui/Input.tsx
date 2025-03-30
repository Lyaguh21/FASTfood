import cn from "classnames";
import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { isValid = true, className, ...props }: InputProps,
  ref
) {
  return (
    <input
      {...props}
      autoComplete="on"
      ref={ref}
      className={cn(
        "outline-none border-[1px] border-[#EEEEEE] shadow-sm rounded-[10px] p-[21px] w-full",
        className,
        {
          ["bg-orangeMain"]: !isValid,
        }
      )}
    />
  );
});
export default Input;
