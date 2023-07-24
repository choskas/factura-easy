"use client";

import { ProductsFacturAPI } from "@/lib/types/facturapiTypes";
import { useState, useTransition } from "react";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import EmptyItems from "../commons/EmptyItems";
import CustomerCard from "../commons/client-card";
import ProductCard from "../commons/product-card";
import ModalConfirm from "../commons/modal/ModalConfirm";

const ProductCards = ({ data }: { data: ProductsFacturAPI[] }) => {
  const router = useRouter()
  const { update } = useSession()
  const [isPending, startTransition] = useTransition()
  const [isDisabledButton, setIsDisabledButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [productId, setProductId] = useState<null | string>(null)
  const onDelete = async () => {
    try {
      setIsDisabledButton(true);
      const response = await axios.delete(`/api/product`, {
        data: {
          product_id: productId,
        },
      });

      toast({ title: "Se ha borrado el producto" });
      setIsOpen(false)
      await update();
      startTransition(() => {
        router.refresh();
      });
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
    <h2 className="font-title text-center mb-[24px]">Productos y servicios</h2>
      {data.map((item) => (
        <ProductCard
          key={item.id}
          productKey={item.product_key}
          sku={item.sku} 
          price={item.price} 
          description={item.description} 
          onDelete={() => {setIsOpen(true)
          setProductId(item.id)
          }} 
          buttonText='Ver prodcuto'
          onClick={() => {}}
        />
      ))}
            <ModalConfirm isOpen={isOpen} onCancel={() => setIsOpen(false)} onContinue={onDelete} title="¿Desea borrar el producto?" disableButton={isDisabledButton} />
    </>
  );
};

export default ProductCards;
