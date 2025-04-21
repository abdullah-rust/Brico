import React from "react";
import "./fotter.css"; // Custom CSS if needed

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer-text">
        Made with <span className="heart">❤️</span> by <strong>Abdullah</strong>{" "}
        &nbsp;|&nbsp; {year}
      </p>
      <p className="footer-extra">Empowering through code & simplicity.</p>
    </footer>
  );
};

export default Footer;
