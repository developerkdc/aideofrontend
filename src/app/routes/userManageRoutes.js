import Page from "@jumbo/shared/Page/Page";
import { Home } from "@mui/icons-material";
import AddUser from "app/pages/manageUsers/AddUser/AddUser";
import UsersList from "app/pages/manageUsers/UsersList/UsersList";

const userManagementRoutes = [
  {
    path: "/",
    element: <Page component={Home} layout={"vertical-default"} />,
  },
  {
    path: "/manage/users",
    element: <Page component={UsersList} layout={"vertical-default"} />,
  },
  {
    path: "/add/user",
    element: <Page component={AddUser} layout={"vertical-default"} />,
  },
];

export default userManagementRoutes;
