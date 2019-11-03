import React from "react";
import { PAGE_TITLE } from "../../constants";
import "./styles/index.scss";

const Header = () => (
  <header className="navbar-fixed-top">
    <div className="nav-container">
      <header>{PAGE_TITLE}</header>
    </div>
  </header>
);
export default Header;
