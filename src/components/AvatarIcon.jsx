import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  avatar: {
    display: "flex",
    justifyContent: "center",
  },
}));

const AvatarIcon = () => {
  const classes = useStyles();

  return (
    <div className={classes.avatar}>
      <Avatar src="https://cdn2.iconfinder.com/data/icons/unilite-shift-human-vol-2/60/011_086_avatar_friend_add_like-512.png"></Avatar>
    </div>
  );
};

export default AvatarIcon;
