import { Button } from "@material-ui/core";
import React from "react";
import { db } from "../../firebase";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: "32px",
  },
});

function DeleteComment({ postId, msgId }) {
  const classes = useStyles();

  const deleteCommentButton = (e) => {
    e.preventDefault();
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(msgId)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <Button className={classes.root} onClick={deleteCommentButton}>
      x
    </Button>
  );
}

export default DeleteComment;
