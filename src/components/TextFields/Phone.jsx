import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  messageError: {
    margin: "0",
    color: "red",
  },
}));

const Phone = (props) => {
  const classes = useStyles();

  return (
    <div>
      <TextField
        variant="standard"
        margin="normal"
        fullWidth
        id="phone"
        type="number"
        label="Phone"
        name="phone"
        autoComplete="phone"
        {...props.register("phone", {
          required: "This field is required.",
        })}
      ></TextField>
      <div>
        {props.formErrors.phone && (
          <span className={classes.messageError}>
            {props.formErrors.phone.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Phone;
