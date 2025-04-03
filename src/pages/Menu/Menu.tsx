import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
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
import SortedFilter from "../../components/ui/SortedFilter";
import { SortAlphaDown } from "../../icons/sorted-icon";

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>();

  const SearchRef = useRef<any>(null);

  useEffect(() => {
    getMenu(filter);
  }, [filter]);

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const clearFilter = () => {
    setFilter("");
    getMenu();

    SearchRef.current.value = "";
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

  //Сортировка
  const [sortCriteria, setSortCriteria] = useState("name_asc"); // Значение по умолчанию - сортировка по имени по возрастанию

  // Обработчик изменения сортировки
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(e.target.value);
  };

  // Функция сортировки
  const sortedProducts = useMemo(() => {
    const sorted = [...products]; // Создаем копию массива, чтобы не мутировать исходный

    switch (sortCriteria) {
      case "price_asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name_asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating_asc":
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      case "rating_desc":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break; // Ничего не делаем, если критерий не определен
    }

    return sorted;
  }, [products, sortCriteria]); // Зависимости useMemo

  console.log(sortedProducts);
  return (
    <>
      <div className="w-full flex justify-between mb-[40px]">
        <Title>Меню</Title>

        <div className="flex gap-1">
          <SortedFilter
            sortCriteria={sortCriteria}
            handleSortChange={handleSortChange}
          />
          <Search onChange={updateFilter} clear={clearFilter} ref={SearchRef} />
        </div>
      </div>
      <div
        className={cn("flex flex-wrap justify-start gap-x-[60px] gap-y-7", {
          ["justify-evenly"]: products.length >= 3,
        })}
      >
        {!isLoading && products.length > 0 && (
          <MenuList products={sortedProducts} />
        )}
        {products.length === 0 && <NoFound />}
        {isLoading && <Loading />}
        {error && <ErrorElement />}
      </div>
    </>
  );
}
