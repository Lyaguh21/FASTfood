import { Await, NavLink, useLoaderData } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";
import { Suspense } from "react";
import Loading from "../ui/Loading";
import ErrorElement from "../ui/ErrorElement";
import Button from "../ui/Button";
import { backItem } from "../../icons/back-icon";
import Title from "../ui/Title";
import { whiteCart } from "../../icons/cart-icon";
import Rating from "../ui/Rating";

export default function ProductInfo() {
  const data = useLoaderData() as Product;
  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={data} errorElement={<ErrorElement />}>
        {(resolvedData: Product) => (
          <>
            <section className="flex justify-between">
              <div className="flex gap-[36px] items-center">
                <NavLink to={"/"}>
                  <Button appearance="nav">{backItem}</Button>
                </NavLink>
                <Title>{resolvedData.name}</Title>
              </div>
              <Button
                appearance="base"
                className="flex items-center justify-center gap-[14px]"
              >
                {whiteCart}
                <h2>В корзину</h2>
              </Button>
            </section>
            <div className="flex mt-[41px]  gap-[40px]">
              <div
                className="w-[323px] h-[248px] rounded-[18px] bg-no-repeat bg-cover "
                style={{ backgroundImage: `url('${resolvedData.image}')` }}
              />
              <div className="w-[200px] flex flex-col gap-2">
                <div className="w-full border-b-[1px] py-[8px] border-gray flex justify-between text-xl font-semibold">
                  <h2 className="">Цена</h2>
                  <h2 className="font-medium">
                    {resolvedData.price}
                    <span className="text-gray text-lg"> ₽</span>
                  </h2>
                </div>

                <div className="flex justify-between py-3">
                  <h2 className="text-xl font-semibold">Рейтинг</h2>
                  <Rating rating={resolvedData.rating} className="ml-[150px]" />
                </div>

                <div>
                  <h2 className="text-[#5B5B5E] text-[15px] font-semibold mb-3">
                    Состав:
                  </h2>
                  <ul className="list-disc text-[#5B5B5E] pl-[16px]">
                    {resolvedData.ingredients.map((e) => (
                      <li
                        className="text-[15px] capitalize"
                        key={resolvedData.ingredients.indexOf(e)}
                      >
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </Await>
    </Suspense>
  );
}
