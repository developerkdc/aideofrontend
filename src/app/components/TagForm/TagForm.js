import React from 'react';
import * as yup from "yup";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import {Field, Form, Formik} from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Div from "@jumbo/shared/Div";
import { useDispatch } from 'react-redux';
import { updateTag } from 'app/services/apis/updateTag';
import { getAllTags } from 'app/redux/actions/tagAction';
import { addTag } from 'app/services/apis/addTag';


const validationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .required('Name is required')
        .matches(/^\S*$/, 'Spaces are not allowed'),
});
const initialValues = {
    name: "",
};

const TagForm = ({tag, onSave}) => {
    const Swal = useSwalWrapper();
    const dispatch = useDispatch()


    const onTagSave = async (data, { setSubmitting }) => {
        const currentUrl = window.location.pathname;
        let tagUpdated = []
        if(currentUrl=="/add/tags") {
            tagUpdated = await addTag(data);
        }
        else{
            tagUpdated = await updateTag(data);
        }
            if (tagUpdated?.status === 200) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Tag Updated Successfully',
                showConfirmButton: false,
                timer: 1500
            });
            dispatch(getAllTags());
            onSave();
            } else if (tagUpdated?.success === false) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Tag Already Exists',
                showConfirmButton: false,
                timer: 1500
            });
            onSave();
            }
        
      };
    return (
        <Formik
            validateOnChange={true}
            initialValues={tag ? tag : initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={onTagSave}
        >
            {({isSubmitting, setFieldValue }) => (
                <Form noValidate autoComplete="off">
                    <Div
                        sx={{
                            '& .MuiTextField-root': {
                                mb: 3
                            },
                        }}
                    >
                        <JumboTextField fullWidth size="small" variant="outlined" name="name" label="Tag Name"/>
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
TagForm.defaultProps = {
    onSave: () => {
    }
};
export default TagForm;
