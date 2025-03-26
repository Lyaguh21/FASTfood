import { Link, Outlet } from "react-router-dom";
import Button from "../components/ui/Button";
import { exitIcon } from "../../public/ico/exit-icon";

export default function LayoutMenu() {
  return (
    <div className="flex h-screen">
      <div className="w-[240px] h-full border-r-[1px] border-[#D4D6E0] p-[30px]">
        <img src="\img\userLogo.svg" className="mb-[20px]" />
        <h2 className="text-black text-xl font-bold">Антон Ларичев</h2>
        <h3 className="text-gray text-[14px]  font-normal">alaricode@ya.ru</h3>

        <div className="flex flex-col mt-11 gap-[37px]">
          <Link to="/" className="flex justify-between w-[84px]">
            <img src="\ico\menu-icon.svg" />
            <h2 className="text-black font-normal">Меню</h2>
          </Link>
          <Link to="/cart" className="flex justify-between w-[104px]">
            <img src="\ico\cart-icon.svg" />
            <h2 className="text-black font-normal">Корзина</h2>
          </Link>
        </div>
        <Button className="mt-[423px] w-[117px] h-[43px] flex items-center justify-center">
          <div className="flex gap-[9px]">
            {exitIcon}
            <h2>Выйти</h2>
          </div>
        </Button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
