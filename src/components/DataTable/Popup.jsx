import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import FirstName from "../TextFields/FirstName";
import LastName from "../TextFields/LastName";
import Phone from "../TextFields/Phone";
import Address from "../TextFields/Address";
import Role from "../TextFields/Role";

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
  divButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: "5%",
  },
}));

const Popup = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors: formErrors, isDirty, isValid },
  } = useForm({ mode: "onChange" });

  if (props.employee) {
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
  }, [props.popupState]);

  const handleClosePopup = () => {
    props.setSelectedEmployee(null);
    props.setOpen(false);
    reset();
  };

  const classes = useStyles();

  return (
    <div>
      <BootstrapDialog
        onClose={() => handleClosePopup()}
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
                    <CloseIcon onClick={() => handleClosePopup()} />
                  </IconButton>
                </div>

                <input type="hidden" {...register("id")} />

                <FirstName register={register} formErrors={formErrors} />
                <LastName register={register} formErrors={formErrors} />
                <Phone register={register} formErrors={formErrors} />
                <Address register={register} formErrors={formErrors} />
                <Role register={register} formErrors={formErrors} />

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
