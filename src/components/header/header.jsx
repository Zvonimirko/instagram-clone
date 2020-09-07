import React from "react";
import "./header.scss";

function Header() {
  return (
    <div className="app__header">
      <img
        className="app__header-image"
        alt="insta-logo"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
      />
    </div>
  );
}

export default Header;
