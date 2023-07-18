import facturaApiInstance from "./config/facturaApi"

export const postNewReceipt = async () => {
    try {
        const response = await facturaApiInstance.post('receipts', {
            "items": [
              {
                "quantity": 1,
                "product": {
                  "description": "Ukelele",
                  "product_key": "60131325",
                  "price": 345.6,
                //   "tax_included": true,
                //   "taxability": "01",
                //   "taxes": [
                //     {
                //       "type": "IVA",
                //       "rate": 0.16
                //     }
                //   ],
                //   "local_taxes": [],
                //   "unit_key": "H87",
                //   "unit_name": "Elemento",
                //   "sku": "string"
                },
                "third_party": {
                  "legal_name": "The Michael Scott Paper Company",
                  "tax_id": "MIC920101HN7",
                  "tax_system": "601",
                  "zip": "01234"
                },
                "property_tax_account": "0102030406"
              }
            ],
            // "date": "2021-09-10T15:21:23.456Z",
            "payment_form": "03",
            // "folio_number": 1234,
          })
    
          return response.data
    } catch (error) {
        return error
    }
}

export const getAllReceipts = async () => {
    try {
        const response = await facturaApiInstance.get('receipts')
  
        return response.data
    } catch (error) {
        return error
    }
}

export const sendReceiptMail = async () => {
    try {
        const response = await facturaApiInstance.post('receipts//email', {
            email: "choskasdelta@gmail.com"
            })
    } catch (error) {
        return error
    }
}