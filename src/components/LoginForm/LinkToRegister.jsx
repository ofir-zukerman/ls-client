import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  signUpLink: {
    marginTop: theme.spacing(5),
    display: "flex",
    justifyContent: "center",
    fontSize: "17px",
  },
}));
const LinkToRegister = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.signUpLink}>
      <Grid item>
        {"Don't have an account? "}
        <Link to="/register" style={{ textDecoration: "none" }}>
          {"Sign Up"}
        </Link>
      </Grid>
    </Grid>
  );
};

export default LinkToRegister;
