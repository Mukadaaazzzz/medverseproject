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

const HomePage = () => {
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

  // Navigation items (matched with chat page)
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
            top: "20%",
            left: "10%",
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
            right: "15%",
          },
        }}
      />

      {/* Navigation Bar (matched with chat page) */}
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

      {/* Hero Section */}
      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          py: 4,
        }}
      >
        <Box
          sx={{
            animation: `${fadeInUp} 1.5s ease-out`,
            transform: "translateZ(0)",
            "&:hover": {
              transform: "scale(1.02)",
              transition: "transform 0.3s ease",
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, #2a9d8f)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
              fontSize: { xs: "2.5rem", md: "4rem" },
            }}
          >
            Welcome to Medverse24
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.text.secondary,
              mb: 5,
              animation: `${fadeInUp} 1.5s ease-out 0.5s`,
              animationFillMode: "both",
              fontSize: { xs: "1.25rem", md: "1.75rem" },
            }}
          >
            Bridging the gap between doctors and patients with AI-powered care
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/chat")}
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, #2a9d8f)`,
              color: "white",
              fontSize: "1.1rem",
              px: 4,
              py: 1.5,
              borderRadius: 3,
              animation: `${fadeInUp} 1.5s ease-out 1s`,
              animationFillMode: "both",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: `0 8px 24px ${theme.palette.primary.main}50`,
              },
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            Try Now
          </Button>
        </Box>
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

export default HomePage;