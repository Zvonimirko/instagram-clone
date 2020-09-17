import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./imageUpload.scss";

function ImageUpload() {
  const [caption, setCaption] = useState("");

  const handleCaption = (e) => {
    setCaption(e.target.value);
  };

  const handleFile = (e) => {
    console.log(e);
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div>
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
