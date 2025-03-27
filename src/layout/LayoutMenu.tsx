import { NavLink, Outlet } from "react-router-dom";
import Button from "../components/ui/Button";

import cn from "classnames";
import { exitIcon } from "../icons/exit-icon";
import { grayCart } from "../icons/cart-icon";

export default function LayoutMenu() {
  return (
    <div className="flex h-screen">
      <div className="w-[240px] h-full border-r-[1px] border-[#D4D6E0] p-[30px]">
        <img src="\img\userLogo.svg" className="mb-[20px]" />
        <h2 className="text-black text-xl font-bold">Антон Ларичев</h2>
        <h3 className="text-gray text-[14px]  font-normal">alaricode@ya.ru</h3>

        <div className="flex flex-col mt-11 gap-[37px]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn("flex justify-between w-[84px] ", {
                ["text-orangeMain"]: isActive,
              })
            }
          >
            <img src="src\icons\menu-icon.svg" />
            <h2 className=" font-normal">Меню</h2>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn("flex justify-between w-[104px]", {
                ["text-orangeMain"]: isActive,
              })
            }
          >
            {grayCart}
            <h2 className=" font-normal">Корзина</h2>
          </NavLink>
        </div>

        <Button
          appearance="exit"
          className="mt-[423px] flex items-center justify-center"
        >
          <div className="flex gap-[9px]">
            {exitIcon}
            <h2 className="mt-[1px]">Выйти</h2>
          </div>
        </Button>
      </div>
      <div className="w-full px-[83px] pt-8  h-full">
        <Outlet />
      </div>
    </div>
  );
}
