import React, { useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
  Container,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    // Add the user's message to the chat
    setMessages([...messages, { text: inputValue, sender: "user" }]);

    try {
      // Send the prompt to the backend API
      const response = await axios.post(
        "https://medverse-5ciz.onrender.com/api/generate-content",
        { prompt: inputValue }
      );

      console.log("Full API response:", response.data);

      // Extract the content from the API response
      const reply = response.data?.content;

      // Check if the reply exists
      if (reply) {
        // Add the AI's response to the chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: reply, sender: "ai" },
        ]);
      } else {
        throw new Error("No reply found in the response.");
      }
    } catch (error) {
      console.error("Error sending message:", error.message);
    }

    // Clear the input field
    setInputValue("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Medverse24 Chat
          </Typography>
          <IconButton color="inherit" href="/">
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit" href="/about">
            <InfoIcon />
          </IconButton>
          <IconButton color="inherit" href="/learn">
            <SchoolIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Hero Message */}
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            backgroundColor: "#e3f2fd",
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Ask me something about your health...
          </Typography>
          <Typography variant="body1">
            I'm here to help you understand your symptoms and provide accurate
            information. Start the conversation by typing below.
          </Typography>
        </Paper>
      </Container>

      {/* Chat Area */}
      <Container maxWidth="md" sx={{ flexGrow: 1, mb: 4 }}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            backgroundColor: "#ffffff",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            height: "500px",
            overflowY: "auto",
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent:
                  message.sender === "user" ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Box
                sx={{
                  maxWidth: "70%",
                  padding: 1,
                  borderRadius: 2,
                  backgroundColor:
                    message.sender === "user" ? "#cfe8fc" : "#e0e0e0",
                  color: "#000",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {message.sender === "ai" && (
                    <ChatBubbleOutlineIcon sx={{ mr: 1, color: "#3f51b5" }} />
                  )}
                  {message.text}
                </Typography>
              </Box>
            </Box>
          ))}
        </Paper>
      </Container>

      {/* Input Area */}
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            gap: 1,
            backgroundColor: "#ffffff",
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            fullWidth
            multiline
            variant="outlined"
          />
          <Button
            onClick={handleSendMessage}
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ChatPage;
