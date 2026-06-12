import axios from "axios";
axios;
export const axiosAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000, //10s
});

export const userLogin = async (userData) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/login",
      userData,
      { withCredentials: true }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("fubl");
    console.log(error);
    throw error;
  }
};

export const userSignup = async (userData) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/signup",
      userData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const requestAccessToken = async () => {
  try {
    const response = await axiosAPI.post("/refresh-token", {});

    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
