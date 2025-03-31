import { ChangeEvent, useEffect, useState } from "react";
import Search from "../../components/ui/Search";
import Title from "../../components/ui/Title";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import axios, { AxiosError } from "axios";
import MenuList from "../../components/templates/MenuList";
import Loading from "../../components/ui/Loading";
import ErrorElement from "../../components/ui/ErrorElement";
import cn from "classnames";
import NoFound from "../../components/ui/NoFound";

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    getMenu(filter);
  }, [filter]);

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const clearFilter = () => {
    setFilter("");
    getMenu();
  };

  // // Обработка запроса из БД
  const getMenu = async (name?: string) => {
    try {
      setIsLoading(true);

      //Таймер загрузки на 2 секунды, по фану для теста
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      });

      const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
        params: { name },
      });
      setProducts(data);
      setIsLoading(false);
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.message);
      }
      setIsLoading(false);
      return;
    }
  };

  return (
    <>
      <div className="w-full flex justify-between mb-[40px]">
        <Title>Меню</Title>
        <Search onChange={updateFilter} clear={clearFilter} />
      </div>
      <div className={cn("flex flex-wrap gap-x-[60px] gap-y-7")}>
        {!isLoading && products.length > 0 && <MenuList products={products} />}
        {products.length === 0 && <NoFound />}
        {isLoading && <Loading />}
        {error && <ErrorElement />}
      </div>
    </>
  );
}
