import React, { useState } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  signInLink: {
    marginTop: theme.spacing(5),
    display: "flex",
    justifyContent: "center",
    fontSize: "17px",
  },
}));

const LinkToLogin = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.signInLink}>
      <Grid item>
        {"Have an account? "}
        <Link to="/" style={{ textDecoration: "none" }}>
          {"Sign In"}
        </Link>
      </Grid>
    </Grid>
  );
};

export default LinkToLogin;
