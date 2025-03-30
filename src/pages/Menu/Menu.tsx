import { useEffect, useState } from "react";
import Search from "../../components/ui/Search";
import Title from "../../components/ui/Title";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import axios, { AxiosError } from "axios";
import MenuList from "../../components/templates/MenuList";
import Loading from "../../components/ui/Loading";
import ErrorElement from "../../components/ui/ErrorElement";

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  // // Обработка запроса из БД

  const getMenu = async () => {
    try {
      setIsLoading(true);

      //Таймер загрузки на 2 секунды, по фану для теста
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 800);
      });

      const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
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

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <div className="w-full flex justify-between mb-[40px]">
        <Title>Меню</Title>
        <Search />
      </div>
      <div className="flex justify-evenly gap-4 flex-wrap">
        {!isLoading && <MenuList products={products} />}
        {isLoading && <Loading />}
        {error && <ErrorElement />}
      </div>
    </>
  );
}
