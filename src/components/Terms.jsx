import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  terms: {
    margin: theme.spacing(15),
    display: "flex",
    justifyContent: "center",
  },
}));

const Terms = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography
        className={classes.terms}
        variant="caption"
        display="block"
        gutterBottom
      >
        <u>
          <b>Our Terms of Use and Privacy Policy</b>
        </u>
      </Typography>
    </div>
  );
};

export default Terms;
