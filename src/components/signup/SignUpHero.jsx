import React from "react";
import SignUpBackground from "../../assets/sign-up.svg";
import { Box, Typography } from "@mui/material";

const SignUpHero = ({ title }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#000842",
        border: "1px solid #000842",
        borderRadius: "15px",
      }}
      p={2}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={SignUpBackground}
          sx={{
            width: {
              xs: "250px",
              sm: "250px",
              md: "450px",
              lg: "450px",
              xl: "450px",
            },
            height: {
              xs: "250px",
              sm: "250px",
              md: "450px",
              lg: "450px",
              xl: "450px",
            },
          }}
          alt="background image for sign up page"
        ></Box>
      </Box>
      <Box mt={5} ml={3}>
        <Typography variant="h5" color={"#fff"} fontWeight={"600"}>
          {title} to PayPm
        </Typography>
        <Typography variant="caption" color={"#e6e6e6"}>
          Payments made easier than ever
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpHero;
