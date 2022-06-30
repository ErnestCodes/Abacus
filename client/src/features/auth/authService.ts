import axios from "axios";
import { useDispatch } from "react-redux";
import setAuthToken from "../../utils/setAuthToken";

const API_URL = "/api/sessions/";

// // Register user
// const register = async (userData: []) => {
//   const response = await axios.post(API_URL, userData);

//   if (response.data) {
//     console.log(response.data);
//     // localStorage.setItem('user', JSON.stringify(response.data))
//   }

//   return response.data;
// };
// LoadUser
const loadUser = async (token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  };
  try {
    const res = await axios.get("/api/me", config);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.warn(error);
  }
};

// Login user
const login = async (userData: object) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    setAuthToken(response.data);
    localStorage.setItem("token", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("token");
};

const authService = {
  // register,
  loadUser,
  logout,
  login,
};

export default authService;
