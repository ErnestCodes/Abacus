export interface authState {
  user: object | null;
  accessToken: string | null;
  refreshToken: string | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

export interface userState {
  user: object | null;
  accessToken: string | null;
  refreshToken: string | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

export interface productState {
  products: any[];
  isProductError: boolean;
  isProductSuccess: boolean;
  isProductLoading: boolean;
  productMessage: string;
}
