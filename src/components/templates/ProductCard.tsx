import { Link } from "react-router-dom";
import { whiteCart } from "../../icons/cart-icon";
import Button from "../ui/Button";
import cn from "classnames";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  rating: number;
}

export default function ProductCard({
  id,
  title,
  price,
  image,
  description,
  rating,
}: ProductCardProps) {
  return (
    <Link
      to={`/product/${id}`}
      className="rounded-[18px] shadow-lg w-[323px] h-[247px] p-0 relative font-openSans"
    >
      <div className=" mt-3 mx-3 z-10 absolute flex justify-between w-[300px]">
        <div className="w-[80px] h-[34px] rounded-full bg-white  flex items-center justify-center">
          <h2 className="text-[20px] text-[#111719] font-normal">
            {price} <span className="text-orangeMain">₽</span>
          </h2>
        </div>
        <Button appearance="nav">{whiteCart}</Button>
      </div>

      <div
        className="rounded-[18px] h-[165px] relative "
        style={{ backgroundImage: `url('${image}')` }}
      >
        <div className="w-[51px] h-[29px] rounded-full bg-white gap-1 flex items-center justify-center absolute mt-[151px] mx-3 z-10 shadow-[0px_6.07px_24.29px_#FE724C33]">
          <h2 className="text-[12px] leading-3 text-[#111719] font-semibold">
            {rating}
          </h2>
          <img src="src\icons\star-icon.svg" alt="" className="h-3 w-3" />
        </div>
      </div>
      <div className="px-3 py-4 flex flex-col gap-1">
        <h2 className="text-black text-[18px] font-semibold">{title}</h2>
        <h2 className="text-sm font-normal text-textGray">{description}</h2>
      </div>
    </Link>
  );
}
