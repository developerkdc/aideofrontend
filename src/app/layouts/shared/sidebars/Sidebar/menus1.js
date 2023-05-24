import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// other imports...

const Menus = () => {
  let Menus = [];

  const AdminMenus = [
    {
      label: "Content",
      type: "section",
      children: [
        {
          uri: "/dashboards/misc",
          label: "All Content",
          type: "nav-item",
          icon: <GraphicEqIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/dashboards/crypto",
          label: "Add Content",
          type: "nav-item",
          icon: <CurrencyExchangeOutlinedIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/dashboards/listing",
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
          uri: "/app/chats",
          label: "All Topics",
          type: "nav-item",
          icon: <ChatOutlinedIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/app/contacts/all",
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
          uri: "/widgets",
          label: "All Language",
          type: "nav-item",
          icon: <WidgetsOutlinedIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/metrics",
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
          uri: "/widgets",
          label: "All Tags",
          type: "nav-item",
          icon: <WidgetsOutlinedIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/metrics",
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
          uri: "/widgets",
          label: "Manage Users",
          type: "nav-item",
          icon: <WidgetsOutlinedIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/widgets",
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
          uri: "/dashboards/misc",
          label: "All Content",
          type: "nav-item",
          icon: <GraphicEqIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/dashboards/crypto",
          label: "Add Content",
          type: "nav-item",
          icon: <CurrencyExchangeOutlinedIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/dashboards/listing",
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
          uri: "/app/chats",
          label: "All Topics",
          type: "nav-item",
          icon: <ChatOutlinedIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/app/contacts/all",
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
          uri: "/widgets",
          label: "All Language",
          type: "nav-item",
          icon: <WidgetsOutlinedIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/metrics",
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
          uri: "/widgets",
          label: "All Tags",
          type: "nav-item",
          icon: <WidgetsOutlinedIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/metrics",
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
          uri: "/dashboards/misc",
          label: "All Content",
          type: "nav-item",
          icon: <GraphicEqIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/dashboards/crypto",
          label: "Add Content",
          type: "nav-item",
          icon: <CurrencyExchangeOutlinedIcon sx={{ fontSize: 20 }} />,
        },
        {
          uri: "/dashboards/listing",
          label: "Verify Content",
          type: "nav-item",
          icon: <ListAltOutlinedIcon sx={{ fontSize: 20 }} />,
        },
      ],
    },
  ];

  useEffect(() => {
    const { user } = useSelector((state) => state.userReducer);
    if (user.role === "admin") {
      Menus = AdminMenus;
    } else if (user.role === "manager") {
      Menus = ManagerMenus;
    } else if (user.role === "creator") {
      Menus = CreatorMenus;
    }
    // Example usage of the role variable in the effect
    // Perform any additional side effects or logic here
    // This effect will be triggered whenever the role value changes
  }, [user]);

  return (
    // JSX code for rendering the menus
    // ...
    <></>
  );
};

export default Menus;
