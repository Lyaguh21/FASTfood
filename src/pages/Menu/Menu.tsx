import ProductCard from "../../components/templates/ProductCard";
import Search from "../../components/ui/Search";
import Title from "../../components/ui/Title";

export default function Menu() {
  const product = {
    id: 1,
    price: 300,
    title: "Наслаждение",
    description: "Салями, руккола, помидоры, оливки",
    rating: 4.5,
    image: "/img/pizza.svg",
  };

  return (
    <>
      <div className="w-full flex justify-between mb-[40px]">
        <Title>Меню</Title>
        <Search />
      </div>
      <div className="flex gap-[45px] flex-wrap">
        <ProductCard
          id={product.id}
          price={product.price}
          title={product.title}
          description={product.description}
          rating={product.rating}
          image={product.image}
        />
      </div>
    </>
  );
}
