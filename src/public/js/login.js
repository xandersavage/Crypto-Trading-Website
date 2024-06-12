import axios from "axios";
import { showAlert } from "./alerts";

export const login = async (email, password) => {
  // console.log(email, password)
  try {
    const res = await axios({
      method: "POST",
      url: "/users/login",
      data: {
        email,
        password
      }
    });

    if (res.status === 200) {
      showAlert("success", "Logged in successfully!!");
      const role = res.data.user.role[0]

      window.setTimeout(() => {
        if (role === 'admin') {
          location.assign("/admin");
        }else {
          location.assign("/account");
        }
      }, 2500);
    }
    console.log(res);
  } catch (e) {
    if (e.response && e.response.status === 403) {
        const errorMessage = encodeURIComponent(e.response.data.error);
        location.assign(`/error?message=${errorMessage}`);
    } else {
      showAlert("danger", "Incorrect email or password");
    }
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/users/Logout"
    });
    if (res.status === 200) location.assign("/");
  } catch (e) {
    showAlert("error", "Error logging out");
  }
};
