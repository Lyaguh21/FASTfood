interface BlockProps {
  left: string;
  right: string | number;
}
export default function CartBlockPrice({ left, right }: BlockProps) {
  return (
    <div className="w-full border-b-[1px] border-[#F1F2F3] flex justify-between py-[13px]">
      <h2>{left}</h2>
      <h2 className="text-[19px]">{right}</h2>
    </div>
  );
}
