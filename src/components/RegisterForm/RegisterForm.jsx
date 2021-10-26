import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { REGISTER_USER_API } from "../../consts";
import { useHistory } from "react-router-dom";
import localStorageService from "../../services/localStorage.service";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { InputAdornment } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { ErrorMessage } from "@hookform/error-message";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  bodyBorder: {
    border: "4px solid white",
    backgroundColor: "#F1F1F1",
  },
  navbar: {
    boxShadow: "none",
    backgroundColor: "white",
  },
  topic: {
    display: "flex",
    justifyContent: "center",
    marginTop: "15%",
  },
  registerDiv: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    maxWidth: "100%",
    marginTop: "-20px",
    border: "1px solid #f1f1f1",
    background: "white",
    padding: "60px 80px 40px 80px",
  },
  passwordTypo: {
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
    width: "40%",
  },
  signInLink: {
    margin: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
    fontSize: "17px",
  },
  terms: {
    margin: theme.spacing(15),
  },
  messageError: {
    margin: "0",
    color: "red",
  },
}));

const RegisterForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors, isDirty, isValid },
  } = useForm({ mode: "onChange" });

  const [error, setError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowRetypePassword = () =>
    setShowRetypePassword(!showRetypePassword);
  const handleMouseDownRetypePassword = () =>
    setShowRetypePassword(!showRetypePassword);

  const onSubmit = async (data) => {
    try {
      const isValidPassword = validatePassword(
        data.password,
        data.retypePassword
      );
      if (!isValidPassword) throw new Error("passwords not matched");

      const { retypePassword, ...userData } = data;

      const response = await axios.post(REGISTER_USER_API, {
        data: { ...userData, role: "user" },
      });
      localStorageService.saveUser(response.data);
      history.push("/data-table");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const validatePassword = (password, retypePassword) =>
    password === retypePassword;

  return (
    <div className={classes.bodyBorder}>
      <AppBar position="fixed" style={{ boxShadow: "none" }}>
        <Toolbar variant="dense" className={classes.navbar}>
          <Typography variant="h6" color="inherit" component="div">
            <img
              height="50px"
              alt="LS-Technology"
              src="https://scontent.ftlv6-1.fna.fbcdn.net/v/t1.6435-9/67440699_447990479132665_1473312299518263296_n.png?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=tIyTSALWSRUAX-_gdL8&_nc_ht=scontent.ftlv6-1.fna&oh=6f4c9d34b7b322faa31693cb4ede52a6&oe=61818903"
            />
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div>
          {error && (
            <Alert
              style={{ marginTop: "20%" }}
              severity="error"
              onClose={() => setError(false)}
            >
              You have entered invalid data, please try again.
            </Alert>
          )}
        </div>
        <Typography className={classes.topic} component="h1" variant="inherit">
          Sign Up
        </Typography>
        <div className={classes.registerDiv}>
          <Avatar src="https://cdn2.iconfinder.com/data/icons/unilite-shift-human-vol-2/60/011_086_avatar_friend_add_like-512.png" />
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <div className={classes.divMargin}>
              <Typography variant="h6" gutterBottom component="div">
                Personal Details
              </Typography>
              <TextField
                variant="standard"
                margin="normal"
                fullWidth
                id="firstName"
                type="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                {...register("firstName", {
                  required: "This field is required.",
                })}
              ></TextField>
              {formErrors.firstName && (
                <span className={classes.messageError}>
                  {formErrors.firstName.message}
                </span>
              )}
              <TextField
                variant="standard"
                margin="normal"
                fullWidth
                id="lastName"
                type="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                {...register("lastName", {
                  required: "This field is required.",
                })}
              ></TextField>
              {formErrors.lastName && (
                <span className={classes.messageError}>
                  {formErrors.lastName.message}
                </span>
              )}
              <TextField
                variant="standard"
                margin="normal"
                fullWidth
                id="email"
                type="email"
                label="Email"
                name="email"
                autoComplete="email"
                {...register("email", { required: "This field is required." })}
              ></TextField>
              {formErrors.email && (
                <span className={classes.messageError}>
                  {formErrors.email.message}
                </span>
              )}
              <Typography
                className={classes.passwordTypo}
                variant="h6"
                gutterBottom
                component="div"
              >
                Password
              </Typography>
              <TextField
                variant="standard"
                margin="normal"
                fullWidth
                id="password"
                type="password"
                label="Password"
                name="password"
                autoComplete="password"
                {...register("password", {
                  required: "This field is required.",
                })}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              {formErrors.password && (
                <span className={classes.messageError}>
                  {formErrors.password.message}
                </span>
              )}
              <TextField
                variant="standard"
                margin="normal"
                fullWidth
                id="retypePassword"
                type="password"
                label="Retype Password"
                name="retypePassword"
                helperText="The passwords should be the same"
                {...register("retypePassword", {
                  required: "This field is required.",
                })}
                type={showRetypePassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowRetypePassword}
                        onMouseDown={handleMouseDownRetypePassword}
                      >
                        {showRetypePassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              {formErrors.retypePassword && (
                <p className={classes.messageError}>
                  {formErrors.retypePassword.message}
                </p>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                style={{ textTransform: "none" }}
                disabled={!isDirty || !isValid}
              >
                Sign Up
              </Button>
            </div>
          </form>
          <Grid container className={classes.signInLink}>
            <Grid item>
              {"Have an account? "}
              <Link to="/" style={{ textDecoration: "none" }}>
                {"Sign In"}
              </Link>
            </Grid>
          </Grid>

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
      </Container>
    </div>
  );
};

export default RegisterForm;
