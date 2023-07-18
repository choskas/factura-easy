import facturaApiInstance from "./config/facturaApi"

export const postNewProduct = async () => {
    try {
        const response = await facturaApiInstance.post('products', {
          "description": "Ukelele",
          "product_key": 60131325,
          "price": 345.6,
          "tax_included": true,
          "taxability": "01",
          "taxes": [
            {
              "type": "IVA",
              "rate": 0.16
            }
          ],
          "local_taxes": [],
          "unit_key": "H87",
          "unit_name": "Elemento",
          "sku": "string"
        })
      
          return response.data
    } catch (error) {
        return error
    }
}