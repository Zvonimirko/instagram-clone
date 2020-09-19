import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import firebase from "firebase";

import { db } from "../../firebase";
import DeleteComment from "../deleteComment/deleteComment";

import "./post.scss";

function Post({ username, caption, imageUrl, avatarUrl, postId, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              comment: doc.data(),
            }))
          );
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      id: firebase.firestore.FieldValue.serverTimestamp(),
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Box
          className="post__header__avatar__box"
          border={1}
          borderRadius="100%"
          borderColor="secondary.main"
        >
          <Avatar
            className="post__header__avatar"
            alt={username}
            src={avatarUrl}
          />
        </Box>
        <h3 className="post__header__username">{username}</h3>
      </div>
      <img className="post__image" alt="react-logo" src={imageUrl} />
      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>

      <div className="post__comments">
        {user
          ? comments.map(({ id, comment }) => (
              <p key={id} className="post__comments__comment">
                <span>
                  <strong>{user.displayName}</strong> {comment.text}
                </span>
                <DeleteComment msgId={id} postId={postId} />
              </p>
            ))
          : ""}
      </div>

      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
