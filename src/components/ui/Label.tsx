import { ReactNode } from "react";

export default function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="text-[#C4C4C4]">
      {children}
    </label>
  );
}
