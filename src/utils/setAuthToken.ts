import axios from "axios";

const setAuthToken = (token: { accessToken: string; refreshToken: string }) => {
  // This function checks for the token and assign it to the header ('x-auth-token')
  if (token) {
    console.log(token);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token.accessToken}`;
    axios.defaults.headers.common["x-refresh"] = token.refreshToken;
  } else {
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["x-refresh"];
  }
};

export default setAuthToken;
