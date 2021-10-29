import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  messageError: {
    margin: "0",
    color: "red",
  },
}));

const Role = (props) => {
  const [role, setRole] = useState("");
  const roles = ["HR", "Devops", "Software Engineer", "QA"];

  const classes = useStyles();

  const handleSelectChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-standard-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          defaultValue={role}
          onChange={handleSelectChange}
          label="Role"
          {...props.register("role", {
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
      <div>
        {props.formErrors.role && (
          <span className={classes.messageError}>
            {props.formErrors.role.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Role;
