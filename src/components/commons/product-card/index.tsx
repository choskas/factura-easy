import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { ProductCardProps } from "./types";

const ProductCard = ({
  productKey,
  sku,
  price,
  description,
  onDelete,
  buttonText,
  onClick,
  isDisabledButton = false,
  customComponent,
}: ProductCardProps) => {
  return (
    <Card className="p-[24px] mb-[24px] relative">
      {onDelete && (
        <Trash
          onClick={() => onDelete()}
          size={18}
          className="text-red-400 absolute right-[24px] top-[24px]"
        />
      )}

      <p className="font-description mb-[8px]">
        {productKey} | <span>{sku}</span>
      </p>
      <p className="font-caption max-h-[40px] overflow-y-auto">{description}</p>
      {price && (
        <p className="font-title text-[#077DBF] text-center my-[24px]">
          ${price}
          <span className="text-black font-subtitle dark:text-white"> MXN</span>
        </p>
      )}
      {customComponent && customComponent}
{buttonText && onClick && (
      <Button
      disabled={isDisabledButton}
      variant="outline"
      className="uppercase w-full"
      onClick={() => onClick()}
    >
      {" "}
      {buttonText}{" "}
    </Button>
)}

    </Card>
  );
};
export default ProductCard;
