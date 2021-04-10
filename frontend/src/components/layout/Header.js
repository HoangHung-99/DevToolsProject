import React, { useState } from "react";
import "firebase/firestore";
import "firebase/auth";
// import axios from "axios";
// import * as Yup from "yup";

// import BookService from "../../services/books.services";
import AuthService from "../../services/auth.services";

import { HeaderMenus } from "./HeaderMenus";
import { ProfileData } from "./profileBarData";
import { Link } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";
import UserAvatar from "react-user-avatar";

import fbConfig from "../../config/firebaseConfig";

import * as FaIcons from "react-icons/fa";

import "../../Styles/scss/layout/Header.scss";

// const auth = fbConfig.auth();
// const firestore = fbConfig.firestore();

const Header = (props) => {
  //const [query, setQuery] = useState("");

  // const [cart, setCart] = useState(false);
  // const [clicked, setClicked] = useState(false);
  // const [user] = useAuthState(auth);
  const [profileBar, setProfileBar] = useState(false);
  const [getCurrentUser] = useState(AuthService.getCurrentUser());

  // const showCartList = () => setCart(!cart);
  const showprofileBar = () => setProfileBar(!profileBar);
  const logOut = () => {
    AuthService.logout();
  };

  //const bookData = result;

  console.log(profileBar);
  return (
    <div>
      <div className="header">
        <div className="container wrapper">
          <div className="left-side">
            <div className="logo">
              <Link to="/">
                <span>5M</span>
                <br />
                Books
              </Link>
            </div>

            <div className="header-menus">
              <ul>
                {HeaderMenus.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to="#">{item.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          

          <div className="right-side">
            <div className="signin-btn">
              {/* {user ? (
                <button onClick={() => auth.signOut()} className="btn btn-dark font-weight-bold">
                  {AuthService.getCurrentUser().username}
                </button>
              ) : (
                <Link to="/login" className="btn btn-dark font-weight-bold">
                  Đăng nhập
                </Link>
              )} */}

              {getCurrentUser ? (
                <div>
                  <Link
                    to="#"
                    className="font-weight-bold"
                    onClick={showprofileBar}
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    <UserAvatar
                      color="white"
                      size="48"
                      name={getCurrentUser.username}
                    />
                  </Link>
                  <ul
                    className={
                      profileBar ? "profileList" : "profileList--close"
                    }
                  >
                    {profileBar &&
                      ProfileData.map((item, index) => {
                        return (
                          <li>
                            <Link className="profileLink" to="#">
                              {item.title}
                            </Link>
                          </li>
                        );
                      })}

                    {profileBar ? (
                      <li onClick={logOut}>
                        <a
                          href="/"
                          //className="btn btn-dark font-weight-bold"
                          onClick={logOut}
                        >
                          Đăng xuất
                        </a>
                      </li>
                    ) : null}
                    {/* <li onClick={logOut}>Đăng xuất</li> */}
                  </ul>
                  {/* <a
                    href="/"
                    className="btn btn-dark font-weight-bold"
                    onClick={logOut}
                  >
                    Đăng xuất
                  </a> */}
                </div>
              ) : (
                <div>
                  <Link to={"/login"} className="btn btn-dark font-weight-bold">
                    Đăng nhập
                  </Link>
                </div>
              )}
            </div>

            <div className="notify-bell">
              <Link to="#" className="btn">
                <FaIcons.FaCartPlus />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
