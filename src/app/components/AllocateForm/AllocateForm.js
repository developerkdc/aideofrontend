import React, { useEffect, useState } from "react";
import * as yup from "yup";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { Field, Form, Formik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Div from "@jumbo/shared/Div";
import { useDispatch, useSelector } from "react-redux";
import { getAllLanguages } from "app/redux/actions/languageAction";
import { updateLanguage } from "app/services/apis/updateLanguage";
import { addLanguage } from "app/services/apis/addLanguage";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { getAllUsers } from "app/redux/actions/userAction";
import { allocateContent } from "app/services/apis/allocateContent";
import { getMyContentToVerify } from "app/redux/actions/contentAction";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
});
const initialValues = {
  name: "",
};

const AllocateForm = ({ content}) => {
  const Swal = useSwalWrapper();
  const dispatch = useDispatch();
    console.log(content)
  const { user } = useSelector((state) => state.userReducer);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  let { allUsers } = useSelector((state) => state.userReducer);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSubmit = async () => {
    const item = { allocatedBy: user._id, allocatedTo: selectedUser._id };
    const updated_content = await allocateContent(item,content?._id);
    if(updated_content){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Allocated Successfully',
            showConfirmButton: false,
            timer: 1500
        });
        dispatch(getMyContentToVerify)
    }
  };

  allUsers = allUsers?.filter((item) => {
    return item._id != user._id;
  });
  return (
    <Div
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <FormControl>
        <Div sx={{ width: 300, maxWidth: "100%" }}>
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
    </Div>
  );
};
AllocateForm.defaultProps = {
  onSave: () => {},
};
export default AllocateForm;
