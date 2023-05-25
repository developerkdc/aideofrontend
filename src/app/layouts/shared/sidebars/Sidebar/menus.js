import React, { useEffect, useState } from "react";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LockResetIcon from "@mui/icons-material/LockReset";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import ScreenLockRotationIcon from "@mui/icons-material/ScreenLockRotation";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RunningWithErrorsOutlinedIcon from "@mui/icons-material/RunningWithErrorsOutlined";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import StreamOutlinedIcon from "@mui/icons-material/StreamOutlined";
import ListIcon from "@mui/icons-material/List";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import CallEndIcon from "@mui/icons-material/CallEnd";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import GridViewIcon from "@mui/icons-material/GridView";
import Grid3x3OutlinedIcon from "@mui/icons-material/Grid3x3Outlined";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import { useSelector } from "react-redux";

const Menus = () => {
  const AdminMenus = [
    {
      label: "Content",
      type: "section",
      children: [
        {
          uri: "/content",
          label: "All Content",
          type: "nav-item",
          icon: <GraphicEqIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/add/content",
          label: "Add Content",
          type: "nav-item",
          icon: <CurrencyExchangeOutlinedIcon sx={{ fontSize: 20 }} />,
        },
        // {
        //   uri: "/dashboards/listing",
        //   label: "Verify Content",
        //   type: "nav-item",
        //   icon: <ListAltOutlinedIcon sx={{ fontSize: 20 }} />,
        // },
      ],
    },

    {
      label: "Topic",
      type: "section",
      children: [
        {
          uri: "/all/topic",
          label: "All Topics",
          type: "nav-item",
          icon: <ChatOutlinedIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/add/topic",
          label: "Add Topic",
          type: "nav-item",
          icon: <ContactsOutlinedIcon sx={{ fontSize: 20 }} />,
        },
      ],
    },
    {
      label: "Language",
      type: "section",
      children: [
        {
          uri: "/all/language",
          label: "All Language",
          type: "nav-item",
          icon: <WidgetsOutlinedIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/add/language",
          label: "Add Language",
          type: "nav-item",
          icon: <LeaderboardOutlinedIcon sx={{ fontSize: 20 }} />,
        },
      ],
    },
    {
      label: "Tags",
      type: "section",
      children: [
        {
          uri: "/all/tags",
          label: "All Tags",
          type: "nav-item",
          icon: <WidgetsOutlinedIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/add/tags",
          label: "Add Tags",
          type: "nav-item",
          icon: <LeaderboardOutlinedIcon sx={{ fontSize: 20 }} />,
        },
      ],
    },
    {
      label: "User",
      type: "section",
      children: [
        {
          uri: "/manage/users",
          label: "Manage Users",
          type: "nav-item",
          icon: <WidgetsOutlinedIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/add/user",
          label: "Add User",
          type: "nav-item",
          icon: <WidgetsOutlinedIcon sx={{ fontSize: 20 }} />,
        },
      ],
    },
  ];

  const ManagerMenus = [
    {
      label: "Content",
      type: "section",
      children: [
        {
          uri: "/mycontent",
          label: "My Content",
          type: "nav-item",
          icon: <GraphicEqIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/add/content",
          label: "Add Content",
          type: "nav-item",
          icon: <CurrencyExchangeOutlinedIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/verify/contents",
          label: "Verify Content",
          type: "nav-item",
          icon: <ListAltOutlinedIcon sx={{ fontSize: 20 }} />,
        },
      ],
    },

    {
      label: "Topic",
      type: "section",
      children: [
        {
          uri: "/all/topic",
          label: "All Topics",
          type: "nav-item",
          icon: <ChatOutlinedIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/add/topic",
          label: "Add Topic",
          type: "nav-item",
          icon: <ContactsOutlinedIcon sx={{ fontSize: 20 }} />,
        },
      ],
    },
    {
      label: "Language",
      type: "section",
      children: [
        {
          uri: "/all/language",
          label: "All Language",
          type: "nav-item",
          icon: <WidgetsOutlinedIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/add/language",
          label: "Add Language",
          type: "nav-item",
          icon: <LeaderboardOutlinedIcon sx={{ fontSize: 20 }} />,
        },
      ],
    },
    {
      label: "Tags",
      type: "section",
      children: [
        {
          uri: "/all/tags",
          label: "All Tags",
          type: "nav-item",
          icon: <WidgetsOutlinedIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/add/tags",
          label: "Add Tags",
          type: "nav-item",
          icon: <LeaderboardOutlinedIcon sx={{ fontSize: 20 }} />,
        },
      ],
    },
  ];

  const CreatorMenus = [
    {
      label: "Content",
      type: "section",
      children: [
        {
          uri: "/mycontent",
          label: "My Content",
          type: "nav-item",
          icon: <GraphicEqIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/add/content",
          label: "Add Content",
          type: "nav-item",
          icon: <CurrencyExchangeOutlinedIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/verify/contents",
          label: "Verify Content",
          type: "nav-item",
          icon: <ListAltOutlinedIcon sx={{ fontSize: 20 }} />,
        },
      ],
    },
  ];

  const { user } = useSelector((state) => state.userReducer);
  const [menus, SetMenus] = useState([]);
  useEffect(() => {
    // console.log(user);
    if (user?.role === "admin") {
      SetMenus(AdminMenus);
    } else if (user?.role === "manager") {
      SetMenus(ManagerMenus);
    } else if (user?.role === "creator") {
      SetMenus(CreatorMenus);
    }
  }, [user]);
  return menus;
};

export default Menus;
