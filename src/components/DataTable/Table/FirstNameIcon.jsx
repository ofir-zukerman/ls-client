import React from "react";
import TableCell from "@mui/material/TableCell";
import Avatar from "@material-ui/core/Avatar";

const FirstNameIcon = (props) => {
  return (
    <TableCell key={props.fieldName}>
      <Avatar>{props.employeeFirstName.toUpperCase().slice(0, 1)}</Avatar>
    </TableCell>
  );
};

export default FirstNameIcon;
