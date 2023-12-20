import React, { useContext, useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { observer } from "mobx-react-lite";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { CircularProgress } from "@mui/material";

import "./common.css";
import Footer from "./components/Footer";
import { Context } from ".";
import { check } from "./http/userApi";

const App = observer(() => {
  const { user } = useContext(Context);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      check()
        .then((data) => {
          user.setUser(data);
          user.setIsAuth(true);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <BrowserRouter>
        <NavBar />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
});

export default App;
