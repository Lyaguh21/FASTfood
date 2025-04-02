import { useSelector } from "react-redux";
import CartCard from "../../components/templates/CartCard";
import Title from "../../components/ui/Title";
import { RootState } from "../../storage/store";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/product.interface";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import Input from "../../components/ui/Input";
import UsePromo from "../../components/ui/UsePromo";

export default function Cart() {
  const [cartProduct, setCartProduct] = useState<Product[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);

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
                return (
                  <CartCard
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    count={i.count}
                  />
                );
              }
            })}
          </div>
          <UsePromo />
        </div>
      </div>
    </>
  );
}
