import Image from "next/image";
import useCart from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format";
import { toast } from "@/components/ui/use-toast";

interface CartItemProps {
  data: any;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.product.id);
    toast({ title: "Item removed from cart", description: data.product.name });
  };

  console.log(data.product.id);
  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.product.image}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <button onClick={onRemove}> X </button>
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">
              {data.product.name}
            </p>
          </div>
          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">
              {data.product.categories.data.map(
                (category: { attributes: { name: string } }) =>
                  category.attributes.name
              )}
            </p>
          </div>
          {formatPrice(data.product.price)}
        </div>
      </div>
    </li>
  );
};

export default CartItem;
