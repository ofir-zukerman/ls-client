import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  messageError: {
    margin: "0",
    color: "red",
  },
}));

const LastName = (props) => {
  const classes = useStyles();

  return (
    <div>
      <TextField
        variant="standard"
        margin="normal"
        fullWidth
        id="lastName"
        type="lastName"
        label="Last Name"
        name="lastName"
        autoComplete="lastName"
        {...props.register("lastName", {
          required: "This field is required.",
        })}
      ></TextField>
      {props.formErrors.lastName && (
        <span className={classes.messageError}>
          {props.formErrors.lastName.message}
        </span>
      )}
    </div>
  );
};

export default LastName;
