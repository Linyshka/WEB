import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Registration.css";
import { NavLink } from "react-router-dom";
import { AUTH_ROUTE, MAIN_ROUTE } from "../../utils/constants";
import { registration, googleLogin } from "../../http/userApi";
import { Snackbar, Alert } from "@mui/material";
import UserState from "../../state/UserState";
import { Context } from '../..';

export default class Registration extends React.Component {
  constructor() {
    super();
    let email;
    let emailIsValidate;

    let password;
    let passwordIsValidate;

    let repassword;                                 
    let repasswordIsValidate;

    let open = false;
    let message;

    this.state = {
      email,
      password,
      repassword,
      emailIsValidate,
      passwordIsValidate,
      repasswordIsValidate,
      open,
      message,
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onRepasswordChange = this.onRepasswordChange.bind(this);
    this.SignUp = this.SignUp.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
  }

  emailValidate(email) {
    return email.search(
      /^([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})$/
    ) !== -1
      ? true
      : false;
  }

  passwordValidate(password) {
    return password.length > 5;
  }

  onPasswordChange(e) {
    let val = e.target.value;
    this.changePassword = true;
    let valid = this.passwordValidate(val);
    this.setState({ password: val, passwordIsValidate: valid });
  }

  repasswordValidate(password) {
    return password === this.state.password;
  }

  onRepasswordChange(e) {
    let val = e.target.value;
    this.changeRepassword = true;
    let valid = this.repasswordValidate(val);
    this.setState({ repassword: val, repasswordIsValidate: valid });
  }

  onEmailChange(e) {
    var val = e.target.value;
    this.changeEmail = true;
    var valid = this.emailValidate(val);
    this.setState({ email: val, emailIsValidate: valid });
  }

  async SignUp(e) {
    e.preventDefault();
    try {
      const response = await registration(
        this.state.email,
        this.state.password
      );
      console.log(this.context);
      this.context.setUser(response);
      this.context.setIsAuth(true);
      window.location.assign(process.env.REACT_APP_CLIENT_URL + MAIN_ROUTE);
    } catch (err) {
      this.setState({ open: true });
      this.setState({ message: err.response.data.message });
    }
  }

  onSuccess(credentialResponse) {
    const profile = jwtDecode(credentialResponse.credential);
    googleLogin(profile.sub, profile.email)
      .then((response) => {
        this.context.setUser(response);
        this.context.setIsAuth(true);
        window.location.assign(process.env.REACT_APP_CLIENT_URL + MAIN_ROUTE);
      })
      .catch((err) => {
        this.setState({ open: true });
        this.setState({ message: err.response.data.message });
      });
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    let emailColor = this.state.emailIsValidate ? "green" : "red";

    let passwordColor = this.state.passwordIsValidate ? "green" : "red";
    let repasswordColor = this.state.repasswordIsValidate ? "green" : "red";

    return (
      <div className='container registration-container'>
        <Snackbar
          open={this.state.open}
          autoHideDuration={5000}
          onClose={this.handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            elevation={6}
            variant='filled'
            onClose={this.handleClose}
            severity='error'
            sx={{ width: "100%" }}
          >
            {this.state.message}
          </Alert>
        </Snackbar>
        <h2>Регистрация</h2>
        <form className='form sign-up-form' onSubmit={this.SignUp}>
          <div>
            <label htmlFor='email'>Email:</label>
            <br />
            <input
              type='text'
              name='email'
              value={this.state.email}
              onChange={this.onEmailChange}
              style={{ borderColor: emailColor }}
            />
          </div>
          {!this.state.emailIsValidate && this.changeEmail && (
            <p className='errors'>Ввведите корректный email</p>
          )}
          <div>
            <label>Пароль:</label>
            <br />
            <input
              type='password'
              value={this.state.password}
              onChange={this.onPasswordChange}
              style={{ borderColor: passwordColor }}
            />
          </div>
          {!this.state.passwordIsValidate && this.changePassword && (
            <p className='errors'>Пароль должен содержать минимум 6 символов</p>
          )}
          <div>
            <label>Повторите пароль:</label>
            <br />
            <input
              type='password'
              value={this.state.repassword}
              onChange={this.onRepasswordChange}
              style={{ borderColor: repasswordColor }}
            />
          </div>
          {!this.state.repasswordIsValidate && this.changeRepassword && (
            <p className='errors'>Пароли должны совпадать!</p>
          )}
          <input type='submit' value='Отправить' />
          <GoogleLogin
            onSuccess={this.onSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </form>
        <div className='sign-in'>
          <p>Уже есть аккаунт?</p>
          <NavLink className='sign-in_link' to={AUTH_ROUTE}>
            Войдите
          </NavLink>
        </div>
      </div>
    );
  }
}

Registration.contextTypes = Context;
