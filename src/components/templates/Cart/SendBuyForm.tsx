import { NavLink } from "react-router-dom";
import Button from "../../ui/Button";

export default function SendBuyForm() {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex flex-col justify-center">
        <img src="\img\buyForm.png" alt="" />
        <h2 className="text-[31px] leading-[120%] mb-[60px] max-w-[323px] self-center text-center">
          Ваш заказ успешно оформлен!
        </h2>

        <NavLink to={"/"} className="self-center">
          <Button appearance="big">Сделать новый</Button>
        </NavLink>
      </div>
    </div>
  );
}
