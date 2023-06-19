import Div from "@jumbo/shared/Div/Div";
import { Button, Typography } from "@mui/material";
import TagForm from "app/components/TagForm/TagForm";
import React from "react";

export default function AddTag() {
  const url =
    "https://aideo-backend.onrender.com/controllers/Content/uploads/6475e981da9c9d8a017fb7b9";

  const handlePlayer = () => {
    console.log(url);
    document.getElementById("player").contentWindow.setAideoIndexByUrl(url);
  };
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
