import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: {
    name: string;
    imageUrl: string[];
    price: number;
    discountPercentage: number;
    imageID: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const originalPrice = product.price;
  const discount = (originalPrice * product.discountPercentage) / 100;
  const discountedPrice = originalPrice - discount;

  return (
    <Link href={`/products/${product.imageID}`} className="block">
      <Card className="w-full max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="p-0 relative">
          {product.discountPercentage > 0 && (
            <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {product.discountPercentage}% OFF
            </div>
          )}
          <Image
            src={product.imageUrl[2]}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover"
          />
          <button className="absolute top-2 right-2 text-gray-600 hover:text-red-500">
            <Heart size={20} />
          </button>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="text-sm text-gray-500 mt-1 line-clamp-2">
            {product.name}
          </CardDescription>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-green-600">
              ₹{discountedPrice.toFixed(2)}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ₹{originalPrice.toFixed(2)}
            </span>
          </div>
          <div className="text-sm text-green-600 mt-1">
            SAVE ₹{discount.toFixed(2)}
          </div>
          <div className="flex justify-center mt-2">
            <div className="flex space-x-1">
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
              <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
