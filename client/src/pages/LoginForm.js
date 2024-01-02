import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const LoginForm = () => {
  const { control, handleSubmit, setError } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:4001/user/login', data);
      // Redirect to the chat page or show a success message
    } catch (error) {
      // Handle validation errors or other errors
      setError('email', { message: 'Invalid email or password.' });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5">Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Email" type="email" required fullWidth />}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => <TextField {...field} label="Password" type="password" required fullWidth />}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
