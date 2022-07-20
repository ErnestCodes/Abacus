import axios from "axios";

const API_URL = "http://localhost:1337/api/payment/";

const createPaymentLink = async (cartData: object) => {
  try {
    const response = await axios.post(API_URL, cartData);

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const cartService = {
  createPaymentLink,
};

export default cartService;
