import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (email, password) => {
  const {data} = await $host.post("/api/user/registration", {
    email,
    password,
  });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const login = async (email, password) => {
  const data = await $host.post("/api/user/login", {
    email,
    password,
  });
  localStorage.setItem('token', data.data.token);
  return jwtDecode(data.data.token);
};

export const check = async () => {
  const {data} = await $authHost.get("/api/user/auth/");
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const googleLogin = async (googleId, email) =>{
  const {data} = await $host.post("/api/user/google", {googleId, email});
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
}

export const facebookLogin = async (facebookId, email) => {
  console.log(facebookId, email); 
  localStorage.setItem('token', email);
  return "sa";
}