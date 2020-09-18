import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";

import "./post.scss";

import ImageUpload from "../imageUpload/imageUpload";

function Post({ username, caption, imageUrl, avatarUrl, user }) {
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
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        "Login to upload"
      )}
    </div>
  );
}

export default Post;
