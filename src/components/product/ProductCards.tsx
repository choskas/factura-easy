"use client";

import { ProductsFacturAPI } from "@/lib/types/facturapiTypes";
import ProductCard from "./ProductCard";
import { useState } from "react";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import EmptyItems from "../commons/EmptyItems";

const ProductCards = ({ data }: { data: ProductsFacturAPI[] }) => {
  const { update } = useSession();
  const router = useRouter();
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const onDelete = async (id: string) => {
    try {
      setIsDisabledButton(true);
      const response = await axios.delete(`/api/product`, {
        data: {
          product_id: id,
        },
      });

      toast({ title: "Se ha borrado el producto" });
      await update();
    } catch (error) {
      return error;
    } finally {
      setIsDisabledButton(false);
    }
  };
  if (data.length === 0)
    return (
      <EmptyItems
        title="Aun no haz agregado un producto."
        to="/product/create"
        buttonText="Agregar producto"
      />
    );
  return (
    <>
      {data.map((item) => (
        <ProductCard
          key={item.id}
          product={item}
          onDelete={() => onDelete(item.id)}
          isDisabledButton={isDisabledButton}
        />
      ))}
    </>
  );
};

export default ProductCards;
