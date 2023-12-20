import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../../routes";
import { Context } from "../..";

const AppRouter = () => {
  const { user } = useContext(Context);
  return (
    <main>
      <Routes>
        {user.isAuth &&
          authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={Component} />
          ))}
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        ))}
      </Routes>
    </main>
  );
};

export default AppRouter;
