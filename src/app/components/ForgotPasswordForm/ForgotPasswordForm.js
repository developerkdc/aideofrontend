import React from "react";
import * as yup from "yup";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { Field, Form, Formik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import JumboAvatarField from "@jumbo/components/JumboFormik/JumboAvatarField";
import Div from "@jumbo/shared/Div";
import { updateUserDetailsAdmin } from "app/services/apis/updateUserDetailsAdmin";
import { useDispatch } from "react-redux";
import { getAllUsers } from "app/redux/actions/userAction";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { addUser } from "app/services/apis/addUser";
import { sendResetMail } from "app/services/apis/sendResetMail";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});
const initialValues = {
  email: "",
};

const ForgotPasswordForm = ({ user, onSave, hideDialogue }) => {
  const Swal = useSwalWrapper();
  const dispatch = useDispatch();

  const onUserSave = async (data, { setSubmitting }) => {
    // console.log(data)
    let user_updated = [];
    user_updated = await sendResetMail(data);
    if (user_updated?.status == 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Mail Sent Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    if (user_updated?.success == false) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Email Id Doesnt Exists",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    hideDialogue();
    onSave();
  };
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
              padding: 5,
            }}
          >
            <JumboTextField
              fullWidth
              size="small"
              variant="outlined"
              name="email"
              label="Email"
            />
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{ mb: 3 }}
              // loading={isSubmitting || saveMutation.isLoading}
            >
              Send Email
            </LoadingButton>
          </Div>
        </Form>
      )}
    </Formik>
  );
};
ForgotPasswordForm.defaultProps = {
  onSave: () => {},
};
export default ForgotPasswordForm;
