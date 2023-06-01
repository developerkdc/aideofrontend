import Div from "@jumbo/shared/Div/Div";
import {
  Autocomplete,
  Box,
  Button,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { getAllUsers } from "app/redux/actions/userAction";
import { addCredits } from "app/services/apis/addCredit";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Step3Form = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  let { allUsers } = useSelector((state) => state.userReducer);
  const [selectedUser, setSelectedUser] = useState(null);
  allUsers = allUsers?.filter((item) => {
    return item._id != user._id;
  });
  const handleSubmit = async () => {
    if (selectedUser) {
      const allocated = [
        {
          allocatedBy: user._id,
          allocatedTo: selectedUser._id,
        },
      ];
      localStorage.setItem("allocated", JSON.stringify(allocated));

      const data = JSON.parse(localStorage.getItem("formData"));
      const tagIds = data.tags.map((tag) => tag._id);
      // console.log(tagIds);
      const formData = {
        title: data.title,
        zip: localStorage.getItem("zip"),
        tags: tagIds,
        ageRating: data.ageRating,
        language: data.language._id,
        thumbnail: localStorage.getItem("thumbnail"),
        livelink: data.livelink,
        description: data.note,
        story: JSON.parse(localStorage.getItem("story")),
        visual: JSON.parse(localStorage.getItem("visual")),
        audio: JSON.parse(localStorage.getItem("audio")),
        completeProject: JSON.parse(localStorage.getItem("complete")),
        allocated: JSON.parse(localStorage.getItem("allocated")),
      };
      const keys = [
        ...formData.story.map((obj) => Object.keys(obj)[0]),
        ...formData.visual.map((obj) => Object.keys(obj)[0]),
        ...formData.completeProject.map((obj) => Object.keys(obj)[0]),
        ...formData.allocated.map((obj) => Object.keys(obj)[0]),
      ];
      addCredits(keys)
      
      const response = await fetch("/api/v1/content", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Upload successful
        const data = await response.json();
        Swal.fire({
          icon: "success",
          title: "Content Uploaded",
          text: "Successful",
        });
        navigate("/");
        localStorage.clear()
        // Perform any additional actions or display success message
      } else {
        // Upload failed
        const error = await response.json();
        console.error("Upload failed:", error);
        // Display error message to the user
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Select User",
        text: "",
      });
    }
  };

  return (
    <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
      <CardContent>
        <Typography component={"h2"} variant="h1" mb={3}>
          Assign To Verify
        </Typography>
        <FormControl>
          <Div sx={{ width: 500, maxWidth: "100%" }}>
            <Autocomplete
              multiple={false}
              id="language-standard"
              options={allUsers}
              getOptionLabel={(option) => option.name && option.email}
              //   defaultValue={[countries[0]]}
              limitTags={1}
              onChange={(event, newValue) => {
                setSelectedUser(newValue);
              }}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {option.name}
                  <Typography variant="caption" sx={{ ml: 2 }}>
                    {" "}
                    ( {option.email} )
                  </Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Choose User To Assign"
                  placeholder="User"
                />
              )}
            />
          </Div>
        </FormControl>
        <Div sx={{ mx: 1, mt: 5 }}>
          <Button variant={"contained"} onClick={handleSubmit}>
            Submit
          </Button>
        </Div>
      </CardContent>
    </Div>
  );
};

export default Step3Form;
