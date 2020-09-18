import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import { auth } from "../../firebase";

import "./modalPop.scss";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ModalPop({
  open,
  setOpen,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  openSignIn,
  setOpenSignIn,
  user,
  setUser,
}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
        //user logged in
        if (authUser.displayName) {
          //dont update username
          return user;
        } else {
          // if we just created someone
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        // user logged out
        setUser(null);
      }
    });

    return () => {
      //perform some cleanup actions
      unsubscribe();
    };
  }, [user, username, setUser]);

  const clearForm = () => {
    setOpen(false);
    setOpenSignIn(false);
    setUsername("");
    setPassword("");
    setEmail("");
  };

  const signUp = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log(authUser.user);
        authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };

  const signIn = async (e) => {
    e.preventDefault();
    await auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => console.log(error.message));
    clearForm();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="modalPop__signup">
            <center>
              <img
                className="app__header-image"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="logo"
              />
            </center>
            <Input
              type="text"
              name="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="email"
              placeholder="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {user ? (
              <Button onClick={() => auth.signOut()}>Logout</Button>
            ) : (
              <div>
                <Button onClick={signUp}>SignUp</Button>
              </div>
            )}
          </form>
        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="modalPop__signup">
            <center>
              <img
                className="app__header-image"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="logo"
              />
            </center>
            <Input
              type="text"
              name="username"
              placeholder="username"
              value={username}
              onChange={(e) => {
                console.log(username);
                return setUsername(e.target.value);
              }}
            />
            <Input
              type="email"
              placeholder="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {user ? (
              <Button onClick={() => auth.signOut()}>Logout</Button>
            ) : (
              <div>
                <Button onClick={signIn}>SignIn</Button>
              </div>
            )}
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default ModalPop;
