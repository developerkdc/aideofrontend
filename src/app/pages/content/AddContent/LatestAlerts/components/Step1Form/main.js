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


const Step1Form = () => {
  const [zipFiles, setZipFiles] = useState([]);
  const [thumbnailFiles, setThumbnailFiles] = useState([]);
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
  const [age, setAge] = useState("");
  const { alltags } = useSelector((state) => state.tagReducer);
  const { alllanguages } = useSelector((state) => state.languageReducer);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTags());
    dispatch(getAllLanguages());
  }, []);

  const files = acceptedFiles.map((file) => (
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
            <TextField fullWidth id="title" label="Title" defaultValue="" />
          </FormControl>
          <FormControl>
            <TextField
              fullWidth
              id="callToAction"
              label="Call To Action"
              defaultValue=""
            />
          </FormControl>
          <FormControl>
            <Div sx={{ width: 500, maxWidth: "100%" }}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={alltags}
                getOptionLabel={(option) => option.name}
                //   defaultValue={[countries[0]]}
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
                //   defaultValue={[countries[0]]}
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
              defaultValue=""
            />
          </FormControl>
          <FormControl className="MuiFormControl-fluid">
            <TextField
              id="help"
              multiline
              rows={4}
              label="Note"
              defaultValue=""
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
            {/* <Typography variant={"h4"}>Files</Typography> */}
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
            {/* <Typography variant={"h4"}>Files</Typography> */}
            <List disablePadding sx={{ display: "flex" }}>
              {thumbnailFileItems}
            </List>
          </FormControl>
          <FormControl>
            <Typography variant="h6">Age Rating</Typography>
            <Select
              labelId="age-rating-label"
              id="age-rating"
              value={age}
              onChange={(event) => setAge(event.target.value)}
              label="Age Rating"
              fullWidth
            >
              <MenuItem value={"Adult"}>Adult</MenuItem>
              <MenuItem value={"Naughty"}>Naughty</MenuItem>
              <MenuItem value={"Universal"}>Universal</MenuItem>
            </Select>
          </FormControl>
          
          <Div sx={{ mx: 1 }}>
            <Button variant={"contained"}>Next</Button>
          </Div>
        </Box>
      </CardContent>
    </Div>
  );
};

export default Step1Form;
