import {useContext} from "react";
import AppContext from "./context";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Button, Grid, Typography} from "@mui/material";
import {TextField} from "formik-mui";

const LoginMemberForm = ({getMembers}) => {

    const {client} = useContext(AppContext);


    return (
        <>
            <Typography>Login</Typography>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().required('Username is required'),
                    password: Yup.string().required('Password is required')
                })}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    client.memberLoginApi(values)
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

export default LoginMemberForm;