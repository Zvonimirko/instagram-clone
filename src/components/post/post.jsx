import React from "react";
import "./post.scss";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";

function Post({ username, caption, imageUrl, avatarUrl }) {
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
    </div>
  );
}

export default Post;
