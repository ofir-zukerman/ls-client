import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  messageError: {
    margin: "0",
    color: "red",
  },
}));

const Email = (props) => {
  const classes = useStyles();

  return (
    <div>
      <TextField
        variant="standard"
        margin="normal"
        fullWidth
        id="email"
        type="email"
        label="Email"
        name="email"
        autoComplete="email"
        {...props.register("email", { required: "This field is required." })}
      ></TextField>
      {props.formErrors.email && (
        <span className={classes.messageError}>
          {props.formErrors.email.message}
        </span>
      )}
    </div>
  );
};

export default Email;
