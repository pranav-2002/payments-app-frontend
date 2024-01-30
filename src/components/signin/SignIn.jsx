import React from "react";
import SignInForm from "./SignInForm";
import { Box, Grid } from "@mui/material";
import SignUpHero from "../signup/SignUpHero";

const SignIn = () => {
  return (
    <Box m={3}>
      <Box>
        <Grid
          container
          alignItems={"center"}
          justifyContent={"space-around"}
          spacing={{ xs: 5, sm: 5 }}
        >
          <Grid item md={5} lg={5} xl={5}>
            <SignInForm />
          </Grid>
          <Grid item md={5} lg={5} xl={5}>
            <SignUpHero title="Sign In" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignIn;
