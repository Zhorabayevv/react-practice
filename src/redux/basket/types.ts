export interface ProductInterface {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
  }
  
export interface BasketProductInterface {
    totalPrice: number;
    products: ProductInterface[];
  }