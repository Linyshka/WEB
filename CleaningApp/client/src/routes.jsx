import Admin from "./pages/Admin/Admin";
import Auth from "./pages/Auth/Auth";
import Main from "./pages/Main/Main";
import Registartion from "./pages/Registration/Registration";
import ServiceInfo from "./pages/ServiceInfo/ServiceInfo";
import Services from "./pages/Services/Services";
import News from "./pages/News/News";
import NewsDetail from './pages/NewDetail/NewsDetail';
import Employees from "./pages/Employees/Employees";
import {
  ADMIN_ROUTE,
  AUTH_ROUTE,
  MAIN_ROUTE,
  REGISTRATION_ROUTE,
  SERVICEINFO_ROUTE,
  SERVICES_ROUTE,
  NEWS_ROUTE,
  NEWSDETAIL_ROUTE,
  EMPLOYEES_ROUTE,
} from "./utils/constants";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: <Admin />,
  },
];

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: <Main />,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: <Registartion />,
  },
  {
    path: AUTH_ROUTE,
    Component: <Auth />,
  },
  {
    path: SERVICES_ROUTE,
    Component: <Services />,
  },
  {
    path: SERVICEINFO_ROUTE + "/:id",
    Component: <ServiceInfo />,
  },
  {
    path: NEWS_ROUTE,
    Component: <News />,
  },
  {
    path: NEWSDETAIL_ROUTE + "/:id",
    Component: <NewsDetail />,
  },
  {
    path: EMPLOYEES_ROUTE,
    Component: <Employees />
  }
];
