import HomeTemplate from "../pages/HomeTemplate";
import AdminTemplate from "../pages/AdminTemplate";
import { Route } from "react-router-dom";
import HomePage from "../pages/HomeTemplate/HomePage";
import ListMoviesPage from "../pages/HomeTemplate/ListMoviesPage";
import AboutPage from "../pages/HomeTemplate/AboutPage";
import LoginPage from "../pages/HomeTemplate/LoginPage";
import RegisterPage from "../pages/HomeTemplate/RegisterPage";
import NotFoundPage from "../pages/HomeTemplate/NotFoundPage";

const routes = [
  {
    path: "",
    element: HomeTemplate,
    nested: [
      {
        path: "",
        element: HomePage,
      },
      {
        path: "list-movies",
        element: ListMoviesPage,
      },
      {
        path: "about",
        element: AboutPage,
      },
      {
        path: "login",
        element: LoginPage,
      },
      {
        path: "register",
        element: RegisterPage,
      },
    ],
  },
  {
    path: "admin",
    element: AdminTemplate,
  },
  {
    path: "*",
    element: NotFoundPage,
  },
];

export const generateRoutes = () => {
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.nested.map((item) => {
            return (
              <Route
                key={item.path}
                path={item.path}
                element={<item.element />}
              />
            );
          })}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};
