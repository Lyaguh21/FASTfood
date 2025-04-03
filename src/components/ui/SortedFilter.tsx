import { ChangeEvent } from "react";

interface filterProps {
  sortCriteria?: string;
  handleSortChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}
export default function SortedFilter({
  sortCriteria,
  handleSortChange,
}: filterProps) {
  return (
    <select
      value={sortCriteria}
      onChange={handleSortChange}
      className="w-64 h-[51px] rounded-[10px] p-2 text-gray bg-[#FCFCFD] border-[#EFEFEF] border-[1px] outline-none"
    >
      <option value="name_asc">Имя (А-Я)</option>
      <option value="name_desc">Имя (Я-А)</option>
      <option value="price_asc">Цена (по возрастанию)</option>
      <option value="price_desc">Цена (по убыванию)</option>
      <option value="rating_asc">Рейтинг (по возрастанию)</option>
      <option value="rating_desc">Рейтинг (по убыванию)</option>
    </select>
  );
}
