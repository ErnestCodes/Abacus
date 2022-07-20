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
  userAccessToken: string | null;
  userRefreshToken: string | null;
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

export interface cartState {
  items: any[];
  totalAmount: number;
  addSuccess: boolean;
  totalCount: number;
  linkDetails: any[];
  isLinkLoading: boolean;
  linkErrorMsg: string;
  isLinkError: boolean;
}

// export interface addState {
//   image: string;
//   description: string;
//   id: string;
//   user: object | null;
//   price: string;
//   title: string;
// }
