import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { authUser } from "./fake-db";
import {
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import Div from "@jumbo/shared/Div";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "app/redux/actions/userAction";

const AuthUserDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useJumboTheme();
  const { setAuthToken } = useJumboAuth();
  const { user } = useSelector((state) => state.userReducer);
  // console.log(user);
  const onLogout = () => {
    sessionStorage.setItem("isAuthenticated",false);
    navigate("/user/login");
    dispatch(logOut());
  };
  // console.log(data)

  return (
    <ThemeProvider theme={theme}>
      <JumboDdPopover
        triggerButton={
          <Avatar
            src={authUser.profile_pic}
            sizes={"small"}
            sx={{ boxShadow: 25, cursor: "pointer" }}
          />
        }
      >
        <Div
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            p: (theme) => theme.spacing(2.5),
          }}
        >
          <Avatar
            src={authUser.profile_pic}
            alt={user?.name}
            sx={{ width: 60, height: 60, mb: 2 }}
          />
          <Typography variant={"h5"}>{user?.name}</Typography>
          <Typography variant={"body1"} color="text.secondary">
            {user?.email}
          </Typography>
        </Div>
        <Divider />
        <nav>
          <List disablePadding sx={{ pb: 1 }}>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <EditOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Edit Profile" sx={{ my: 0 }} onClick={()=>navigate('/profile')}/>
            </ListItemButton>
            <ListItemButton onClick={onLogout}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ my: 0 }} />
            </ListItemButton>
          </List>
        </nav>
      </JumboDdPopover>
    </ThemeProvider>
  );
};

export default AuthUserDropdown;
