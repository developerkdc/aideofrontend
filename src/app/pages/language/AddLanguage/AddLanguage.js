import Div from "@jumbo/shared/Div/Div";
import { Typography } from "@mui/material";
import LanguageForm from "app/components/LanguageForm/LanguageForm";
import React from "react";

export default function AddLanguage() {
  return (
    <div>
      <Typography variant={"h2"} mb={3}>
        Add Language
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
        <LanguageForm />
      </Div>
    </div>
  );
}
