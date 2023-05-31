import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Button, Grid } from '@mui/material';

import { TextField } from 'formik-mui';


const FormikFormDemo = ({ people, setPeople }) => {

  return (
    <Formik
      initialValues={{
        firstName: '',
        surname: '',
        email: '',
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        surname: Yup.string().required('Surname is required'),
        email: Yup.string()
          .required('Email is required')
          .email('Must be a valid email'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        setPeople([...people, values])
        setSubmitting(false)
      }}
    >
      {({ handleSubmit, dirty, isValid, isSubmitting }) => (
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
                id="surname"
                name="surname"
                label="Surname"
                component={TextField}
              />
            </Grid>
            <Grid item>
              <Field
                fullWidth
                id="email"
                name="email"
                label="Email"
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
  );
};

export default FormikFormDemo;