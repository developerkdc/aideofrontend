import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { Facebook, Google, Twitter } from "@mui/icons-material";
import Div from "@jumbo/shared/Div";
import { alpha } from "@mui/material/styles";
import { ASSET_IMAGES } from "../../../app/utils/constants/paths";
import { getAssetPath } from "../../../app/utils/appHelpers";
import * as yup from "yup";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate, useParams } from "react-router-dom";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import ErrorAlert from "../extensions/sweetalert/components/ErrorAlert";
import swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "app/redux/actions/userAction";
import SweetAlerts from "../extensions/sweetalert/SweetAlert";
import Swal from "sweetalert2";
import UserForm from "app/components/UserForm/UserForm";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import ForgotPasswordForm from "app/components/ForgotPasswordForm/ForgotPasswordForm";
import { resetPassword } from "app/services/apis/resetPassword";

const validationSchema = yup.object({
  password: yup.string("Enter your password").required("Password is required"),
  confirmPassword: yup
    .string("Enter your password")
    .required("Password is required"),
});

const ForgotPassword = ({ disableSmLogin }) => {
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.userReducer
  );
  const { setAuthToken } = useJumboAuth();
  const { showDialog, hideDialog } = useJumboDialog();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Invalid Credentials",
        text: error,
      });
      dispatch(clearErrors());
    }
    if (isAuthenticated && user.role == "admin") {
      navigate("/content");
    } else if (isAuthenticated && user.role != "admin") {
      navigate("/mycontent");
    }
  }, [dispatch, error, isAuthenticated]);
  const { token } = useParams();

  const onReset = async (password, confirmPassword) => {
    const item = {
      password: password,
      confirmPassword: confirmPassword,
      token: token,
    };
    const data = await resetPassword(item);
    if(data.status==200){
      Swal.fire({
        icon: "success",
        title: "Password Reset Successfully",
        text: "",
      });
      navigate('/mycontent')
    }
  };

  const handleForgotPassword = () => {
    showDialog({
      title: "Enter Email For Recovery",
      content: <ForgotPasswordForm hideDialogue={hideDialog} />,
    });
  };

  return (
    <Div
      sx={{
        width: 720,
        maxWidth: "100%",
        margin: "auto",
        p: 4,
      }}
    >
      <Card
        sx={{
          display: "flex",
          minWidth: 0,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <CardContent
          sx={{
            flex: "0 1 300px",
            position: "relative",
            background: `#0267a0 url(${getAssetPath(
              `${ASSET_IMAGES}/widgets/keith-luke.jpg`,
              "640x428"
            )}) no-repeat center`,
            backgroundSize: "cover",

            "&::after": {
              display: "inline-block",
              position: "absolute",
              content: `''`,
              inset: 0,
              backgroundColor: alpha("#0267a0", 0.65),
            },
          }}
        >
          <Div
            sx={{
              display: "flex",
              minWidth: 0,
              flex: 1,
              flexDirection: "column",
              color: "common.white",
              position: "relative",
              zIndex: 1,
              height: "100%",
            }}
          >
            <Div sx={{ mb: 2 }}>
              <Typography
                variant={"h3"}
                color={"inherit"}
                fontWeight={500}
                mb={3}
              >
                Reset Password
              </Typography>
            </Div>

            <Div sx={{ mt: "auto" }}>
              {/* <Link href="#" underline="none" sx={{ display: "inline-flex" }}>
                <img src={`${ASSET_IMAGES}/logo-white.png`} alt="Jumbo React" />
              </Link> */}
            </Div>
          </Div>
        </CardContent>
        <CardContent sx={{ flex: 1, p: 4 }}>
          <Formik
            validateOnChange={true}
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              onReset(data.password, data.confirmPassword);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
                <Div sx={{ mt: 1, mb: 3 }}>
                  <JumboTextField fullWidth name="password" label="Password" />
                </Div>
                <Div sx={{ mt: 1, mb: 2 }}>
                  <JumboTextField
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                  />
                </Div>
                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ mb: 3 }}
                  loading={isSubmitting}
                >
                  Reset Password
                </LoadingButton>
                {!disableSmLogin && <React.Fragment></React.Fragment>}
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Div>
  );
};

export default ForgotPassword;
