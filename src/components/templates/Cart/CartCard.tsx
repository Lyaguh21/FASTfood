import { useDispatch } from "react-redux";
import { deleteCartItem } from "../../../icons/cross-icon";
import { cartAction } from "../../../storage/cart.slice";
import Button from "../../ui/Button";
import { minus, plus } from "../../../icons/plus-minus-icons";
import { AppDispatch } from "../../../storage/store";

interface CardProps {
  name: string;
  image: string;
  price: number;
  count: number;
  id: number;
}
export default function CartCard({ name, image, price, count, id }: CardProps) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="w-[515px] flex justify-between">
      <div className="flex gap-[20px]">
        <div
          className="w-[82px] h-[82px] rounded-[20px] bg-cover bg-center"
          style={{ backgroundImage: `url('${image}')` }}
        />
        <div>
          <h2 className="font-semibold text-[18px]">{name}</h2>
          <h3 className="text-orangeMain font-semibold">
            {price} <b>₽</b>
          </h3>
        </div>
      </div>
      <div className="flex gap-[17px] items-center">
        <div className="flex gap-[9px]  items-center">
          <Button
            appearance="nav"
            className="bg-white border-[1px] border-orangeMain duration-200"
            onClick={() => {
              dispatch(cartAction.minusItem(id));
            }}
          >
            <div>{minus}</div>
          </Button>
          <h2 className="font-semibold">
            {count < 10 ? `0${count}` : `${count}`}
          </h2>
          <Button
            appearance="nav"
            onClick={() => {
              dispatch(cartAction.add(id));
            }}
          >
            {plus}
          </Button>
        </div>
        <div className="hover:opacity-65">{deleteCartItem}</div>
      </div>
    </div>
  );
}
