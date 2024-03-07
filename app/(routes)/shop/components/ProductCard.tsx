import Link from "next/link";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import { ShoppingBasketIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { toast } from "@/components/ui/use-toast";

interface ProdcutCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
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
}

const ProdcutCard = ({
  id,
  price,
  image,
  name,
  categories,
}: ProdcutCardProps) => {
  const cart = useCart();

  const onAddToCart = (event: any) => {
    event.preventDefault();

    cart.addItem({
      product: { id: String(id), name, price, image, categories },
      quantity: 1,
    });

    toast({
      title: "Item added to cart!",
      description: `${1} ${name}`,
    });
  };

  return (
    <Link href={`/shop/${id}`}>
      <div className=" group hover:shadow-sm transition overflow-hidden border border-gray-200 rounded-lg h-full hover:opacity-90">
        <div className="relative w-full h-80 rounded-md overflow-hidden aspect-square">
          <Image
            src={`${image}`}
            alt={name}
            fill
            priority
            className="object-cover group-hover:scale-105 transition"
            quality={100}
          />
        </div>
        <div className="flex justify-between pt-2 w-full p-4 bg-amber-50/10">
          <div>
            <div className="text-xl font-medium group-hover:scale-105 transition line-clamp-2">
              {name}
            </div>
            <p className="flex opacity-80 text-md md:text-sm font-medium text-muted-foreground group-hover:scale-105 transition">
              {categories.data.map((category) => category.attributes.name)}
            </p>
            <p className="text-md md:text-sm font-medium group-hover:scale-105 transition">
              {formatPrice(price)}
            </p>
          </div>
          <Button
            className="place-self-end border rounded-full p-2 border-gray-300 hover:border-gray-400 "
            onClick={onAddToCart}
          >
            <ShoppingBasketIcon />
          </Button>
        </div>
      </div>
    </Link>
  );
};
export default ProdcutCard;