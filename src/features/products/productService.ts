import axios from "axios";

const API_URL = "https://abacus-webserver.herokuapp.com/api/products/";

// Create new goal
const createProduct = async (productData: any) => {
  const accessToken = await JSON.parse(
    localStorage.getItem("accessToken") as string
  );
  const refreshToken = await JSON.parse(
    localStorage.getItem("refreshToken") as string
  );
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "x-refresh": `${refreshToken}`,
    },
  };

  const response = await axios.post(API_URL, productData, config);
  console.log(response.data);

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
      // "x-refresh": `${refreshToken}`,
    },
  };

  const response = await axios.post(
    `https://abacus-webserver.herokuapp.com/api/products/${productId}`,
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

  const response = await axios.get(
    `https://abacus-webserver.herokuapp.com/api/products/${productId}`,
    config
  );

  return response.data;
};

// Get all Products
const getAllProduct = async () => {
  const res = await axios.get(
    "https://abacus-webserver.herokuapp.com/api/products"
  );
  // console.log(res.data);
  return res.data;
};

// Delete a product
const deleteProduct = async (
  productId: string,
  accessToken: any,
  refreshToken: any
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "x-refresh": `${refreshToken}`,
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
