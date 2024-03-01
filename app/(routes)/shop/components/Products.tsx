import queryString from "query-string";
import ProductCard from "./ProductCard";
import { usePathname, useSearchParams } from "next/navigation";
import PaginationBar from "./PaginationBar";
import Spin from "@/components/Spin";

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
  metadata: any;
}

const ProductList = ({ products, metadata, loading }: Products) => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  let page = searchParams.get("page");
  const pathname = usePathname();

  const nextUrl = queryString.stringifyUrl(
    {
      url: pathname,
      query: {
        categoryId: categoryId,
        page: page ? parseInt(page) + 1 : 2,
      },
    },
    { skipNull: true, skipEmptyString: true }
  );

  const prevUrl = queryString.stringifyUrl(
    {
      url: pathname,
      query: {
        categoryId: categoryId,
        page: page ? parseInt(page) - 1 : 2,
      },
    },
    { skipNull: true, skipEmptyString: true }
  );

  return (
    <div className="flex flex-col gap-y-10">
      <div className="text-3xl font-bold ">
        {categoryId
          ? products[0].attributes.categories.data[0].attributes.name
          : "All Items"}
      </div>
      {loading && (
        <div className="flex justify-center items-center">
          <Spin />
        </div>
      )}
      {!loading && products.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No products were found
        </div>
      )}
      {!loading && products.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
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
      {!loading && (
        <PaginationBar
          metadata={metadata}
          nextUrl={nextUrl}
          prevUrl={prevUrl}
          categoryId={categoryId}
        />
      )}
    </div>
  );
};

export default ProductList;
