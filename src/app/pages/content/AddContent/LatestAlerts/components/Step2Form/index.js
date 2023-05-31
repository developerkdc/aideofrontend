import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  CardContent,
  FormControl,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Div from "@jumbo/shared/Div/Div";
import axios from "axios";

const Step2Form = ({ setValue }) => {
  const [storyboxCount, setStoryboxCount] = useState(1); // Initial number of textboxes
  const [audioboxCount, setAudioboxCount] = useState(1); // Initial number of textboxes
  const [visualboxCount, setVisualboxCount] = useState(1); // Initial number of textboxes
  const [completeboxCount, setCompleteboxCount] = useState(1); // Initial number of textboxes
  const [storyData, setStoryData] = useState([]); // State to store story data
  const [audioData, setAudioData] = useState([]); // State to store audio data
  const [visualData, setVisualData] = useState([]); // State to store visual data
  const [completeData, setCompleteData] = useState([]); // State to store complete data

  const [finalStoryData, setFinalStoryData] = useState();
  const [finalAudioData, setFinalAudioData] = useState();
  const [finalVisualData, setFinalVisualData] = useState();
  const [finalCompleteData, setFinalCompleteData] = useState();
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/content/getCredits/")
      .then((response) => {
        setCredits(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

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

  const handleStoryInputChange = (index, field, value) => {
    setStoryData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = { ...updatedData[index], [field]: value };

      const transformedArray = updatedData.map((obj) => {
        const key = obj.textbox1;
        const value = obj.textbox2;
        return { [key]: value };
      });

      setFinalStoryData(transformedArray);

      return updatedData;
    });
  };

  const handleAudioInputChange = (index, field, value) => {
    setAudioData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = { ...updatedData[index], [field]: value };

      const transformedArray = updatedData.map((obj) => {
        const key = obj.textbox1;
        const value = obj.textbox2;
        return { [key]: value };
      });

      setFinalAudioData(transformedArray);

      return updatedData;
    });
  };

  const handleVisualInputChange = (index, field, value) => {
    setVisualData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = { ...updatedData[index], [field]: value };

      const transformedArray = updatedData.map((obj) => {
        const key = obj.textbox1;
        const value = obj.textbox2;
        return { [key]: value };
      });

      setFinalVisualData(transformedArray);

      return updatedData;
    });
  };

  const handleCompleteInputChange = (index, field, value) => {
    setCompleteData((prevData) => {
      const updatedData = [...prevData];
      // if(diff=="fromselection"){
      updatedData[index] = { ...updatedData[index], [field]: value };

      // }

      const transformedArray = updatedData.map((obj) => {
        const key = obj.textbox1;
        const value = obj.textbox2;
        return { [key]: value };
      });

      setFinalCompleteData(transformedArray);

      return updatedData;
    });
  };

  const renderStoryboxes = () => {
    const textboxes = [];
    for (let i = 0; i < storyboxCount; i += 2) {
      const index = i / 2;
      textboxes.push(
        <Box
          key={i}
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <FormControl>
            {/* <TextField
              fullWidth
              label="Textbox 
              1"
              value={storyData[index]?.textbox1}
              onChange={(e) =>
                handleStoryInputChange(index, "textbox1", e.target.value)
              }
            /> */}
            <Autocomplete
              freeSolo
              multiple={false}
              id="story"
              options={credits}
              getOptionLabel={(option) => option.name}
              value={storyData[index]?.textbox1}
              onChange={(event, selectedOption) =>
                handleStoryInputChange(
                  index,
                  "textbox1",
                  selectedOption?.name || ""
                )
              }
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {option.name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Story Creditor"
                  placeholder="Name"
                  onChange={(event) =>
                    handleStoryInputChange(
                      index,
                      "textbox1",
                      event.target.value || ""
                    )
                  }
                />
              )}
            />
          </FormControl>
          <FormControl sx={{ ml: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={storyData[index]?.textbox2}
              onChange={(e) =>
                handleStoryInputChange(index, "textbox2", e.target.value)
              }
            />
          </FormControl>
          <FormControl>
            {storyboxCount === 1 ? null : (
              <Button
                sx={{ color: "red", ml: "-10%" }}
                onClick={() => handleRemoveStoryTextbox(index)}
              >
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
      const index = i / 2;
      textboxes.push(
        <Box
          key={i}
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <FormControl>
            {/* <TextField
              fullWidth
              label="Textbox 
              1"
              value={audioData[index]?.textbox1}
              onChange={(e) =>
                handleAudioInputChange(index, "textbox1", e.target.value)
              }
            /> */}
            <Autocomplete
              freeSolo
              multiple={false}
              id="audio"
              options={credits}
              getOptionLabel={(option) => option.name}
              value={audioData[index]?.textbox1}
              onChange={(event, selectedOption) =>
                handleAudioInputChange(
                  index,
                  "textbox1",
                  selectedOption?.name || ""
                )
              }
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {option.name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Audio Creditor"
                  placeholder="Name"
                  onChange={(event) =>
                    handleAudioInputChange(
                      index,
                      "textbox1",
                      event.target.value || ""
                    )
                  }
                />
              )}
            />
          </FormControl>
          <FormControl sx={{ ml: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={audioData[index]?.textbox2}
              onChange={(e) =>
                handleAudioInputChange(index, "textbox2", e.target.value)
              }
            />
          </FormControl>
          <FormControl>
            {audioboxCount === 1 ? null : (
              <Button
                sx={{ color: "red", ml: "-10%" }}
                onClick={() => handleRemoveAudioTextbox(index)}
              >
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
      const index = i / 2;
      textboxes.push(
        <Box
          key={i}
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <FormControl>
            {/* <TextField
              fullWidth
              label="Textbox 
              1"
              value={visualData[index]?.textbox1}
              onChange={(e) =>
                handleVisualInputChange(index, "textbox1", e.target.value)
              }
            /> */}
            <Autocomplete
              freeSolo
              multiple={false}
              id="visual"
              options={credits}
              getOptionLabel={(option) => option.name}
              value={visualData[index]?.textbox1}
              onChange={(event, selectedOption) =>
                handleVisualInputChange(
                  index,
                  "textbox1",
                  selectedOption?.name || ""
                )
              }
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {option.name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Visual Creditor"
                  placeholder="Name"
                  onChange={(event) =>
                    handleVisualInputChange(
                      index,
                      "textbox1",
                      event.target.value || ""
                    )
                  }
                />
              )}
            />
          </FormControl>
          <FormControl sx={{ ml: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={visualData[index]?.textbox2}
              onChange={(e) =>
                handleVisualInputChange(index, "textbox2", e.target.value)
              }
            />
          </FormControl>
          <FormControl>
            {visualboxCount === 1 ? null : (
              <Button
                sx={{ color: "red", ml: "-10%" }}
                onClick={() => handleRemoveVisualTextbox(index)}
              >
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
      const index = i / 2;
      textboxes.push(
        <Box
          key={i}
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <FormControl>
            {/* <TextField
              fullWidth
              label="Textbox 
              1"
              value={completeData[index]?.textbox1}
              onChange={(e) =>
                handleCompleteInputChange(index, "textbox1", e.target.value)
              }
            /> */}
            <Autocomplete
              freeSolo
              multiple={false}
              id="complete"
              options={credits}
              getOptionLabel={(option) => option.name}
              value={completeData[index]?.textbox1}
              onChange={(event, selectedOption) =>
                handleCompleteInputChange(
                  index,
                  "textbox1",
                  selectedOption?.name || ""
                )
              }
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  {option.name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Complete Creditor"
                  placeholder="Name"
                  onChange={(event) =>
                    handleCompleteInputChange(
                      index,
                      "textbox1",
                      event.target.value || ""
                    )
                  }
                />
              )}
            />
          </FormControl>
          <FormControl sx={{ ml: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={completeData[index]?.textbox2}
              onChange={(e) =>
                handleCompleteInputChange(index, "textbox2", e.target.value)
              }
            />
          </FormControl>
          <FormControl>
            {completeboxCount === 1 ? null : (
              <Button
                sx={{ color: "red", ml: "-10%" }}
                onClick={() => handleRemoveCompleteTextbox(index)}
              >
                <RemoveCircleOutlineIcon />
              </Button>
            )}
          </FormControl>
        </Box>
      );
    }
    return textboxes;
  };

  const handleRemoveStoryTextbox = (index) => {
    const updatedData = [...storyData];
    updatedData.splice(index, 1);
    setStoryData(updatedData);
    setStoryboxCount((prevCount) => prevCount - 2);
  };

  const handleRemoveAudioTextbox = (index) => {
    const updatedData = [...audioData];
    updatedData.splice(index, 1);
    setAudioData(updatedData);
    setAudioboxCount((prevCount) => prevCount - 2);
  };

  const handleRemoveVisualTextbox = (index) => {
    const updatedData = [...visualData];
    updatedData.splice(index, 1);
    setVisualData(updatedData);
    setVisualboxCount((prevCount) => prevCount - 2);
  };

  const handleRemoveCompleteTextbox = (index) => {
    const updatedData = [...completeData];
    updatedData.splice(index, 1);
    setCompleteData(updatedData);
    setCompleteboxCount((prevCount) => prevCount - 2);
  };

  // Similar functions for audio, visual, and complete textboxes

  // Render functions for audio, visual, and complete textboxes
  const handleSubmitForm = async () => {
    try {
      await new Promise((resolve) => {
        localStorage.setItem("story", JSON.stringify(finalStoryData));
        localStorage.setItem("audio", JSON.stringify(finalAudioData));
        localStorage.setItem("visual", JSON.stringify(finalVisualData));
        localStorage.setItem("complete", JSON.stringify(finalCompleteData));
        resolve();
      });
      setValue("step3");
    } catch (error) {
      // Handle any errors that occur during storage
      console.error("Error storing data in localStorage:", error);
    }
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
                onClick={handleStoryTextbox}
              >
                <AddCircleOutlineIcon />
              </Button>
            </Box>
          </FormControl>
          <FormControl className="MuiFormControl-fluid">
            <Typography>Audio</Typography>
            <Box sx={{ mt: "1rem" }}>
              {renderAudioboxes()}
              <Button
                sx={{ width: 10, height: 10, margin: -1, padding: 0, mt: -8 }}
                onClick={handleAudioTextbox}
              >
                <AddCircleOutlineIcon />
              </Button>
            </Box>
          </FormControl>
          <FormControl className="MuiFormControl-fluid">
            <Typography>Visual</Typography>
            <Box sx={{ mt: "1rem" }}>
              {renderVisualboxes()}
              <Button
                sx={{ width: 10, height: 10, margin: -1, padding: 0, mt: -8 }}
                onClick={handleVisualTextbox}
              >
                <AddCircleOutlineIcon />
              </Button>
            </Box>
          </FormControl>
          <FormControl className="MuiFormControl-fluid">
            <Typography>Complete Poject</Typography>
            <Box sx={{ mt: "1rem" }}>
              {renderCompleteboxes()}
              <Button
                sx={{ width: 10, height: 10, margin: -1, padding: 0, mt: -8 }}
                onClick={handleCompleteTextbox}
              >
                <AddCircleOutlineIcon />
              </Button>
            </Box>
          </FormControl>
          {/* Render functions for audio, visual, and complete textboxes */}
          <Div sx={{ mx: 1, mt: 5 }}>
            <Button variant="contained" onClick={handleSubmitForm}>
              Next
            </Button>
          </Div>
        </Box>
      </CardContent>
    </Div>
  );
};

export default Step2Form;
