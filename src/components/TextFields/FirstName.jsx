import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  messageError: {
    margin: "0",
    color: "red",
  },
}));

const FirstName = (props) => {
  const classes = useStyles();

  return (
    <div>
      <TextField
        variant="standard"
        margin="normal"
        fullWidth
        id="firstName"
        type="firstName"
        label="First Name"
        name="firstName"
        autoComplete="firstName"
        {...props.register("firstName", {
          required: "This field is required.",
        })}
      ></TextField>
      <div>
        {props.formErrors.firstName && (
          <span className={classes.messageError}>
            {props.formErrors.firstName.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default FirstName;
