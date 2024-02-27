interface Categories {
  categories?: {
    id: number;
    attributes: {
      name: string;
    };
  }[];
}

const CategoriesMobileSidebar = ({ categories }: Categories) => {
  return (
    <div className="md:hidden block pb-10">
      {categories?.map((category) => (
        <div key={category.attributes.name}>{category.attributes.name}</div>
      ))}
    </div>
  );
};
export default CategoriesMobileSidebar;
