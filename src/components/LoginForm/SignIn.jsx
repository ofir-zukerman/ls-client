import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  topic: {
    display: "flex",
    justifyContent: "center",
    marginTop: "15%",
  },
}));

const SignIn = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.topic} component="h1" variant="inherit">
        Sign In
      </Typography>
    </div>
  );
};

export default SignIn;
