import HomeTemplate from "../pages/HomeTemplate";
import AdminTemplate from "../pages/AdminTemplate";
import { Route } from "react-router-dom";
import HomePage from "../pages/HomeTemplate/HomePage";
import AboutPage from "../pages/HomeTemplate/AboutPage";
import LoginPage from "../pages/HomeTemplate/LoginPage";
import RegisterPage from "../pages/HomeTemplate/RegisterPage";
import NotFoundPage from "../pages/HomeTemplate/NotFoundPage";
import ContactPage from "../pages/HomeTemplate/ContactPage";
import MovieDetailsPage from "../pages/HomeTemplate/MovieDetailsPage";

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
        path: "contact",
        element: ContactPage,
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
      {
        path: "movie-details/:movieId",
        element: MovieDetailsPage,
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
