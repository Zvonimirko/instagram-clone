import { Button } from "@material-ui/core";
import React from "react";
import "./header.scss";

function Header({ setOpen, setOpenSignIn, user }) {
  return (
    <div className="app__header">
      <img
        className="app__header__image"
        alt="insta-logo"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
      />
      <div>
        {user ? "" : <Button onClick={() => setOpen(true)}>SignUp</Button>}

        <Button onClick={() => setOpenSignIn(true)}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
}

export default Header;
