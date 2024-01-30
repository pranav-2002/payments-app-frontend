import React from "react";
import SignUpForm from "./SignUpForm";
import { Box, Grid } from "@mui/material";
import SignUpHero from "./SignUpHero";

const SignUp = () => {
  return (
    <Box>
      <Box m={3}>
        <Grid
          container
          alignItems={"center"}
          justifyContent={"space-around"}
          spacing={{ xs: 5, sm: 5 }}
        >
          <Grid item md={5} lg={5} xl={5}>
            <SignUpForm />
          </Grid>
          <Grid item md={5} lg={5} xl={5}>
            <SignUpHero title="Sign Up" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUp;
