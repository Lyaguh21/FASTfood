import { Link, Outlet } from "react-router-dom";
import Button from "../components/ui/Button";
import { backItem } from "../icons/back-icon";

export default function LayoutRegister() {
  return (
    <div className="flex h-screen w-full relative">
      <Link to={"/"} className="z-30 absolute mt-5 ml-5">
        <Button appearance="nav">{backItem}</Button>
      </Link>
      <div className="basis-1/2 border-r-[1px] border-[#D4D6E0] flex justify-center items-center ">
        <img src="\img\LogoAuth.svg" alt="" />
      </div>
      <div className="basis-1/2">
        <Outlet />
      </div>
    </div>
  );
}
