import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  navbar: {
    boxShadow: "none",
    backgroundColor: "white",
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <div>
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
      ; )
    </div>
  );
};

export default Navbar;
