import JumboCardQuick from "@jumbo/components/JumboCardQuick/JumboCardQuick";
import Div from "@jumbo/shared/Div/Div";
import { Typography } from "@mui/material";
import EditProfileForm from "app/components/EditProfileForm/EditProfileForm";
import React from "react";
import { useSelector } from "react-redux";

export default function EditProfile() {
  const { user } = useSelector((state) => state.userReducer);
  return (
    <Div>
      <Typography variant="h1">Edit Profile</Typography>
      <Div sx={{display:"flex",justifyContent:"center"}}>
      <JumboCardQuick
        noWrapper
        title={""}
        sx={{ width: "40%", mt: 10 ,display:"flex", justifyContent:"center"}}
        // action={<Chip size={"small"} label={"2 New"} color={"secondary"}/>}
      >
        <EditProfileForm user={user}/>
      </JumboCardQuick>
      </Div>
    </Div>
  );
}
