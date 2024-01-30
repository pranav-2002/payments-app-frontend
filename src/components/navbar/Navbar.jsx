import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import performRequest from "../../api/AxiosConfig";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState({});
  const token = localStorage.getItem("token");

  const getUserDetails = async () => {
    if (token) {
      try {
        const currentUser = await performRequest("GET", "/user/id", "", token);
        setCurrentUser(currentUser.user);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getUserDetails();
    return () => {
      setCurrentUser({});
    };
  }, []);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1, position: "sticky", top: "0", zIndex: "99" }}>
      <AppBar position="static" sx={{ backgroundColor: "#000842" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PayPm
          </Typography>
          {window.location.pathname === "/sign-in" ||
          window.location.pathname === "/sign-up" ? (
            <Typography variant="subtitle1" mr={2}>
              Hello, User
            </Typography>
          ) : (
            <Typography variant="subtitle1" mr={2}>
              Hello, {currentUser.firstName ? currentUser?.firstName : "User"}
            </Typography>
          )}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleMenu}
          >
            <AccountCircle />
          </IconButton>
          {window.location.pathname === "/" ||
          window.location.pathname === "/dashboard" ? (
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{ mt: "40px" }}
            >
              <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
            </Menu>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
