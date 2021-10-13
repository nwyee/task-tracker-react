import PropTypes from "prop-types";
import Button from "./Button";
import React from "react";
import {useLocation} from "react-router-dom"

const Header = ({ title, onAdd, showAdd }) => {
    const loc = useLocation()
  return (
    <header className="header">
      <h1> {title} </h1>
      {loc.pathname === '/' && (
      <Button
        color={showAdd ? "red" : "steelblue"}
        text={showAdd ? "close" : "add"}
        onClick={onAdd}
      />)}
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};
 
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
