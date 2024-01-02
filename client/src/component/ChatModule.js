// ChatModule.js
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, AppBar, Toolbar } from '@mui/material';
import Message from '../Message';
const ChatModule = ({ username, messages, handleSendMessage }) => {
  const { control, handleSubmit, setValue } = useForm();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Welcome, {username}!</Typography>
        </Toolbar>
      </AppBar>
      <div className="messages">
        {messages.map((message, index) => (
          <Message key={index} username={message.username} text={message.text} />
        ))}
      </div>
      <form onSubmit={handleSubmit(handleSendMessage)}>
        <Controller
          name="messageText"
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Type your message..." required />}
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatModule;
