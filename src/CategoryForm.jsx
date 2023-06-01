import {Button, Grid, Typography} from "@mui/material";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {TextField} from "formik-mui";
import {useContext} from "react";
import AppContext from "./context";

const CategoryForm = ({ getCategories }) => {

    const {client} = useContext(AppContext);

    return (
    <Formik
        initialValues={{
            title: '',
            description: '',
        }}
        validationSchema={Yup.object().shape({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
        })}
        onSubmit={(values, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            client.createCategoryApi(values).then(getCategories);
            setSubmitting(false);
            resetForm();
        }}
    >
        {({handleSubmit, dirty, isValid, isSubmitting}) => (
            <Form>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Field
                            fullWidth
                            id="title"
                            name="title"
                            label="Title"
                            component={TextField}
                        />
                    </Grid>
                    <Grid item>
                        <Field
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            component={TextField}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            disabled={!dirty || isSubmitting || !isValid}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        )}
    </Formik>
    )
}

export default CategoryForm;