import Link from "next/link";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import { API_URL } from "@/lib/utils";

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
  return (
    <Link href={`/shop/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border border-gray-200 rounded-lg h-full hover:opacity-90">
        <div className="relative w-full h-80 rounded-md overflow-hidden">
          <Image
            src={`${image}`}
            alt={name}
            fill
            priority
            className="object-cover group-hover:scale-105 transition"
            quality={100}
            placeholder="blur"
            blurDataURL="/background/blur.png"
          />
        </div>
        <div className="flex flex-col pt-2 w-80 p-4 bg-amber-50/10">
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
      </div>
    </Link>
  );
};
export default ProdcutCard;
