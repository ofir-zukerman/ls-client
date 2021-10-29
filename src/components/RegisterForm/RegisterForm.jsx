import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../Navbar/Navbar";
import AlertError from "../AlertError";
import Terms from "../Terms";
import SignUp from "./SignUp";
import Register from "./Register";
import LinkToLogin from "./LinkToLogin";
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

const RegisterForm = () => {
  const [error, setError] = useState(false);

  const classes = useStyles();

  return (
    <div className={classes.bodyBorder}>
      <Navbar />
      <Container component="main" maxWidth="sm">
        <AlertError error={error} setError={setError}/>
        <div className={classes.marginTop}>
          <SignUp />
          <div className={classes.marginTop}>
            <AvatarIcon />
            <Register setError={setError} />
            <LinkToLogin />
            <Terms />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RegisterForm;
