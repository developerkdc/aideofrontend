import React from 'react';
import * as yup from "yup";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import {Field, Form, Formik} from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import JumboAvatarField from "@jumbo/components/JumboFormik/JumboAvatarField";
import Div from "@jumbo/shared/Div";
import { updateUserDetailsAdmin } from 'app/services/apis/updateUserDetailsAdmin';
import { useDispatch } from 'react-redux';
import { getAllUsers } from 'app/redux/actions/userAction';
import { Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { addUser } from 'app/services/apis/addUser';

const validationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .required('Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
});
const initialValues = {
    name: "",
    phone: "",
    role: "",
    email: "",
    profile_pic: "",
    password:""
};

const UserForm = ({user, onSave}) => {
    const Swal = useSwalWrapper();
    const dispatch = useDispatch()

    const onUserSave = async (data, {setSubmitting}) => {
        // console.log(data)
        let user_updated = []
        if(data._id){
            user_updated = await updateUserDetailsAdmin(data)
        }
        else{
            user_updated = await addUser(data)
        }
        // console.log(user_updated)
        if(user_updated?.status== 201){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'User Added Successfully',
                showConfirmButton: false,
                timer: 1500
            });
            dispatch(getAllUsers())
            onSave()
        }
        if(user_updated?.status== 200){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'User Updated Successfully',
                showConfirmButton: false,
                timer: 1500
            });
            dispatch(getAllUsers())
            onSave()
        }
        if(user_updated?.success== false){
            Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Email Id Already Exists',
                            showConfirmButton: false,
                            timer: 1500
                        });
            onSave()
        }
        
        
    };
    return (
        <Formik
            validateOnChange={true}
            initialValues={user ? user : initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={onUserSave}
        >
            {({isSubmitting, setFieldValue }) => (
                <Form noValidate autoComplete="off">
                    <Div
                        sx={{
                            '& .MuiTextField-root': {
                                mb: 3
                            },
                            padding:5,
                            width:"100%"
                        }}
                    >
                        {/* <JumboAvatarField
                            name={"profile_pic"}
                            alt={"user profile pic"}
                            onFileSelection={(file) => setFieldValue("profile_pic", file)}
                            sx={{width: 60, height: 60, margin: '0 auto 24px'}}
                        /> */}
                        <JumboTextField fullWidth size="small" variant="outlined" name="name" label="Name"/>
                        <JumboTextField fullWidth size="small" variant="outlined" name="email" label="Email"/>
                        {/* {!user ? <JumboTextField fullWidth size="small" variant="outlined" name="password" label="Password"/>: null} */}
                        
                        
                        <InputLabel id="to">Role</InputLabel>
                        <Grid item xs={6}>
                        <Field
                        as={Select}
                        labelId="role"
                        id="role"
                        name="role"
                        fullWidth
                        size="small"
                        variant="outlined"
                        sx={{mb: 3}}
                        >
                        <MenuItem value="manager">Manager</MenuItem>
                        <MenuItem value="creator">Creator</MenuItem>
                        </Field>
                        </Grid>
                        <LoadingButton
                            fullWidth
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{mb: 3}}
                            // loading={isSubmitting || saveMutation.isLoading}
                        >Save</LoadingButton>
                    </Div>
                </Form>
            )}
        </Formik>
    );
};
UserForm.defaultProps = {
    onSave: () => {
    }
};
export default UserForm;
