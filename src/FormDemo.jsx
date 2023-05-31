import { useEffect, useState } from 'react';

import { Button, Grid, TextField } from '@mui/material';

const FormDemo = ({ setPeople, people }) => {

  const initialFormValues = {
    firstName: '',
    surname: '',
    email: '',
  };

  const initialErrors = {
    firstName: [],
    surname: [],
    email: [],
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialErrors);

  const validateValues = (fieldName, value) => {
    const newFieldErrors = [];

    if (value === '') {
      newFieldErrors.push('Field cannot be empty');
    }

    if (fieldName === 'firstName' || fieldName === 'surname') {
      if (/\d/.test(value)) {
        newFieldErrors.push('Field cannot contain numbers');
      }
    }

    if (fieldName === 'email') {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        newFieldErrors.push('Must be a valid email');
      }
    }

    return newFieldErrors;
  };

  const checkFieldErrors = (field, value) => {
    setErrors({
      ...errors,
      [field]: validateValues(field, value)
    });
  };

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newValues = {
      ...formValues,
      [field]: value
    };
    setFormValues(newValues);
    checkFieldErrors(field, value);
  };

  const handleBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    checkFieldErrors(field, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPeople([...people, formValues]);
    setFormValues(initialFormValues);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid spacing={2} direction="column" container>
        <Grid item>
          <TextField
            onBlur={handleBlur}
            onChange={handleChange}
            fullWidth name="firstName"
            label="First Name"
            error={errors.firstName.length > 0}
            helperText={errors.firstName.join(', ')}
          />
        </Grid>
        <Grid item>
          <TextField
            onBlur={handleBlur}
            onChange={handleChange}
            fullWidth name="surname"
            label="Surname"
            error={errors.surname.length > 0}
            helperText={errors.surname.join(', ')}
          />
        </Grid>
        <Grid item>
          <TextField
            onBlur={handleBlur}
            onChange={handleChange}
            fullWidth type="address"
            name="email"
            label="Email"
            error={errors.email.length > 0}
            helperText={errors.email.join(', ')}
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained">Submit</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormDemo;
