export interface SearchProduct {
  id: string
  name: string
  category: string
  image: string
  price: number | null
  displayPrice: string | null
  description: string
  specs: Record<string, string>
  shipping: string[]
  productUrl: string
}

export interface SearchProductsResult {
  found: boolean
  products: SearchProduct[]
}
