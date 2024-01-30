import React, { useState } from "react";
import {
  Box,
  Typography,
  InputAdornment,
  TextField,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate, Link } from "react-router-dom";
import performRequest from "../../api/AxiosConfig";
import LoadingButton from "@mui/lab/LoadingButton";

const SignInForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const body = {
      username: email,
      password: password,
    };
    try {
      const userLogin = await performRequest("POST", "/user/sign-in", body, "");
      localStorage.setItem("token", userLogin.token);
      setIsLoading(false);
      setOpenSuccess(true);
      setEmail("");
      setPassword("");
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
          <Typography variant="h5">Sign In</Typography>
          <Typography variant="caption">
            If you don't have an account registered
          </Typography>
          <br />
          <Typography variant="caption">
            You can{" "}
            <Typography
              variant="caption"
              sx={{ color: "#0C21C1", fontWeight: "600" }}
            >
              <Link to={"/sign-up"}>Register here !</Link>
            </Typography>
          </Typography>
        </Box>

        <Box>
          <form onSubmit={handleSignIn}>
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
              <LoadingButton
                variant="contained"
                size="small"
                sx={{ backgroundColor: "#0C21C1" }}
                type="submit"
                loading={isLoading}
              >
                Log In
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
          Login In Failed!
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
          Logged In Successfully
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignInForm;
