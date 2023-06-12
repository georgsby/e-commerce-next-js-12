import React from 'react';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'

function Footer(props) {
  return (
    <div className="footer-container">
      <p>2023 Georgsby All rights reserved</p>
      <p className="icons">
        <AiFillInstagram/>
        <AiOutlineTwitter/>
      </p>
    </div>
  );
}

export default Footer;