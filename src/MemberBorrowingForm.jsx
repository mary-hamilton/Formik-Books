import {useContext, useEffect} from "react";
import AppContext from "./context";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import {Button, Grid, MenuItem} from "@mui/material";
import {Select, TextField} from "formik-mui";

const AdminBorrowingForm = ({ getBooks, books }) => {

    const {client} = useContext(AppContext);

    useEffect(() => {
        getBooks();
    })

    if (books.length === 0) {
        return (<p>there are no books yet</p>)
    }

    return (
        <Formik
            initialValues={{
                bookId: books[0].id
            }}
            validationSchema={Yup.object().shape({
                bookId: Yup.string().required('Book ID is required'),
            })}
            onSubmit={({bookId}, {setSubmitting, resetForm}) => {
                setSubmitting(true);
                client.borrowBookApi(bookId).then(getBooks);
                setSubmitting(false);
                resetForm();
            }}
        >
            {({handleSubmit, dirty, isValid, isSubmitting}) => (
                <Form>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <Field
                                component={Select}
                                id="bookId"
                                name="bookId"
                                label="Book ID"
                            >{books.map((book, i) => (
                                <MenuItem key={i} value={book.id}>{book.title}</MenuItem>
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

    )
}

export default AdminBorrowingForm;