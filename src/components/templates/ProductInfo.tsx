import { Await, useLoaderData } from "react-router-dom";
import { Product } from "../../interfaces/product.interface";
import { Suspense } from "react";
import Loading from "../ui/Loading";
import ErrorElement from "../ui/ErrorElement";

export default function ProductInfo() {
  const data = useLoaderData() as Product;
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await resolve={data} errorElement={<ErrorElement />}>
          {(resolvedData: Product) => (
            <div>Product Name: {resolvedData.name}</div>
          )}
        </Await>
      </Suspense>
    </>
  );
}
