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
import BoxDetailsPage from "../pages/HomeTemplate/BoxDetailsPage";
import ProfilePage from "../pages/HomeTemplate/ProfilePage";

import Dashboard from "../pages/AdminTemplate/Dashboard";
import UserProfile from "../pages/AdminTemplate/UserProfile";
import UserManager from "../pages/AdminTemplate/UserManager";
import MovieManager from "../pages/AdminTemplate/MovieManager";

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
      {
        path: "box-details/:showtimeId",
        element: BoxDetailsPage,
      },
      {
        path: "profile",
        element: ProfilePage,
      },
    ],
  },
  {
    path: "admin",
    element: AdminTemplate,
    nested:[
      {
        path: "user-manager",
        element: UserManager,
      },
       {
        path: "movie-manager",
        element: MovieManager,
      },
       {
        path: "user-profile",
        element: UserProfile,
      },
       {
        path: "dashboard",
        element: Dashboard,
      }
    ]
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
