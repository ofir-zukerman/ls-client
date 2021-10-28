import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const Header = (props) => {
  return (
    <TableHead>
      <TableRow>
        {props.fields.map((field) => (
          <TableCell style={{ color: "gray", fontSize: "80%" }} key={field.id}>
            {field.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default Header;
