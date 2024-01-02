import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const SignupForm = () => {
  const { control, handleSubmit, setError, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      await axios.post('http://localhost:4001/user/signup', JSON.stringify(data));
      // Redirect to login page or show a success message
    } catch (error) {
      // Handle validation errors or other errors
      setError('email', { message: 'Email is already in use.' });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5">Sign Up</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              required
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <TextField {...field} label="Name" error={!!errors.name} helperText={errors.name?.message} required fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              required
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' } }}
              render={({ field }) => (
                <TextField {...field} label="Email" type="email" error={!!errors.email} helperText={errors.email?.message} required fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              required
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <TextField {...field} label="Password" type="password" error={!!errors.password} helperText={errors.password?.message} required fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              required
              name="phone"
              control={control}
              defaultValue=""
              rules={{
                required: 'Phone is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Invalid phone number (10 digits allowed)',
                },
              }}
              render={({ field }) => (
                <TextField {...field} label="Phone" type="tel" error={!!errors.phone} helperText={errors.phone?.message} fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              required
              name="gender"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Gender" fullWidth />
              )}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default SignupForm;
