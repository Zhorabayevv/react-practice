export enum SortType {
    POPULAR = "popular",
    PRICE = "price",
    ALPHABET = "alphabet",
  }
  
  export interface SortInterface {
    id: string;
    name: string;
    type: SortType;
  }
  
  export interface FilterInterface {
    searchValue: string;
    activeCategories: number;
    sort: SortInterface;
    pageCount: number;
  }
  export interface FilterInterface2 {
    searchValue: string;
    activeCategories: number;
    sortBy: SortType;
    sort: SortInterface;
    pageCount: number;
  }