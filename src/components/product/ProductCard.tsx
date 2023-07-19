"use client"
import { ProductsFacturAPI } from "@/lib/types/facturapiTypes"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import axios from "axios"

const ProductCard = ({product}: {product: ProductsFacturAPI}) => {
    const onDelete = async (id: string) => {
        const response = await axios.delete(`/api/product`, {data: {
            product_id: id
        }})
      }
    return (
        <Card key={product._id} className="p-[24px]">
        <p>{product.sku}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <Button variant="destructive" onClick={() => onDelete(product.id)}>Eliminar</Button>
      </Card>
    )
}

export default ProductCard