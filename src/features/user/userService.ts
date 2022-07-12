import axios from "axios";
import Cookies from "js-cookie";

// LoadUser
const loadingUser = async () => {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "x-refresh": `${refreshToken}`,
    },
  };
  try {
    const res = await axios.get("/api/me", config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  loadingUser,
};

export default userService;
