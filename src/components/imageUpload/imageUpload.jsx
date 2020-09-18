import { Button } from "@material-ui/core";
import React, { useState } from "react";
import firebase from "firebase";

import "./imageUpload.scss";

import { storage, db } from "../../firebase";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState("");

  const handleCaption = (e) => {
    setCaption(e.target.value);
  };

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleClick = (e) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // ... progress logic
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error.message);
        alert(error.message);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
              avatarUrl: url,
            });

            setProgress(0);
            setImage(null);
            setCaption("");
          });
      }
    );
  };

  return (
    <div>
      <progress value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption..."
        value={caption}
        onChange={handleCaption}
      />
      <input type="file" onChange={handleFile} />
      <Button className="imageUpload__button" onClick={handleClick}>
        Upload
      </Button>
    </div>
  );
}

export default ImageUpload;
