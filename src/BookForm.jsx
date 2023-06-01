import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';

import {Button, Grid, Typography} from '@mui/material';

import {TextField} from 'formik-mui';
import {useContext} from "react";
import AppContext from "./context";


const BookForm = ({ getBooks}) => {

    const {client} = useContext(AppContext);

    return (
        <>
            <Formik
                initialValues={{
                    title: '',
                    synopsis: '',
                    categoryId: '',
                    authorId: ''
                }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().required('Title is required'),
                    synopsis: Yup.string().required('Synopsis is required'),
                    categoryId: Yup.string().required('Category ID is required'),
                    authorId: Yup.string().required('Author ID is required')
                })}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    console.log(values);
                    client.createBookApi(values).then(getBooks);
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
                                    id="synopsis"
                                    name="synopsis"
                                    label="Synopsis"
                                    component={TextField}
                                />
                            </Grid>
                            <Grid item>
                                <Field
                                    fullWidth
                                    id="categoryId"
                                    name="categoryId"
                                    label="Category ID"
                                    component={TextField}
                                />
                            </Grid>
                            <Grid item>
                                <Field
                                    fullWidth
                                    id="authorId"
                                    name="authorId"
                                    label="Author ID"
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
    );
};

export default BookForm;