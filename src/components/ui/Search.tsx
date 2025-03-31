import { forwardRef, InputHTMLAttributes, MouseEventHandler } from "react";
import cn from "classnames";
import { crossIcon } from "../../icons/cross-icon";

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  clear: MouseEventHandler<HTMLDivElement>;
}

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  { isValid = true, clear, ...props }: SearchProps,
  ref
) {
  return (
    <div
      className={cn(
        "flex justify-between w-64 h-[51px] rounded-[10px] p-4 bg-[#FCFCFD] border-[#EFEFEF] border-[1px] ",
        {
          ["border-orangeMain"]: !isValid,
        }
      )}
    >
      <div className="flex gap-3">
        <img src="src\icons\search.svg" />
        <input
          ref={ref}
          type="text"
          className="outline-none h-[19px] bg-[#FCFCFD]"
          placeholder="Поиск"
          {...props}
        />
      </div>
      <div className="hover:opacity-60" onClick={clear}>
        {crossIcon}
      </div>
    </div>
  );
});

export default Search;
