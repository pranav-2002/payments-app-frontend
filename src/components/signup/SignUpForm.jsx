import React, { useState } from "react";
import {
  Box,
  Typography,
  InputAdornment,
  TextField,
  Stack,
  Snackbar,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import performRequest from "../../api/AxiosConfig";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";

const SignUpForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSignUp = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const body = {
      username: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    try {
      const userSignUp = await performRequest("POST", "/user/signup", body, "");
      localStorage.setItem("token", userSignUp.token);
      setIsLoading(false);
      setOpenSuccess(true);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      navigate("/dashboard");
    } catch (error) {
      setIsLoading(false);
      setOpenError(true);
      console.log(error);
    }
  };

  // Error & Success Snackbars
  const [openError, setOpenError] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  // Loading Button
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Box>
      <Stack direction={"column"} spacing={4}>
        <Box>
          <Typography variant="h5">Sign Up</Typography>
          <Typography variant="caption">
            If you already have an account registered
          </Typography>
          <br />
          <Typography variant="caption">
            You can{" "}
            <Typography
              variant="caption"
              sx={{ color: "#0C21C1", fontWeight: "600" }}
            >
              <Link to={"/sign-in"}>login here !</Link>
            </Typography>
          </Typography>
        </Box>

        <Box>
          <form onSubmit={handleSignUp}>
            <Stack direction={"column"} spacing={4}>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon sx={{ fontSize: "15px" }} />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                label="Email"
                placeholder="Enter your email address"
                type="email"
                sx={{
                  "& input::placeholder": {
                    fontSize: "12px",
                  },
                }}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ fontSize: "15px" }} />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                label="Password"
                placeholder="Enter your password"
                type="password"
                sx={{
                  "& input::placeholder": {
                    fontSize: "12px",
                  },
                }}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineOutlinedIcon sx={{ fontSize: "15px" }} />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                label="First Name"
                placeholder="Enter your first name"
                sx={{
                  "& input::placeholder": {
                    fontSize: "12px",
                  },
                }}
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person4OutlinedIcon sx={{ fontSize: "15px" }} />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                label="Last Name"
                placeholder="Enter your last name"
                sx={{
                  "& input::placeholder": {
                    fontSize: "12px",
                  },
                }}
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <LoadingButton
                variant="contained"
                size="small"
                sx={{ backgroundColor: "#0C21C1" }}
                type="submit"
                loading={isLoading}
              >
                Register
              </LoadingButton>
            </Stack>
          </form>
        </Box>
      </Stack>

      <Snackbar
        open={openError}
        autoHideDuration={5000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Sign Up Failed!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          You have registered successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignUpForm;
