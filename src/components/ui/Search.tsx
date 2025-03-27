import { forwardRef, InputHTMLAttributes } from "react";
import cn from "classnames";

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
}

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  { isValid = true, ...props }: SearchProps,
  ref
) {
  return (
    <div
      className={cn(
        "flex justify-between w-64 h-[51px] rounded-[10px] p-4 bg-[#FCFCFD] border-[#EFEFEF] border-[1px] gap-3",
        {
          ["border-orangeMain"]: !isValid,
        }
      )}
    >
      <img src="src\icons\search.svg" />
      <input
        ref={ref}
        type="text"
        className="outline-none h-[19px] bg-[#FCFCFD]"
        placeholder="Поиск"
        {...props}
      />
    </div>
  );
});

export default Search;
