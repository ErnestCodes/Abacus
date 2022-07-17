import axios from "axios";
import { useDispatch } from "react-redux";
import setAuthToken from "../../utils/setAuthToken";

const API_URL = "https://abacus-webserver.herokuapp.com/api/sessions/";

// LoadUser
const loadUser = async (accessToken: any, refreshToken: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "x-refresh": `${refreshToken}`,
    },
  };
  try {
    const res = await axios.get(
      "https://abacus-webserver.herokuapp.com/api/me",
      config
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Login user
const login = async (userData: object) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem(
      "accessToken",
      JSON.stringify(response.data.accessToken)
    );
    localStorage.setItem(
      "refreshToken",
      JSON.stringify(response.data.refreshToken)
    );
  }

  return response.data;
};

// Logout user
const logout = async (accessToken: any, refreshToken: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "x-refresh": `${refreshToken}`,
    },
  };
  try {
    const res = await axios.delete(API_URL, config);
    return res.data;
  } catch (error) {
    console.log(error);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

const authService = {
  // register,
  loadUser,
  logout,
  login,
};

export default authService;
