import Div from "@jumbo/shared/Div/Div";
import { Typography } from "@mui/material";
import TagForm from "app/components/TagForm/TagForm";
import React from "react";

export default function AddTag() {
  return (
    <div>
      <Typography variant={"h2"} mb={3}>
        Add Tag
      </Typography>
      <Div
        sx={{
          width: 720,
          maxWidth: "100%",
          margin: "auto",
          p: 4,
          borderRadius: "10px",
          boxShadow: "1.5px 1.5px 4px 0px rgba(0, 0, 0, 0.5)",
          mt: 10,
        }}
      >
        <TagForm />
      </Div>
    </div>
  );
}
