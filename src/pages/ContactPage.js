import React, { useState } from "react";
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
  Grid,
  Link,
  useTheme,
} from "@mui/material";
import { MedicalServices, Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;



const float = keyframes`
  0% { transform: translateY(-10px); }
  50% { transform: translateY(10px); }
  100% { transform: translateY(-10px); }
`;

const ContactPage = () => {
  const navigate = useNavigate();
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

  // Navigation items (matched with other pages)
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Learn", link: "/learn" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top left, #e3f2fd 0%, #bbdefb 100%)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Particle Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          "&::before": {
            content: '""',
            position: "absolute",
            width: "20px",
            height: "20px",
            background: theme.palette.primary.main,
            borderRadius: "50%",
            opacity: 0.2,
            animation: `${float} 6s ease-in-out infinite`,
            top: "25%",
            left: "15%",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            width: "15px",
            height: "15px",
            background: theme.palette.secondary.main,
            borderRadius: "50%",
            opacity: 0.2,
            animation: `${float} 8s ease-in-out infinite`,
            top: "60%",
            right: "20%",
          },
        }}
      />

      {/* Navigation Bar (matched with other pages) */}
      <AppBar
        position="sticky"
        sx={{
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(63,81,181,0.1)",
          borderRadius: 4,
          mx: 2,
          mt: 2,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <MedicalServices
              sx={{
                fontSize: 32,
                color: theme.palette.primary.main,
                animation: `${float} 3s ease-in-out infinite`,
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
                onClick={() => navigate(item.link)}
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
              <MenuItem
                key={item.name}
                onClick={() => {
                  navigate(item.link);
                  handleMenuClose();
                }}
              >
                <Typography sx={{ color: theme.palette.text.primary }}>
                  {item.name}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Content Section */}
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          py: { xs: 4, md: 8 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Contact Details Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                animation: `${fadeInUp} 1.5s ease-out`,
                p: 4,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, #2a9d8f)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 3,
                  fontSize: { xs: "2rem", md: "3rem" },
                }}
              >
                Contact Us
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  lineHeight: 1.6,
                  color: theme.palette.text.secondary,
                  animation: `${fadeInUp} 1.5s ease-out 0.3s`,
                  animationFillMode: "both",
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                Have questions or want to collaborate? Reach out to Mukadaz Labs through our website or LinkedIn.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  animation: `${fadeInUp} 1.5s ease-out 0.6s`,
                  animationFillMode: "both",
                }}
              >
                <Link
                  href="https:///github.com/Mukadaaazzzz"
                  target="_blank"
                  rel="noopener"
                  sx={{
                    textDecoration: "none",
                    color: theme.palette.primary.main,
                    fontWeight: "bold",
                    "&:hover": {
                      color: theme.palette.primary.dark,
                      textDecoration: "underline",
                    },
                  }}
                >
                  Github
                </Link>
                <Link
                  href="https://linkedin.com/in/mukadaz-taofeeq" 
                  target="_blank"
                  rel="noopener"
                  sx={{
                    textDecoration: "none",
                    color: theme.palette.primary.main,
                    fontWeight: "bold",
                    "&:hover": {
                      color: theme.palette.primary.dark,
                      textDecoration: "underline",
                    },
                  }}
                >
                  LinkedIn Profile
                </Link>
              </Box>
              <Link
                href="/"
                sx={{
                  display: "block",
                  mt: 4,
                  textDecoration: "none",
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                  animation: `${fadeInUp} 1.5s ease-out 0.9s`,
                  animationFillMode: "both",
                  "&:hover": {
                    color: theme.palette.primary.dark,
                  },
                }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                Back to Homepage
              </Link>
            </Box>
          </Grid>

          {/* Illustration Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: { xs: "200px", md: "400px" },
                animation: `${fadeInUp} 1.5s ease-out 0.3s`,
                animationFillMode: "both",
              }}
            >
              <MedicalServices
                sx={{
                  fontSize: { xs: 100, md: 200 },
                  color: theme.palette.primary.main,
                  opacity: 0.2,
                  animation: `${float} 4s ease-in-out infinite`,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Animation Keyframes */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0% { transform: translateY(-10px); }
          50% { transform: translateY(10px); }
          100% { transform: translateY(-10px); }
        }
        @keyframes pulseGlow {
          0% { opacity: 0.8; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0.8; transform: scale(0.98); }
        }
      `}</style>
    </Box>
  );
};

export default ContactPage;