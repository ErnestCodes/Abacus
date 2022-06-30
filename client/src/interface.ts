export interface authState {
  user: object | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

export interface productState {
  products: [];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
