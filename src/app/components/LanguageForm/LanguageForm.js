import React from 'react';
import * as yup from "yup";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import {Field, Form, Formik} from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Div from "@jumbo/shared/Div";
import { useDispatch } from 'react-redux';
import { getAllLanguages } from 'app/redux/actions/languageAction';
import { updateLanguage } from 'app/services/apis/updateLanguage';
import { addLanguage } from 'app/services/apis/addLanguage';


const validationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .required('Name is required'),
});
const initialValues = {
    name: "",
};

const LanguageForm = ({language, onSave}) => {
    const Swal = useSwalWrapper();
    const dispatch = useDispatch()


    const onLanguageSave = async (data, { setSubmitting }) => {
        const currentUrl = window.location.pathname;
        let languageUpdated = []
        if(currentUrl=="/add/language") {
            languageUpdated = await addLanguage(data);
        }
        else{
            languageUpdated = await updateLanguage(data);
        }
            if (languageUpdated?.status === 200) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Language Updated Successfully',
                showConfirmButton: false,
                timer: 1500
            });
            dispatch(getAllLanguages());
            onSave();
            } else if (languageUpdated?.success === false) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Language Already Exists',
                showConfirmButton: false,
                timer: 1500
            });
            onSave();
            }
        
      };
    return (
        <Formik
            validateOnChange={true}
            initialValues={language ? language : initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={onLanguageSave}
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
                        <JumboTextField fullWidth size="small" variant="outlined" name="name" label="Language Name"/>
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
LanguageForm.defaultProps = {
    onSave: () => {
    }
};
export default LanguageForm;
