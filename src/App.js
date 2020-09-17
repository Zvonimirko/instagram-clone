import React, { useState, useEffect } from "react";

import Header from "./components/header/header";
import Post from "./components/post/post";
import { db } from "./firebase";
import ModalPop from "./components/modal/modalPop";

import "./App.scss";
import { Button } from "@material-ui/core";

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
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
      <Header />
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
      />
      <Button onClick={() => setOpen(true)}>SignIn</Button>
      <Button onClick={() => setOpenSignIn(true)}>LogIn</Button>
      <h1>Lets make an instagram clone in React.js!!!</h1>
      {posts.map(({ id, post }) => (
        <Post key={id} {...post} />
      ))}
    </div>
  );
}

export default App;
