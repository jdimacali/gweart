import Spin from "@/components/Spin";
import ProductCard from "./ProductCard";

interface Products {
  products: {
    id: number;
    attributes: {
      name: string;
      price: number;
      description: string;
      availablitiy: boolean;
      image: {
        data: [
          {
            id: number;
            attributes: {
              url: string;
            };
          }
        ];
      };
      categories: {
        data: [
          {
            id: number;
            attributes: {
              name: string;
            };
          }
        ];
      };
    };
  }[];
  loading: boolean;
}

const ProductList = ({ products, loading }: Products) => {
  console.log(products);
  return (
    <div className="flex flex-col gap-y-10">
      <div className="text-3xl font-bold ">
        {products.length == 1
          ? products[0].attributes.categories.data[0].attributes.name
          : "All Items"}
      </div>

      {products!.length === 0 && !loading ? (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No products were found
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              image={product.attributes.image.data[0].attributes.url}
              id={product.id}
              name={product.attributes.name}
              price={product.attributes.price}
              description={product.attributes.description}
              categories={product.attributes.categories}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default ProductList;
