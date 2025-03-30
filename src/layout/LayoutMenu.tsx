import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

import cn from "classnames";
import { exitIcon } from "../icons/exit-icon";
import { grayCart } from "../icons/cart-icon";
import menuIcon from "../icons/menu-icon";
import { loginIcon } from "../icons/login-icon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../storage/store";
import { getProfile, userActions } from "../storage/user.slice";
import { useEffect } from "react";
import { logoutUser } from "../icons/logoutUser-icon";

export default function LayoutMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { profile, jwt } = useSelector((s: RootState) => s.user);
  const items = useSelector((s: RootState) => s.cart.items);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const logoutClick = () => {
    dispatch(userActions.logout());
    navigate("/");
  };

  const loginClick = () => {
    navigate("/auth/login");
  };

  return (
    <div className="flex h-screen ">
      <div className="w-[260px] h-full border-r-[1px] border-[#D4D6E0] p-[30px]">
        {jwt ? (
          <img src="\img\userLogo.svg" className="mb-[20px]" />
        ) : (
          logoutUser
        )}

        <h2 className="text-black text-xl font-bold">
          {jwt ? profile?.name : "Аноним"}
        </h2>
        <h3 className="text-gray text-[14px]  font-normal">
          {jwt ? profile?.email : "Ваша почта"}
        </h3>

        <div className="flex flex-col mt-11 gap-[37px]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn("flex justify-between w-[84px] ", {
                ["text-orangeMain"]: isActive,
              })
            }
          >
            {menuIcon}
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
          {items.reduce((acc, item) => (acc += item.count), 0)}
        </div>

        <Button
          appearance="exit"
          className=" flex items-center justify-center absolute bottom-[30px]"
        >
          {JSON.parse(localStorage.getItem("userData")!).jwt !== null ? (
            <div className="flex gap-[9px]" onClick={logoutClick}>
              {exitIcon}
              <h2 className="mt-[2px]">Выйти</h2>
            </div>
          ) : (
            <div className="flex gap-[9px]" onClick={loginClick}>
              {loginIcon}
              <h2 className="mt-[2px]">Войти</h2>
            </div>
          )}
        </Button>
      </div>
      <div className="w-full px-[60px] pt-8 h-full">
        <Outlet />
      </div>
    </div>
  );
}
