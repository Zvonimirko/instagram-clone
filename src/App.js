import React, { useState, useEffect } from "react";

import Header from "./components/header/header";
import Post from "./components/post/post";
import { db } from "./firebase";
import ModalPop from "./components/modal/modalPop";
import ImageUpload from "./components/imageUpload/imageUpload";

import "./App.scss";

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="app">
      <Header setOpen={setOpen} setOpenSignIn={setOpenSignIn} user={user} />
      <ModalPop
        open={open}
        setOpen={setOpen}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        openSignIn={openSignIn}
        setOpenSignIn={setOpenSignIn}
        user={user}
        setUser={setUser}
      />
      <h1>Lets make an instagram clone in React.js!!!</h1>
      {posts.map(({ id, post }) => (
        <Post key={id} {...post} user={user} />
      ))}
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        "Login to upload"
      )}
    </div>
  );
}

export default App;
