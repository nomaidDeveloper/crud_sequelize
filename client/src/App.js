// App.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Container, TextField, Button, Typography, AppBar, Toolbar } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChatModule from './component/ChatModule';
import SignupForm from './pages/SignupForm';
import LoginForm from './pages/LoginForm';

const socket = io('http://localhost:4001');

const LoginPage = ({ handleLogin }) => {
  const { control, handleSubmit } = useForm();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Real-Time Chat App</Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Username" required />}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </div>
  );
};



function App() {
  const [messages, setMessages] = useState([]);
  const { control, handleSubmit, setValue } = useForm();
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (username) {
      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [username]);

  const handleLogin = (data) => {
    setUsername(data.username);
  };

  const handleSendMessage = (data) => {
    socket.emit('sendMessage', { username, text: data.messageText });
    setValue('messageText', ''); // Clear the message input
  };

  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<SignupForm />} />
          <Route
            path="/"
            element={
              !username ? (
                <div>
                  <AppBar position="static">
                    <Toolbar>
                      <Typography variant="h6">Real-Time Chat App</Typography>
                    </Toolbar>
                  </AppBar>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </div>
              ) : (
                <ChatModule username={username} messages={messages} handleSendMessage={handleSendMessage} />
              )
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
