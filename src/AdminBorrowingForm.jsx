import {useContext, useEffect} from "react";
import AppContext from "./context";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import {Button, Grid, MenuItem} from "@mui/material";
import {Select, TextField} from "formik-mui";

const AdminBorrowingForm = ({ getBooks, getMembers, members, books }) => {

    const {client} = useContext(AppContext);

    useEffect(() => {
        getBooks();
        getMembers();
    }, [])

    if (members.length === 0 || books.length === 0) {
        return (<p>you have no members or books yet</p>)
    }

    return (
        <Formik
            initialValues={{
                memberId: members[0].memberId,
                bookId: books[0].id
            }}
            validationSchema={Yup.object().shape({
                memberId: Yup.string().required('Member ID is required'),
                bookId: Yup.string().required('Book ID is required'),
            })}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                setSubmitting(true);
                client.borrowBookApi(values).then(getBooks);
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
                                id="memberId"
                                name="memberId"
                                label="Member ID"
                            >{members.map((member, i) => (
                                <MenuItem key={i} value={member.memberId}>{member.firstName}{member.lastName}</MenuItem>
                            ))}
                            </Field>
                        </Grid>
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