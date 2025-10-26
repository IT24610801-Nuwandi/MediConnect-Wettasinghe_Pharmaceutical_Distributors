import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <p>&copy; {new Date().getFullYear()} Wettasinghe Pharmaceutical Distributors (Pvt) Ltd.  All rights reserved.</p>
    </footer>
  );
};

export default Footer;
