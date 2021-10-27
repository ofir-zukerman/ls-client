import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import axios from "axios";

import {
  DATATABLE_EMPLOYEE_API,
  ADD_NEW_EMPOLOYEE_API,
  DELETE_EMPLOYEE_API,
} from "../../consts";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import localStorageService from "../../services/localStorage.service";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@mui/material/IconButton";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuDialogActions-root": {
    padding: theme.spacing(5),
  },
}));

const useStyles = makeStyles((theme) => ({
  popupTitle: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
  },
  messageError: {
    margin: "0",
    color: "red",
  },
  divButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: "5%",
  },
}));

/*
modalstate
modalsetstate
submit
employee employee == null add 
*/

const Popup = (props) => {
  const [role, setRole] = useState("");
  const roles = ["HR", "Devops", "Software Engineer", "QA"];
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors: formErrors, isDirty, isValid },
  } = useForm({ mode: "onChange" });

  const handleSelectChange = (event) => {
    setRole(event.target.value);
  };

  if (props.employee) {
    console.log(props);
    // setValue("firstName", props.employee.firstName);
    // setValue("lastName", props.employee.lastName);
    setValue("startDate", props.employee.startDate);

    setValue("id", props.employee.id);
    setValue("firstName", props.employee.firstName);
    setValue("lastName", props.employee.lastName);
    setValue("address", props.employee.address);
    setValue("phone", props.employee.phone);
    setValue("role", props.employee.role);
  } else {
    setValue("startDate", null);
    setValue("id", null);
  }

  useEffect(() => {
    if (!props.employee) {
      reset();
    }
  }, [props.onPopupClose]);

  const classes = useStyles();
  console.log(props);
  return (
    <div>
      <BootstrapDialog
        onClose={() => props.onPopupClose()}
        aria-labelledby="customized-dialog-title"
        open={props.popupState}
      >
        <DialogContent dividers>
          <Container maxWidth="sm">
            <form onSubmit={handleSubmit(props.onSubmit)} noValidate>
              <Container maxWidth="sm">
                <div className={classes.popupTitle}>
                  <Typography variant="h6" gutterBottom component="div">
                    {props.employee ? "Edit Employee" : "Add Employee"}
                  </Typography>
                  <IconButton>
                    <CloseIcon onClick={() => props.onPopupClose()} />
                  </IconButton>
                </div>

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
                <input type="hidden" {...register("id")} />
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
                  id="phone"
                  type="number"
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                  {...register("phone", {
                    required: "This field is required.",
                  })}
                ></TextField>
                {formErrors.phone && (
                  <span className={classes.messageError}>
                    {formErrors.phone.message}
                  </span>
                )}
                <TextField
                  variant="standard"
                  margin="normal"
                  fullWidth
                  id="address"
                  type="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  {...register("address", {
                    required: "This field is required.",
                  })}
                ></TextField>
                {formErrors.address && (
                  <span className={classes.messageError}>
                    {formErrors.address.message}
                  </span>
                )}
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-standard-label">
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    defaultValue={role}
                    onChange={handleSelectChange}
                    label="Role"
                    {...register("role", {
                      required: "This field is required.",
                    })}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {roles.map((roleSelect) => (
                      <MenuItem value={roleSelect}>{roleSelect}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formErrors.role && (
                  <span className={classes.messageError}>
                    {formErrors.role.message}
                  </span>
                )}
                <div className={classes.divButton}>
                  <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ textTransform: "none" }}
                    disabled={!isDirty || !isValid}
                  >
                    {props.employee ? "Edit" : "Add"}
                  </Button>
                </div>
              </Container>
            </form>
          </Container>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default Popup;
