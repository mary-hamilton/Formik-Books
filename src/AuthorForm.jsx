import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Button, Grid} from "@mui/material";
import {TextField} from "formik-mui";
import {useContext} from "react";
import AppContext from "./context";

const AuthorForm = ({ getAuthors }) => {

    const {client} = useContext(AppContext);

    return (
    <Formik
        initialValues={{
            name: '',
        }}
        validationSchema={Yup.object().shape({
            name: Yup.string().required('Name is required'),
        })}
        onSubmit={(values, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            client.createAuthorApi(values).then(getAuthors);
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
                            id="name"
                            name="name"
                            label="Name"
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

export default AuthorForm;