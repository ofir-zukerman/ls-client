import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../Navbar/Navbar";
import Login from "./Login";
import AlertError from "../AlertError";
import SignIn from "./SignIn";
import LinkToRegister from "./LinkToRegister";
import Terms from "../Terms";
import AvatarIcon from "../AvatarIcon";

const useStyles = makeStyles((theme) => ({
  bodyBorder: {
    border: "4px solid white",
    backgroundColor: "#F1F1F1",
  },
  marginTop: {
    marginTop: theme.spacing(15),
  },
}));

const LoginForm = () => {
  const [error, setError] = useState(false);

  const classes = useStyles();

  return (
    <div className={classes.bodyBorder}>
      <Navbar />
      <Container component="main" maxWidth="sm">
        <div className={classes.marginTop}>
          <AlertError error={error} setError={setError} />
          <SignIn />
          <div className={classes.marginTop}>
            <AvatarIcon />
            <Login setError={setError} />
            <LinkToRegister />
            <Terms />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginForm;
