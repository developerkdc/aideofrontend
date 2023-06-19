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
import { editTopic } from 'app/services/apis/editTopic';
import { getAllTopics } from 'app/redux/actions/topicAction';
import { addTopic } from 'app/services/apis/addTopic';


const validationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .required('Name is required')
});
const initialValues = {
    name: "",
    description: ""
};

const TopicForm = ({topic, onSave}) => {
    const Swal = useSwalWrapper();
    const dispatch = useDispatch()

    const onTagSave = async (data, { setSubmitting }) => {
        const currentUrl = window.location.pathname;
        let topicUpdated = []
        if(currentUrl=="/add/topic") {
            topicUpdated = await addTopic(data);
        }
        else{
            topicUpdated = await editTopic(data);
        }
            if (topicUpdated?.status === 200) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Topic Updated Successfully',
                showConfirmButton: false,
                timer: 1500
            });
            dispatch(getAllTopics());
            onSave();
            } else if (topicUpdated?.success === false) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Topic Already Exists',
                showConfirmButton: false,
                timer: 1500
            });
            onSave();
            }
        
      };
    return (
        <Formik
            validateOnChange={true}
            initialValues={topic ? topic : initialValues}
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
                        <JumboTextField fullWidth size="small" variant="outlined" name="name" label="Topic Name"/>
                        {
                            !topic ? <JumboTextField fullWidth size="small" variant="outlined" name="description" label="Description"/> :null
                        }
                        <LoadingButton
                            fullWidth
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{mb: 3}}
                            loading={isSubmitting}
                        >Save</LoadingButton>
                    </Div>
                </Form>
            )}
        </Formik>
    );
};
TopicForm.defaultProps = {
    onSave: () => {
    }
};
export default TopicForm;
