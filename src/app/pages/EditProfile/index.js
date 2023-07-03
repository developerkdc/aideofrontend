import JumboCardQuick from "@jumbo/components/JumboCardQuick/JumboCardQuick";
import Div from "@jumbo/shared/Div/Div";
import { Typography } from "@mui/material";
import EditProfileForm from "app/components/EditProfileForm/EditProfileForm";
import React from "react";
import { useSelector } from "react-redux";
import MediaPlayer from "../MediaPlayer/MediaPlayer.js";
export default function EditProfile() {
  const { user } = useSelector((state) => state.userReducer);

  // const data = {
  //   Version: 1,
  //   Background: { Video: { Source: "ShopQuote1.mp4" } },
  //   Segments: [
  //     { Chapter: 1, Image: { Source: "2.png", Interval: 5000 } },
  //     { Chapter: 1, Image: { Source: "3.png", Interval: 5000 } },
  //     { Chapter: 1, Image: { Source: "4.png", Interval: 5000 } },
  //     { Chapter: 1, Image: { Source: "5.png", Interval: 5000 } },
  //     { Chapter: 1, Image: { Source: "6.png", Interval: 5000 } },
  //     { Chapter: 1, Image: { Source: "7.png", Interval: 5000 } },
  //     { Chapter: 1, Image: { Source: "8.png", Interval: 5000 } },
  //     { Chapter: 1, Image: { Source: "9.png", Interval: 5000 } },
  //     { Chapter: 1, Image: { Source: "10.png", Interval: 5000 } },
  //     { Chapter: 1, Image: { Source: "11.png", Interval: 5000 } },
  //     { Chapter: 1, Image: { Source: "12.png", Interval: 5000 } },
  //     { Chapter: 1, Image: { Source: "13.png", Interval: 5000 } },
  //   ],
  // };

  const data1 = {
    Version: 1,
    Background: {
      Video: { Source: "ZenQuotes.mp4" },
      Audio: { Source: "Dawn.m4a" },
    },
    Segments: [
      {
        Chapter: 1,
        Image: { Source: "2.png", Interval: 5000 },
        Audio: { Source: "ZenChime.m4a" },
      },
      { Chapter: 1, Image: { Source: "3.png", Interval: 5000 } },
      { Chapter: 1, Image: { Source: "4.png", Interval: 5000 } },
      { Chapter: 1, Image: { Source: "5.png", Interval: 5000 } },
      { Chapter: 1, Image: { Source: "6.png", Interval: 5000 } },
      { Chapter: 1, Image: { Source: "7.png", Interval: 5000 } },
      { Chapter: 1, Image: { Source: "8.png", Interval: 5000 } },
      { Chapter: 1, Image: { Source: "9.png", Interval: 5000 } },
      { Chapter: 1, Image: { Source: "10.png", Interval: 5000 } },
      { Chapter: 1, Image: { Source: "11.png", Interval: 5000 } },
      { Chapter: 1, Image: { Source: "12.png", Interval: 5000 } },
      { Chapter: 1, Image: { Source: "13.png", Interval: 5000 } },
    ],
  };

  const data11 = {
    Version: 1,
    Background: { Audio: { Source: "RaagPilu.m4a" } },
    Segments: [
      { Chapter: 1, Image: { Source: "1.jpg", Interval: 5000 } },
      { Chapter: 1, Image: { Source: "2.jpg", Interval: 2000 } },
      { Chapter: 1, Video: { Source: "1.mp4" } },
      { Chapter: 1, Image: { Source: "3.jpg", Interval: 2000 } },
      { Chapter: 1, Video: { Source: "2.mp4" } },
      { Chapter: 1, Image: { Source: "4.jpg", Interval: 2000 } },
      { Chapter: 1, Video: { Source: "3.mp4" } },
      { Chapter: 1, Image: { Source: "5.jpg", Interval: 2000 } },
      { Chapter: 1, Video: { Source: "4.mp4" } },
      { Chapter: 1, Image: { Source: "6.jpg", Interval: 5000 } },
    ],
  };

  const data = {
    Version: 1,
    Background: {
      Image: { Source: "Back.jpg", Interval: 5000 },
      Audio: { Source: "State of Zen.m4a" },
    },
    Segments: [
      { Chapter: 1, Video: { Source: "1.mp4" } },
      { Chapter: 1, Video: { Source: "2.mp4" } },
      { Chapter: 1, Video: { Source: "3.mp4" } },
      { Chapter: 1, Video: { Source: "4.mp4" } },
      { Chapter: 1, Video: { Source: "5.mp4" } },
      { Chapter: 1, Video: { Source: "6.mp4" } },
      { Chapter: 1, Video: { Source: "7.mp4" } },
      { Chapter: 1, Video: { Source: "8.mp4" } },
      { Chapter: 1, Video: { Source: "9.mp4" } },
      { Chapter: 1, Video: { Source: "10.mp4" } },
      { Chapter: 1, Video: { Source: "11.mp4" } },
      {
        Chapter: 1,
        Video: { Source: "12.mp4" },
        Audio: { Source: "ZenChime.m4a" },
      },
    ],
  };

  return (
    <Div>
      <Typography variant="h1">Edit Profile</Typography>
      <Div sx={{ display: "flex", justifyContent: "center" }}>
        <JumboCardQuick
          noWrapper
          title={""}
          sx={{
            width: "40%",
            mt: 10,
            display: "flex",
            justifyContent: "center",
          }}
          // action={<Chip size={"small"} label={"2 New"} color={"secondary"}/>}
        >
          <EditProfileForm user={user} />
          {/* <MediaPlayer data={data} /> */}
        </JumboCardQuick>
      </Div>
    </Div>
  );
}
