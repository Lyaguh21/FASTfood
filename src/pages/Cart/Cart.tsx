import { useSelector } from "react-redux";
import CartCard from "../../components/templates/Cart/CartCard";
import Title from "../../components/ui/Title";
import { RootState } from "../../storage/store";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/product.interface";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import UsePromo from "../../components/ui/UsePromo";
import CartBlockPrice from "../../components/templates/Cart/CartBlockPrice";
import Button from "../../components/ui/Button";
import { NavLink } from "react-router-dom";

export default function Cart() {
  const [cartProduct, setCartProduct] = useState<Product[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);

  const deliveryPrice = 169;
  let allPrice = 0;

  const getItem = async (id: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const res = await Promise.all(items.map((i) => getItem(i.id)));
    setCartProduct(res);
  };

  useEffect(() => {
    loadAllItems();
  }, [items]);

  const approvedForm = () => {
    setCartProduct([]);
  };

  return (
    <>
      <div className="w-full mb-[40px]">
        <Title>Корзина</Title>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="scroll h-[300px] px-4   overflow-y-scroll  flex flex-col gap-[25px]">
            {items.length == 0 && (
              <div className="w-[500px] h-[300px] flex justify-center items-center">
                <h2 className="text-orangeMain text-[25px] font-semibold">
                  Корзина пока что пуста
                </h2>
              </div>
            )}
            {items.map((i) => {
              const product = cartProduct.find((p) => p.id == i.id);
              if (product) {
                allPrice += i.count * product.price;
                return (
                  <CartCard
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    count={i.count}
                    id={i.id}
                  />
                );
              }
            })}
          </div>
          <UsePromo />
          <div className="mt-[30px] w-full flex-col flex">
            <CartBlockPrice left="Итог" right={allPrice} />
            <CartBlockPrice left="Доставка" right={deliveryPrice} />
            <CartBlockPrice left="Итог" right={allPrice + deliveryPrice} />
          </div>
          <div className="flex justify-center mt-[35px]">
            <NavLink to={"/approved"}>
              <Button appearance="big" onClick={approvedForm}>
                Оформить
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
