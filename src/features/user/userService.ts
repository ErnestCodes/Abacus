import axios from "axios";

// LoadUser
const loadingUser = async () => {
  const accessToken = localStorage.getItem("userAccess");
  const refreshToken = localStorage.getItem("userRefresh");
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

const userService = {
  loadingUser,
};

export default userService;
