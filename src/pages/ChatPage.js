import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { keyframes } from "@emotion/react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  Container,
  TextField,
  CircularProgress,
  Grow,
  useTheme,
} from "@mui/material";
import { Send, MedicalServices, Menu as MenuIcon, ErrorOutline } from "@mui/icons-material";

// Animations
const pulseGlow = keyframes`
  0% { opacity: 0.8; transform: scale(0.98); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 0.8; transform: scale(0.98); }
`;

const verticalFloat = keyframes`
  0% { transform: translateY(-5px); }
  50% { transform: translateY(5px); }
  100% { transform: translateY(-5px); }
`;

const Medverse24Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false); // Track initialization
  const chatContainerRef = useRef(null);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Handle mobile menu open/close
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Navigation items
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Learn", link: "/learn" },
    { name: "Contact", link: "/contact" },
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Initialize with intro message
  useEffect(() => {
    if (!hasInitialized) {
      setMessages([
        {
          summary: "How can I help you medically? The first response will take a few seconds.",
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setHasInitialized(true);
    }
  }, [hasInitialized]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const processResponse = (text) => {
    const cleanText = text
      .replace(/\*\*/g, "")
      .replace(/#/g, "")
      .replace(/(Summary:|Details:)/g, "\n$1")
      .replace(/-\s/g, "\n• ");

    return {
      summary: cleanText.split("Details:")[0].trim(),
      details: cleanText.split("Details:")[1]?.trim() || null,
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      content: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const medicalPrompt = `As Medverse24 AI, provide:
${inputValue.toLowerCase().includes("detail") ? 
  "1. Comprehensive analysis\n2. Differential diagnosis\n3. Management options" : 
  "1. Concise summary\n2. Key recommendations"}
Use medical terminology. Avoid markdown. Query: ${inputValue}`;

      const response = await axios.post(
        "https://medverse-5ciz.onrender.com/api/generate-content",
        { prompt: medicalPrompt }
      );

      const aiResponse = processResponse(response.data?.content);

      setMessages((prev) => [
        ...prev,
        {
          ...aiResponse,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          summary: "Connection error. Please try again.",
          isUser: false,
          isError: true,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at center, #f5fcff 0%, #e6f4f9 100%)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Floating DNA Strand Animation */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url("data:image/svg+xml,%3Csvg width='100' height='56' viewBox='0 0 100 56' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 4L4 28L50 52L96 28L50 4Z' stroke='%23${theme.palette.primary.main.replace(
            "#",
            ""
          )}' stroke-opacity='0.1' stroke-width='2'/%3E%3C/svg%3E")`,
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          py: 4,
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        {/* Header with Navigation */}
        <AppBar
          position="sticky"
          sx={{
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(63,81,181,0.1)",
            borderRadius: 4,
            mb: 4,
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <MedicalServices
                sx={{
                  fontSize: 32,
                  color: theme.palette.primary.main,
                  animation: `${verticalFloat} 3s ease-in-out infinite`,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 400,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, #2a9d8f)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Medverse24
              </Typography>
            </Box>

            {/* Navigation Links (Desktop) */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  href={item.link}
                  sx={{
                    color: theme.palette.text.primary,
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": {
                      color: theme.palette.primary.main,
                      background: "rgba(63,81,181,0.1)",
                    },
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>

            {/* Hamburger Menu (Mobile) */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={handleMenuOpen}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {navItems.map((item) => (
                <MenuItem key={item.name} onClick={handleMenuClose}>
                  <Typography
                    component="a"
                    href={item.link}
                    sx={{ color: theme.palette.text.primary, textDecoration: "none" }}
                  >
                    {item.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Chat Container */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "rgba(255,255,255,0.95)",
            borderRadius: 4,
            boxShadow: "0 16px 48px rgba(63,81,181,0.1)",
            overflow: "hidden",
          }}
        >
          {/* Messages Area */}
          <Box
            ref={chatContainerRef}
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 3,
              background: "radial-gradient(circle at top left, rgba(63,81,181,0.03) 0%, transparent 50%)",
            }}
          >
            {messages.map((msg, i) => (
              <Grow in key={i} timeout={500}>
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: msg.isUser ? "flex-end" : "flex-start",
                  }}
                >
                  {/* Message Bubble */}
                  <Box
                    sx={{
                      maxWidth: "80%",
                      p: 2.5,
                      borderRadius: 4,
                      background: msg.isUser
                        ? "linear-gradient(45deg, #3f51b5, #2196f3)"
                        : "#f8fafc",
                      color: msg.isUser ? "white" : "text.primary",
                      boxShadow: "0 8px 24px rgba(63,81,181,0.1)",
                      position: "relative",
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        [msg.isUser ? "right" : "left"]: -8,
                        top: 16,
                        width: 0,
                        height: 0,
                        borderStyle: "solid",
                        borderWidth: "8px 16px 8px 0",
                        borderColor: msg.isUser
                          ? `transparent ${theme.palette.primary.main} transparent transparent`
                          : "transparent #f8fafc transparent transparent",
                        transform: msg.isUser ? "scaleX(-1)" : "",
                      },
                    }}
                  >
                    {/* Message Content */}
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.7,
                        fontWeight: msg.isUser ? 500 : 400,
                      }}
                    >
                      {msg.isError && (
                        <ErrorOutline sx={{ mr: 1, color: "#ff5252", verticalAlign: "middle" }} />
                      )}
                      {msg.content || msg.summary}
                    </Typography>

                    {/* Details Expansion */}
                    {msg.details && (
                      <Box
                        sx={{
                          mt: 2,
                          pt: 2,
                          borderTop: `1px solid ${msg.isUser ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}`,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.9em",
                            opacity: 0.9,
                            lineHeight: 1.6,
                          }}
                        >
                          {msg.details}
                        </Typography>
                      </Box>
                    )}

                    {/* Timestamp */}
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        mt: 1,
                        opacity: 0.7,
                        color: msg.isUser ? "rgba(255,255,255,0.8)" : "text.secondary",
                      }}
                    >
                      {msg.timestamp}
                    </Typography>
                  </Box>
                </Box>
              </Grow>
            ))}

            {isLoading && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  animation: `${pulseGlow} 1.5s ease-in-out infinite`,
                }}
              >
                <CircularProgress
                  size={24}
                  thickness={4}
                  sx={{ color: theme.palette.primary.main }}
                />
                <Typography variant="body2" color="textSecondary">
                  Analyzing with Medverse24 AI...
                </Typography>
              </Box>
            )}
          </Box>

          {/* Input Area */}
          <Box
            sx={{
              borderTop: "1px solid rgba(0,0,0,0.05)",
              p: 2,
              background: "rgba(255,255,255,0.9)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                alignItems: "center",
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Ask Medverse24 about symptoms, treatments, or health advice..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                multiline
                maxRows={4}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                      boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSendMessage}
                disabled={isLoading}
                sx={{
                  minWidth: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #3f51b5, #2196f3)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 8px 16px ${theme.palette.primary.main}30`,
                  },
                  transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <Send sx={{ fontSize: 24 }} />
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Medverse24Chat;