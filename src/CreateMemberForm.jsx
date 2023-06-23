import {useContext} from "react";
import AppContext from "./context";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Button, Grid, Typography} from "@mui/material";
import {TextField} from "formik-mui";

const CreateMemberForm = ({getMembers}) => {

    const {client} = useContext(AppContext);


    return (
        <>
            <Typography>Or Signup</Typography>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    username: '',
                    password: ''
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string().required('First name is required'),
                    lastName: Yup.string().required('Last name is required'),
                    username: Yup.string().required('Username is required'),
                    password: Yup.string().required('Password is required')
                })}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    client.createMemberApi(values)
                        .then(() => {
                            setSubmitting(false);
                            resetForm();
                        })
                        .catch(() => {
                            setSubmitting(false)
                        })

                }}
            >
                {({handleSubmit, dirty, isValid, isSubmitting}) => (
                    <Form>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <Field
                                    fullWidth
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    component={TextField}
                                />
                            </Grid>
                            <Grid item>
                                <Field
                                    fullWidth
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    component={TextField}
                                />
                            </Grid>
                            <Grid item>
                                <Field
                                    fullWidth
                                    id="username"
                                    name="username"
                                    label="Username"
                                    component={TextField}
                                />
                            </Grid>
                            <Grid item>
                                <Field
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
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
        </>
    )
}

export default CreateMemberForm;