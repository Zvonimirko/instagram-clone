import React, { useState, useEffect } from "react";

import Header from "./components/header/header";
import Post from "./components/post/post";

import "./App.scss";

function App() {
  const [posts, setPosts] = useState([
    {
      username: "Zvonimir",
      caption: "Making an Instagram Clone!!!",
      avatarUrl:
        "https://images.freeimages.com/images/large-previews/bec/snow-person-1186316.jpg",
      imageUrl:
        "https://cdn-media-1.freecodecamp.org/images/1*y6C4nSvy2Woe0m7bWEn4BA.png",
    },
    {
      username: "Deer",
      caption: "Imma impale your ass biatch!!!",
      avatarUrl:
        "https://images.freeimages.com/images/large-previews/08e/up-close-personal-2-1359478.jpg",
      imageUrl:
        "https://images.freeimages.com/images/large-previews/568/horns-1175375.jpg",
    },
    {
      username: "Charlotte",
      caption: "I love butterflys!!!",
      avatarUrl:
        "https://images.freeimages.com/images/large-previews/214/charlotte-1529045.jpg",
      imageUrl:
        "https://images.freeimages.com/images/large-previews/78e/butterfly-1173173.jpg",
    },
  ]);

  useEffect = (() => {}, []);

  return (
    <div className="app">
      <Header />
      <h1>Lets make an instagram clone in React.js!!!</h1>
      {posts.map((post) => (
        <Post key={post.username} {...post} />
      ))}
    </div>
  );
}

export default App;
