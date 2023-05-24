import Div from "@jumbo/shared/Div/Div";
import {
  Autocomplete,
  Box,
  Button,
  CardContent,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DndWrapper from "app/pages/extensions/dropzone/components/DndWrapper";
import { getAllLanguages } from "app/redux/actions/languageAction";
import { getAllTags } from "app/redux/actions/tagAction";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import Step2Form from "../Step2Form";

const Step1Form = ({ setValue }) => {
  const [zipFiles, setZipFiles] = useState([]);
  const [thumbnailFiles, setThumbnailFiles] = useState([]);
  const [age, setAge] = useState("");
  const { alltags } = useSelector((state) => state.tagReducer);
  const { alllanguages } = useSelector((state) => state.languageReducer);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    callToAction: "",
    tags: [],
    language: null,
    liveLink: "",
    note: "",
    ageRating: "",
  });


  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("zipFile", zipFiles[0]); // Assuming you have only one zip file
    formData.append("imageFile", thumbnailFiles[0]); // Assuming you have only one image file
  
    try {
      const response = await fetch("/api/v1/content/upload", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("File paths:", data);
        localStorage.setItem("thumbnail",data.imageFilePath)
        localStorage.setItem("zip",data.zipFilePath)
        // Handle the file paths in your frontend logic
      } else {
        console.error("Upload failed:", response.statusText);
        // Handle the error in your frontend logic
      }
    } catch (error) {
      console.error("Upload failed:", error);
      // Handle the error in your frontend logic
    }
  };



  const handleNext = () => {
    // Create a new FormData object
    const formDataUpdated = new FormData();

    // Append the zip and thumbnail files to the FormData object
    zipFiles.forEach((file) => {
      formDataUpdated.append("zipFiles", file);
    });

    thumbnailFiles.forEach((file) => {
      formDataUpdated.append("thumbnailFiles", file);
    });

    for (var pair of formDataUpdated.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    // console.log(formData)
    if (formData.title && formData.callToAction) {
      // Render Step2Form and pass the form data as props
      setValue("step2");
      localStorage.setItem("formData", JSON.stringify(formData));
      localStorage.setItem("zip", zipFiles);
      localStorage.setItem("thumbnail", thumbnailFiles);
      uploadFile()
    } else {
      console.log("Fill all the fields");
    }
  };

  useEffect(() => {
    dispatch(getAllTags());
    dispatch(getAllLanguages());
  }, []);

  const { getRootProps: getZipRootProps, getInputProps: getZipInputProps } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        setZipFiles(acceptedFiles);
      },
    });

  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setThumbnailFiles(acceptedFiles);
    },
  });

  const zipFileItems = zipFiles.map((file) => (
    <ListItem selected key={file.path} sx={{ width: "auto", mr: 1 }}>
      {file.path} - {file.size} bytes
    </ListItem>
  ));

  const thumbnailFileItems = thumbnailFiles.map((file) => (
    <ListItem selected key={file.path} sx={{ width: "auto", mr: 1 }}>
      {file.path} - {file.size} bytes
    </ListItem>
  ));

  return (
    <Div sx={{ display: "flex", flexDirection: "column", flex: "1" }}>
      <CardContent>
        <Typography component={"h2"} variant="h1" mb={3}>
          Fill up details
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
          <FormControl>
            <TextField
              fullWidth
              id="title"
              label="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <TextField
              fullWidth
              id="callToAction"
              label="Call To Action"
              value={formData.callToAction}
              onChange={(e) =>
                setFormData({ ...formData, callToAction: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <Div sx={{ width: 500, maxWidth: "100%" }}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={alltags}
                getOptionLabel={(option) => option.name}
                value={formData.tags}
                onChange={(event, value) =>
                  setFormData({ ...formData, tags: value })
                }
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >{option.name}</Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Choose Tags"
                    placeholder="Tags"
                  />
                )}
              />
            </Div>
          </FormControl>
          <FormControl>
            <Div sx={{ width: 500, maxWidth: "100%" }}>
              <Autocomplete
                multiple={false}
                id="language-standard"
                options={alllanguages}
                getOptionLabel={(option) => option.name}
                value={formData.language}
                onChange={(event, value) =>
                  {console.log(value.name)
                  setFormData({ ...formData, language: value })}
                }
                limitTags={1}
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
                    label="Choose Language"
                    placeholder="Language"
                  />
                )}
              />
            </Div>
          </FormControl>
          <FormControl className="MuiFormControl-fluid">
            <TextField
              fullWidth
              id="liveLink"
              label="Live Link"
              value={formData.liveLink}
              onChange={(e) =>
                setFormData({ ...formData, liveLink: e.target.value })
              }
            />
          </FormControl>
          <FormControl className="MuiFormControl-fluid">
            <TextField
              id="help"
              multiline
              rows={4}
              label="Note"
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
            />
          </FormControl>
          <FormControl className="">
            <DndWrapper>
              <div {...getZipRootProps()}>
                <input {...getZipInputProps()} />
                <Typography variant={"h4"} sx={{ cursor: "pointer" }}>
                  Upload Zip
                </Typography>
              </div>
            </DndWrapper>
            <List disablePadding sx={{ display: "flex" }}>
              {zipFileItems}
            </List>
          </FormControl>
          <FormControl className="">
            <DndWrapper>
              <div {...getThumbnailRootProps()}>
                <input {...getThumbnailInputProps()} />
                <Typography variant={"h4"} sx={{ cursor: "pointer" }}>
                  Upload Thumbnail
                </Typography>
              </div>
            </DndWrapper>
            <List disablePadding sx={{ display: "flex" }}>
              {thumbnailFileItems}
            </List>
          </FormControl>
          <FormControl>
            <Typography variant="h6">Age Rating</Typography>
            <Select
              labelId="age-rating-label"
              id="age-rating"
              value={formData.ageRating}
              onChange={(event) =>
                setFormData({ ...formData, ageRating: event.target.value })
              }
              label="Age Rating"
              fullWidth
            >
              <MenuItem value={"Adult"}>Adult</MenuItem>
              <MenuItem value={"Naughty"}>Naughty</MenuItem>
              <MenuItem value={"Universal"}>Universal</MenuItem>
            </Select>
          </FormControl>

          <Div sx={{ mx: 1 }}>
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          </Div>
        </Box>
      </CardContent>
    </Div>
  );
};

export default Step1Form;
