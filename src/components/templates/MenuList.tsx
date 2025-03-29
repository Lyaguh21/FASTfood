import { Product } from "../../interfaces/product.interface";
import ProductCard from "./ProductCard";

interface MenuProps {
  products: Product[];
}
export default function MenuList({ products }: MenuProps) {
  return products.map((e) => (
    <ProductCard
      key={e.id}
      id={e.id}
      price={e.price}
      title={e.name}
      description={e.ingredients.join(", ")}
      rating={e.rating}
      image={e.image}
    />
  ));
}
