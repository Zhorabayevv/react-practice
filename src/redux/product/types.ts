import { SortInterface } from './../filter/types';
export interface FetchProductsInterface {
  pageCountN: string;
  categoryNames: string;
  sort: SortInterface;
  searchItemsName: string;
}

export interface SearchParamsInterface {
  sortBy: string;
  category: string;
  order: string;
  search: string;
  currentPage: string;
}
export enum Status {
  SUCCESS = "success",
  LOADING = "loading",
  FAILED = "failed",
}

export interface GetProductInterface {
  id: string;
  imageUrl: string;
  title: string;
  types: [number];
  sizes: [number];
  price: number;
  category: number;
  rating: number;
}

export interface ItemBlockInterface {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: number[];
  rating: number;
}

export interface ProductInterface {
  products: ItemBlockInterface[];
  status: Status;
}
