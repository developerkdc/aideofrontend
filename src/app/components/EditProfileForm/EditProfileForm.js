import React, { useEffect } from "react";
import * as yup from "yup";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { Field, Form, Formik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import JumboAvatarField from "@jumbo/components/JumboFormik/JumboAvatarField";
import Div from "@jumbo/shared/Div";
import { updateUserDetailsAdmin } from "app/services/apis/updateUserDetailsAdmin";
import { useDispatch } from "react-redux";
import { getAllUsers, loadUser } from "app/redux/actions/userAction";
import { Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { addUser } from "app/services/apis/addUser";
import { updateUserDetails } from "app/services/apis/updateUserDetails";
import UpdatePasswordForm from "../UpdatePasswordForm/UpdatePassword";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});
const initialValues = {
  name: "",
  phone: "",
  role: "",
  email: "",
  thumbnail: "",
  password: "",
};

const EditProfileForm = ({ user, onSave }) => {
  const Swal = useSwalWrapper();
  const dispatch = useDispatch();
  const { showDialog, hideDialog } = useJumboDialog();
  const hideDialogAndRefreshContactsList = React.useCallback(() => {
    hideDialog();
  }, [hideDialog]);
  const onUserSave = async (data, { setSubmitting }) => {
    // console.log(data)
    let user_updated = await updateUserDetails(data);
    // console.log(user_updated);
    if (user_updated?.success == true) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Profile Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      onSave();
      dispatch(loadUser());
      window.location.reload();
    }
    if (user_updated?.success == false) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Email Id Already Exists",
        showConfirmButton: false,
        timer: 1500,
      });
      onSave();
    }
  };

  const handleResetPassword = () => {
    showDialog({
      title: "Update Password",
      content: <UpdatePasswordForm onSave={hideDialogAndRefreshContactsList} />,
    });
  };

  useEffect(() => {}, [user?.thumbnail]);
  return (
    <Formik
      validateOnChange={true}
      initialValues={user ? user : initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={onUserSave}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form noValidate autoComplete="off">
          <Div
            sx={{
              "& .MuiTextField-root": {
                mb: 3,
              },
              p: 5,
            }}
          >
            <JumboAvatarField
              name={"thumbnail"}
              alt={"user profile pic"}
              onFileSelection={(file) => {
                setFieldValue("thumbnail", file);
              }}
              src={`https://aideo-backend.onrender.com/${user?.thumbnail}`}
              sx={{
                width: 100,
                height: 100,
                margin: "0 auto 24px",
                "& img": {
                  objectFit: "contain",
                },
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />

            <JumboTextField
              fullWidth
              size="small"
              variant="outlined"
              name="name"
              // label="Name"
            />
            <JumboTextField
              fullWidth
              size="small"
              variant="outlined"
              name="email"
              // label="Email"
            />
            <Typography
              variant="button"
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 2,
                "&:hover": {
                  transform: "scale(1.2)",
                  transition: "transform 0.3s ease",
                  color: "crimson",
                  cursor: "pointer",
                },
              }}
              onClick={handleResetPassword}
            >
              Reset Password
            </Typography>
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{ mb: 3 }}
              // loading={isSubmitting || saveMutation.isLoading}
            >
              Save
            </LoadingButton>
          </Div>
        </Form>
      )}
    </Formik>
  );
};
EditProfileForm.defaultProps = {
  onSave: () => {},
};
export default EditProfileForm;
