import React, { useState, useEffect } from "react";

import Header from "./components/header/header";
import Post from "./components/post/post";
import { db } from "./firebase";
import ModalPop from "./components/modal/modalPop";
import ImageUpload from "./components/imageUpload/imageUpload";
import InstagramEmbed from "react-instagram-embed";

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

  const renderPost = () => (
    <div className="posts__container__left">
      {posts.map(({ id, post }) => (
        <Post key={id} {...post} user={user} postId={id} />
      ))}
    </div>
  );

  console.log(user);

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
      <div className="posts__container">
        {renderPost()}
        <div className="posts__container__right">
          <InstagramEmbed
            url="https://instagr.am/p/Zw9o4/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <center>Login to upload</center>
      )}
    </div>
  );
}

export default App;
