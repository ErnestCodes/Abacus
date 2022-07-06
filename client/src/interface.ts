export interface authState {
  user: object | null;
  accessToken: string | null;
  refreshToken: string | null;
  // loadedUser: {} | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

export interface productState {
  products: [];
  allProducts: [];
  isProductError: boolean;
  isProductSuccess: boolean;
  isProductLoading: boolean;
  productMessage: string;
}
