import React, { useState } from "react";
import firebase from "firebase/app";
import AuthService from "../services/auth.services";

import Header from "../components/layout/Header";
import StyledFireBaseAuth from "react-firebaseui/StyledFirebaseAuth";

import "../Styles/scss/LoginSignup.scss";

import { Link } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom"

const uiConfig = {
  signInFlow: "redirect",
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

const Login = (props) => {

  //const [message, setMessage] = useState("")
  const [failure, setFailure] = useState(false)

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "Tên người dùng không hợp lệ")
        .required("Vui lòng nhập tên người dùng!"),
      password: Yup.string()
        //.min(6, "Sai mật khẩu")
        //.matches("Sai mật khẩu")
        .required("Vui lòng nhập mật khẩu!"),
    }),

    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));

      AuthService.login(formik.values.username, formik.values.password).then(
        (res) => {
          // props.history.push("/");
          history.push("/")
          // window.location.reload();
        },
        (error) => {
          // const resMessage =
          //   (error.response &&
          //     error.response.data &&
          //     error.response.data.message) ||
          //   error.message ||
          //   error.toString();
            setFailure(true)
        }
      );
    },
  });

  return (
    <div>
      <Header />
      <div className="login-form">
        <div className="container">
          <h2 className="font-weight-bold">Đăng nhập</h2>
          <form onSubmit={formik.handleSubmit}>
          {failure ? <Alert severity="error">Đăng nhập không thành công</Alert> : null}
            <div className="input-signin">
              <label>Tên người dùng:</label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={formik.handleChange}
                className="form-control w-100"
              />
              {formik.errors.username && formik.touched.username && (
                <Alert severity="error">{formik.errors.username}</Alert>
              )}
            </div>
            <div className="input-signin">
              <label>Mật khẩu:</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                className="form-control w-100"
              />
              {formik.errors.password && formik.touched.password && (
                <Alert severity="error">{formik.errors.password}</Alert>
              )}
            </div>
            <div className="btn-signIn">
              <button type="submit" className="btn btn-dark btn-position font-weight-bold w-100">
                Đăng nhập
              </button>
            </div>
          </form>
          <Link to="/signup" className="link-position">
            Đăng ký ngay
          </Link>
          <hr />
          <p>Hoặc đăng nhập qua mạng xã hội</p>
          <StyledFireBaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
          <Link to="#" className="link-position">
            Bạn quên mật khẩu?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
