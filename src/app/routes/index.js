import React from "react";
import Home from "../pages/home";
import Page from "@jumbo/shared/Page";
import Login from "app/pages/login";
import MyRouteMiddleware from "./middleware/auth/authValidRoute";
import UserManagementRoutes from "./userManageRoutes";
import tagRoutes from "./tagRoutes";
import languageRoutes from "./languageRoutes";
import { TopicRounded } from "@mui/icons-material";
import topicRoutes from "./topicRoutes";
import contentRoutes from "./contentRoutes";
import EditProfile from "app/pages/EditProfile";


/**
 routes which you want to make accessible to both authenticated and anonymous users
 **/
// const {isAuthenticated}
const routesForPublic = [
  {
    path: "/user/login",
    element: <Page component={Login} layout={"solo-page"} />,
  },
  {
    middleware: [
      {
        element: MyRouteMiddleware,
        fallbackPath: "/user/login",
      },
    ],
    routes: [
      {
        path: "/profile",
        element: <Page component={EditProfile} layout={"vertical-default"} />,
      },
      ...UserManagementRoutes,
      ...tagRoutes,
      ...languageRoutes,
      ...topicRoutes,
      ...contentRoutes
    ],
  },
];
// {
//   path: "/",
//   element: <Page component={Home} layout={"vertical-default"} />,
// },
// {
//   middleware: [
//     {
//       element: MyRouteMiddleware,
//       fallbackPath: "/user/login",
//     },
//   ],
//   routes: [...dashboardRoutes],
// },
/**
 routes only accessible to authenticated users
 **/
const routesForAuthenticatedOnly = [];

/**
 routes only accessible when user is anonymous
 **/
const routesForNotAuthenticatedOnly = [
  // {
  //   path: "/user/login",
  //   element: (
  //     <Page component={Login} layout={"solo-page"} disableSmLogin={true} />
  //   ),
  // },
];

const routes = [
  ...routesForPublic,
  ...routesForAuthenticatedOnly,
  ...routesForNotAuthenticatedOnly,
];

export {
  routes as default,
  routesForPublic,
  routesForNotAuthenticatedOnly,
  routesForAuthenticatedOnly,
};
