import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';

import {Button, Grid, MenuItem, Typography} from '@mui/material';

import {Select, TextField} from 'formik-mui';
import {useContext} from "react";
import AppContext from "./context";


const BookForm = ({ getBooks, authors, categories }) => {


    const {client} = useContext(AppContext);
    if (authors.length === 0) {
        return (<p>you have no authors in your pathetic tiny Library</p>)
    }


    return (
        <>
            <Formik
                initialValues={{
                    title: '',
                    synopsis: '',
                    categoryId: categories[0].id,
                    authorId: authors[0].id
                }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().required('Title is required'),
                    synopsis: Yup.string().required('Synopsis is required'),
                    categoryId: Yup.string().required('Category ID is required'),
                    authorId: Yup.string().required('Author ID is required')
                })}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
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
                                    component={Select}
                                    id="categoryId"
                                    name="categoryId"
                                    label="Category ID"
                                >{categories.map((category, i) => (
                                    <MenuItem key={i} value={category.id}>{category.title}</MenuItem>
                                ))}
                                </Field>
                            </Grid>
                            <Grid item>
                                <Field
                                    component={Select}
                                    id="authorId"
                                    name="authorId"
                                    label="Author ID"
                                >{authors.map((author, i) => (
                                    <MenuItem key={i} value={author.id}>{author.name}</MenuItem>
                                ))}
                                </Field>
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