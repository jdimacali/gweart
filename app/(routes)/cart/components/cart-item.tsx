import Image from "next/image";
import useCart from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format";
import { toast } from "@/components/ui/use-toast";
import clsx from "clsx";
import { X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
  categories: any;
}
interface CartItemProps {
  data: { product: Product; quantity: number };
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const addQuantity = () => {
    cart.addItemQuantity({ ...data });
  };
  const subtractQuantity = () => {
    cart.removeItemQuantity({ ...data });
  };

  const onRemove = () => {
    cart.removeItem(data.product.id);
    toast({ title: "Item removed from cart", description: data.product.name });
  };

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
          <button onClick={onRemove} className="hover:opacity-70">
            <X />
          </button>
        </div>
        <div className="relative pr-9  sm:gap-x-6">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">
              {data.product.name}
            </p>
            <p> x{data.quantity}</p>
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
          <div className="flex gap-x-4 items-center place-content-end md:mt-20">
            <button
              className={clsx(
                " bg-amber-100/30 w-10 h-10 flex items-center justify-center hover:bg-amber-100 transition-colors",
                data.quantity <= 1 && "cursor-not-allowed opacity-50"
              )}
              onClick={subtractQuantity}
              disabled={data.quantity <= 1}
            >
              <span className="text-2xl opacity-80">-</span>
            </button>
            <div>{data.quantity}</div>

            <button
              className=" bg-amber-100/30 w-10 h-10 flex items-center justify-center hover:bg-amber-100 transition-colors"
              onClick={addQuantity}
            >
              <span className="text-2xl opacity-80">+</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
