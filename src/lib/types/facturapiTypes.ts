export interface ProductsFacturAPI {
    _id: string
    organization: string
    livemode: boolean
    product_key: string
    description: string
    price: number
    created_at: string
    tax_included: boolean
    taxes: String[]
    local_taxes: [] | String[]
    unit_key: string
    sku: string
    unit_name: string
    __v: number
    id: string
}