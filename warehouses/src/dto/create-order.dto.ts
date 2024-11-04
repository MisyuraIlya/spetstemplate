export class CreateOrderDto {
    userId: string

    cart: {
      quantity: number

      price: number

      discount: number

      total: number

      product: {
        id: string
      }
    }[]
  
  }