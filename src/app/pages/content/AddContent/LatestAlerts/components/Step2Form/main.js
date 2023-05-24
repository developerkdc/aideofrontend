import {
  Box,
  Button,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Div from "@jumbo/shared/Div/Div";

const Step2Form = ({ formdata }) => {
  console.log(formdata);
  const [storyboxCount, setStoryboxCount] = useState(1); // Initial number of textboxes
  const [audioboxCount, setAudioboxCount] = useState(1); // Initial number of textboxes
  const [visualboxCount, setVisualboxCount] = useState(1); // Initial number of textboxes
  const [completeboxCount, setCompleteboxCount] = useState(1); // Initial number of textboxes
  //   const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleStoryTextbox = () => {
    setStoryboxCount((prevCount) => prevCount + 2); // Increment the textbox count by 2
  };

  const handleAudioTextbox = () => {
    setAudioboxCount((prevCount) => prevCount + 2); // Increment the textbox count by 2
  };

  const handleVisualTextbox = () => {
    setVisualboxCount((prevCount) => prevCount + 2); // Increment the textbox count by 2
  };

  const handleCompleteTextbox = () => {
    setCompleteboxCount((prevCount) => prevCount + 2); // Increment the textbox count by 2
  };

  const renderStoryboxes = () => {
    const textboxes = [];
    for (let i = 0; i < storyboxCount; i += 2) {
      textboxes.push(
        <Box
          key={i}
          sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
          //   onMouseEnter={() => setHoveredIndex(i)}
          //   onMouseLeave={() => setHoveredIndex(-1)}
        >
          <FormControl>
            <TextField fullWidth label="Textbox 1" />
          </FormControl>
          <FormControl sx={{ ml: 2 }}>
            <TextField fullWidth label="Textbox 2" />
          </FormControl>
          <FormControl>
            {storyboxCount == 1 ? null : (
              <Button sx={{ color: "red", ml: "-90%" }}>
                <RemoveCircleOutlineIcon />
              </Button>
            )}
          </FormControl>
        </Box>
      );
    }
    return textboxes;
  };

  const renderVisualboxes = () => {
    const textboxes = [];
    for (let i = 0; i < visualboxCount; i += 2) {
      textboxes.push(
        <Box
          key={i}
          sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
        >
          <FormControl>
            <TextField fullWidth label="Textbox 1" />
          </FormControl>
          <FormControl sx={{ ml: 2 }}>
            <TextField fullWidth label="Textbox 2" />
          </FormControl>
          <FormControl>
            {visualboxCount == 1 ? null : (
              <Button sx={{ color: "red", ml: "-90%" }}>
                <RemoveCircleOutlineIcon />
              </Button>
            )}
          </FormControl>
        </Box>
      );
    }
    return textboxes;
  };

  const renderAudioboxes = () => {
    const textboxes = [];
    for (let i = 0; i < audioboxCount; i += 2) {
      textboxes.push(
        <Box
          key={i}
          sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
        >
          <FormControl>
            <TextField fullWidth label="Textbox 1" />
          </FormControl>
          <FormControl sx={{ ml: 2 }}>
            <TextField fullWidth label="Textbox 2" />
          </FormControl>
          <FormControl>
            {audioboxCount == 1 ? null : (
              <Button sx={{ color: "red", ml: "-90%" }}>
                <RemoveCircleOutlineIcon />
              </Button>
            )}
          </FormControl>
        </Box>
      );
    }
    return textboxes;
  };

  const renderCompleteboxes = () => {
    const textboxes = [];
    for (let i = 0; i < completeboxCount; i += 2) {
      textboxes.push(
        <Box
          key={i}
          sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
        >
          <FormControl>
            <TextField fullWidth label="Textbox 1" />
          </FormControl>
          <FormControl sx={{ ml: 2 }}>
            <TextField fullWidth label="Textbox 2" />
          </FormControl>
          <FormControl>
            {completeboxCount == 1 ? null : (
              <Button sx={{ color: "red", ml: "-90%" }}>
                <RemoveCircleOutlineIcon />
              </Button>
            )}
          </FormControl>
        </Box>
      );
    }
    return textboxes;
  };

  return (
    <Div>
      <CardContent>
        <Typography component={"h2"} variant="h1" mb={7}>
          Fill up Credit details
        </Typography>
        <Box
          component="form"
          sx={{
            mx: -1,

            "& .MuiFormControl-root:not(.MuiTextField-root)": {
              p: 1,
              mb: 2,
              width: { xs: "100%", sm: "50%" },
            },

            "& .MuiFormControl-root.MuiFormControl-fluid": {
              width: "100%",
            },
          }}
          autoComplete="off"
        >
          <FormControl className="MuiFormControl-fluid">
            <Typography>Story</Typography>
            <Box sx={{ mt: "1rem" }}>
              {renderStoryboxes()}
              <Button
                sx={{ width: 10, height: 10, margin: -1, padding: 0, mt: -8 }}
                // variant="contained"
                onClick={handleStoryTextbox}
              >
                <AddCircleOutlineIcon />
              </Button>
            </Box>
          </FormControl>
          <FormControl className="MuiFormControl-fluid" sx={{}}>
            <Typography>Visual</Typography>
            <Box sx={{ mt: "1rem" }}>
              {renderVisualboxes()}
              <Button
                sx={{ width: 10, height: 10, margin: -1, padding: 0, mt: -8 }}
                // variant="contained"
                onClick={handleVisualTextbox}
              >
                <AddCircleOutlineIcon />
              </Button>
            </Box>
          </FormControl>
          <FormControl className="MuiFormControl-fluid" sx={{}}>
            <Typography>Audio</Typography>
            <Box sx={{ mt: "1rem" }}>
              {renderAudioboxes()}
              <Button
                sx={{ width: 10, height: 10, margin: -1, padding: 0, mt: -8 }}
                // variant="contained"
                onClick={handleAudioTextbox}
              >
                <AddCircleOutlineIcon />
              </Button>
            </Box>
          </FormControl>
          <FormControl className="MuiFormControl-fluid" sx={{}}>
            <Typography>Complete Project</Typography>
            <Box sx={{ mt: "1rem" }}>
              {renderCompleteboxes()}
              <Button
                sx={{ width: 10, height: 10, margin: -1, padding: 0, mt: -8 }}
                // variant="contained"
                onClick={handleCompleteTextbox}
              >
                <AddCircleOutlineIcon />
              </Button>
            </Box>
          </FormControl>
          <Div sx={{ mx: 1, mt: 5 }}>
            <Button variant={"contained"}>Next</Button>
          </Div>
        </Box>
      </CardContent>
    </Div>
  );
};

export default Step2Form;
