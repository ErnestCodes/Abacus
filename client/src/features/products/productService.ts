import axios from "axios";

const API_URL = "/api/products/";

// Create new goal
const createProduct = async (productData: object, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, productData, config);

  return response.data;
};

// Update products
const updateProduct = async (
  productId: string,
  productData: object,
  token: any
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `/api/products/${productId}`,
    productData,
    config
  );

  return response.data;
};

// Get user products
const getProducts = async (token: any, productId: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`/api/products/${productId}`, config);

  return response.data;
};

// Get all Products
const getAllProduct = async () => {
  const res = await axios.get("/api/products");
  // console.log(res.data);
  return res.data;
};

// Delete user goal
const deleteProduct = async (productId: string, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + productId, config);

  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getAllProduct,
};

export default productService;
