import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { InputAdornment } from "@material-ui/core";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  messageError: {
    margin: "0",
    color: "red",
  },
}));

const Password = (props) => {
  const classes = useStyles();

  return (
    <div>
      <TextField
        variant="standard"
        margin="normal"
        fullWidth
        id="password"
        type="password"
        label="Password"
        name="password"
        autoComplete="password"
        {...props.register("password", {
          required: "This field is required.",
        })}
        type={props.showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={props.shandleClickShowPassword}
                onMouseDown={props.handleMouseDownPassword}
              >
                {props.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
      {props.formErrors.password && (
        <span className={classes.messageError}>
          {props.formErrors.password.message}
        </span>
      )}
    </div>
  );
};

export default Password;
