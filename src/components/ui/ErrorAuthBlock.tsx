import cn from "classnames";

interface ErrorProps {
  error?: object | undefined | null | string;
  text: string;
}
export default function ErrorAuthBlock({ error, text }: ErrorProps) {
  return (
    <>
      <div
        className={cn(
          "flex flex-col items-center p-[20px] mb-[30px] bg-[#FFC529] text-white duration-500",
          { ["opacity-0 "]: !error, ["opacity-100"]: error }
        )}
      >
        <h2>{text}</h2>
      </div>
    </>
  );
}
