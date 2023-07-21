"use client"
import { ProductsFacturAPI } from "@/lib/types/facturapiTypes"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { ReloadIcon } from "@radix-ui/react-icons"

const ProductCard = ({product, onDelete, isDisabledButton}: {product: ProductsFacturAPI, onDelete: () => void, isDisabledButton: boolean}) => {
    return (
        <Card key={product._id} className="p-[24px]">
        <p>{product.sku}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <Button variant="destructive" onClick={() => onDelete()}>  {isDisabledButton && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}Eliminar</Button>
      </Card>
    )
}

export default ProductCard