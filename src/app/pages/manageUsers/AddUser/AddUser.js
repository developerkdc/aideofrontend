import Div from "@jumbo/shared/Div/Div";
import { Typography } from "@mui/material";
import UserForm from "app/components/UserForm/UserForm";
import { mt } from "date-fns/locale";
import React from "react";

export default function AddUser() {
  return (
    <div>
      <Typography variant={"h2"} mb={3}>
        Add User
      </Typography>
      <Div
        sx={{
          width: 500,
          maxWidth: "100%",
          margin: "auto",
          p: 4,
          borderRadius: "10px",
          boxShadow: "1.5px 1.5px 4px 0px rgba(0, 0, 0, 0.5)",
          mt: 10,
        }}
      >
        <UserForm />
      </Div>
    </div>
  );
}
