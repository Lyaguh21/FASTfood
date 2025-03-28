import cn from "classnames";
import { starIcon } from "../../icons/star-icon";

export default function Rating({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-[51px] h-[29px] rounded-full bg-white gap-1 flex items-center justify-center absolute  mx-3 z-10 shadow-[0px_6.07px_24.29px_#FE724C33]",
        className
      )}
    >
      <h2 className="text-[12px] leading-3 text-[#111719] font-semibold">
        {rating}
      </h2>
      {starIcon}
    </div>
  );
}
