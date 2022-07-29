import axios from "axios";

const API_URL = "https://abacus-webserver.herokuapp.com/api/order/";

const createOrder = async (orderData: {}) => {
  try {
    const response = await axios.post(API_URL, orderData);

    // console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const orderService = {
  createOrder,
};

export default orderService;
