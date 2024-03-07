import Products from "../components/Products";
import getProducts from "@/actions/getProducts";
import getCategories from "@/actions/getCategories";
import SearchParams from "../components/SearchParams";

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
    <div className="w-full h-full">
      <div className="flex flex-col md:flex-row md:pl-20 xl:px-40">
        <SearchParams categories={categories} />
        {products && (
          <Products products={products.response} metadata={products.metadata} />
        )}
      </div>
    </div>
  );
};

export default Page;
