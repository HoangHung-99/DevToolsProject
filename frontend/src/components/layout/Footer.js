import React from "react";

import "../../Styles/scss/layout/Footer.scss";

const Footer = () => {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row footer-top wrapper">
          <div className="col"><strong>Tài khoản</strong></div>
          <div className="col"><strong>Liên hệ</strong></div>
          <div className="col">Nguyễn Hoàng Hưng</div>
        </div>
        <hr />
        <div className="row">
          <p>Nguyễn Hoàng Hưng</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
