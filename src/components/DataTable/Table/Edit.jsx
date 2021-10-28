import React from "react";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function Edit(props) {
  return (
    <TableCell key={props.fieldName} style={{ width: "1%" }}>
      <IconButton>
        <EditOutlinedIcon
          onClick={() => props.handleEditEmployee(props.employee)}
        />
      </IconButton>
    </TableCell>
  );
}

export default Edit;
