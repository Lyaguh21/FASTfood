import Button from "./Button";

export default function UsePromo() {
  return (
    <div className="w-full mt-[30px] rounded-full border-[1px] border-[#EEE] pl-[17px]  pr-[11px] py-3 flex justify-between">
      <input type="text" placeholder="Промокод" className="outline-none" />
      <Button appearance="base">Применить</Button>
    </div>
  );
}
