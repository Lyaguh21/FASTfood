import { Link } from "react-router-dom";
import { whiteCart } from "../../icons/cart-icon";
import Button from "../ui/Button";
import Rating from "../ui/Rating";
import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../storage/store";
import { cartAction } from "../../storage/cart.slice";

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
  const dispatch = useDispatch<AppDispatch>();
  const add = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartAction.add(id));
  };

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
        <Button appearance="nav" onClick={add}>
          {whiteCart}
        </Button>
      </div>

      <div
        className="rounded-[18px] h-[165px] relative bg-no-repeat bg-cover"
        style={{ backgroundImage: `url('${image}')` }}
      >
        <Rating rating={rating} className="mt-[151px]" />
      </div>
      <div className="px-3 py-4 flex flex-col ">
        <h2 className="text-black text-[18px] font-semibold">{title}</h2>
        <h2 className="text-sm font-normal text-textGray">{description}</h2>
      </div>
    </Link>
  );
}
