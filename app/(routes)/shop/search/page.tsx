import Products from "../components/Products";
import getProducts from "@/actions/getProducts";
import getCategories from "@/actions/getCategories";
import SearchParams from "../components/SearchParams";
import SearchInput from "@/components/SearchInput";

interface SearchPageProps {
  searchParams: {
    name: string;
    categoryId: string;
    page: number;
  };
}

const Page = async ({ searchParams }: SearchPageProps) => {
  const categories = await getCategories();
  const products = await getProducts({ ...searchParams });

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex flex-col md:flex-row md:pl-20 xl:px-40">
        <SearchParams categories={categories} />
        <div className="flex flex-col gap-y-6">
          <div>
            <SearchInput />
          </div>
          {products && (
            <Products
              products={products.response}
              metadata={products.metadata}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
