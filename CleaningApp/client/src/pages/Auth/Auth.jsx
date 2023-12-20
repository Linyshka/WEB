import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { MAIN_ROUTE, REGISTRATION_ROUTE } from "../../utils/constants";
import { login, googleLogin } from "../../http/userApi";
import { Context } from "../..";
import { Snackbar, Alert } from "@mui/material";

import "./Auth.css";

const Auth = observer(() => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    signIn(data);
    reset();
  };
  const [open, setOpen] = useState();
  const [message, setMessage] = useState();
  const navigation = useNavigate();

  const { user } = useContext(Context);

  const signIn = async (data) => {
    try {
      const response = await login(data.email, data.password);
      user.setUser(response);
      user.setIsAuth(true);
      navigation(MAIN_ROUTE);
      return jwtDecode(data.token);
    } catch (err) {
      setOpen(true);
      setMessage(err.response.data.message);
    }
  };
  

  const onSuccess = (credentialResponse) => {
    const profile = jwtDecode(credentialResponse.credential);
    googleLogin(profile.sub, profile.email)
      .then((response) => {
        user.setUser(response);
        user.setIsAuth(true);
        navigation(MAIN_ROUTE);
      })
      .catch((err) => {
        setOpen(true);
        setMessage(err);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className='container auth-container'>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          elevation={6}
          variant='filled'
          onClose={handleClose}
          severity='error'
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <h2>Авторизация</h2>
      <form className='form sign-in-form' onSubmit={handleSubmit(onSubmit)}>
        <input
          type='email'
          className={errors.name && "error"}
          {...register("email", {
            required: "Поле email обязательно",
            pattern: {
              message: "Пожалуйста, введите валидный email",
              value: /^([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})$/,
            },
          })}
          placeholder='Email'
        />
        {errors?.email && (
          <div style={{ color: "red" }}>{errors.email.message}</div>
        )}
        <input
          type='password'
          className={errors.name && "error"}
          {...register("password", {
            required: "Поле пароль обязательно",
            pattern: {
              value: /^([A-z0-9!@#$%^&*()]{6,})$/,
              message: "Пароль должен содержать минимум 6 символов",
            },
          })}
          placeholder='Password'
        />
        {errors?.password && (
          <div style={{ color: "red", maxWidth: "300px" }}>
            {errors.password.message}
          </div>
        )}
        <button>Войти</button>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </form>
      <div className='sign-in'>
        <p>Ещё нет аккаунта?</p>
        <NavLink className='sign-in_link' to={REGISTRATION_ROUTE}>
          Зарегистируйтесь
        </NavLink>
      </div>
    </div>
  );
});

export default Auth;
