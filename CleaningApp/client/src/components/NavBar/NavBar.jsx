import React, { useContext } from "react";
import {observer} from 'mobx-react-lite';
import { Context } from "../..";
import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { AUTH_ROUTE, MAIN_ROUTE, SERVICES_ROUTE, ADMIN_ROUTE, NEWS_ROUTE, EMPLOYEES_ROUTE } from "../../utils/constants";

const NavBar = observer(() => {
  const { user } = useContext(Context);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token');
  }

  return (
    <header>
      <div className='container header-container'>
        <NavLink className='logo' to={MAIN_ROUTE}>
          Cleanix
        </NavLink>
        {user.isAuth ? (
          <nav className='navigation'>
            <NavLink to={EMPLOYEES_ROUTE}>Наши сотрудники</NavLink>
            <NavLink to={NEWS_ROUTE}>Новости</NavLink>
            <NavLink to={SERVICES_ROUTE}>Услуги</NavLink>
            {user.user.role === "ADMIN" && <NavLink to={ADMIN_ROUTE}>
              <SupervisorAccountIcon sx={{fontSize: "3rem", color: "red"}} />
              Админ
            </NavLink> }
            <NavLink to={AUTH_ROUTE} onClick={() => logOut()}>
              <PersonIcon sx={{ fontSize: "3rem" }} />
              Выйти
            </NavLink>
          </nav>
        ) : (
          <nav className='navigation'>
            <NavLink to={EMPLOYEES_ROUTE}>Наши сотрудники</NavLink>
            <NavLink to={NEWS_ROUTE}>Новости</NavLink>
            <NavLink to={SERVICES_ROUTE}>Услуги</NavLink>
            <NavLink to={AUTH_ROUTE}>
              <PersonIcon sx={{ fontSize: "3rem" }} />
              Войти
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
});

export default NavBar;