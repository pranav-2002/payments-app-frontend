import {
  Avatar,
  Box,
  Stack,
  Typography,
  Button,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import performRequest from "../../api/AxiosConfig";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";

const Users = ({ userData }) => {
  const [amount, setAmount] = useState(0);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const token = localStorage.getItem("token");

  const initiateTransaction = async () => {
    setIsLoading(true);
    const body = {
      to: userData._id,
      amount: parseInt(amount),
    };
    try {
      const result = await performRequest(
        "POST",
        "/account/transfer",
        body,
        token
      );
      console.log(result);
      setOpenSuccess(true);
      setIsLoading(false);
      setAmount("");
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
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Box>
          <Stack direction={"row"} alignItems={"center"}>
            <Avatar sizes="small">
              {userData?.firstName[0].toUpperCase()}
            </Avatar>
            <Typography typography="subtitle1" fontWeight={"600"} ml={2}>
              {userData?.firstName + " " + userData?.lastName}
            </Typography>
          </Stack>
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#0C21C1" }}
            onClick={handleClickOpen}
          >
            Send Money
          </Button>
        </Box>
      </Stack>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle textAlign={"center"} fontWeight={"600"}>
          Send Money
        </DialogTitle>
        <DialogContent>
          <Box>
            <Stack direction={"row"} alignItems={"center"} mb={3}>
              <Avatar>{userData?.firstName[0].toUpperCase()}</Avatar>
              <Typography variant="h6" ml={2}>
                {userData?.firstName + " " + userData?.lastName}{" "}
                <Typography variant="caption">
                  ({userData?.username})
                </Typography>
              </Typography>
            </Stack>
          </Box>
          <TextField
            label="Amount"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupeeIcon fontSize="15px" />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            placeholder="Enter amount"
            size="small"
            type="number"
            fullWidth
            sx={{
              "& input::placeholder": {
                fontSize: "12px",
              },
            }}
            value={amount}
            required
            onChange={(e) => setAmount(e.target.value)}
          />
        </DialogContent>
        <LoadingButton
          variant="contained"
          loading={isLoading}
          onClick={initiateTransaction}
        >
          Initiate Transfer
        </LoadingButton>
      </Dialog>

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
          Transaction Failed!
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
          Transaction Completed Successfully
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Users;
