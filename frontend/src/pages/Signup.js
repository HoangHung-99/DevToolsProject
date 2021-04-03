import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import Header from "../components/layout/Header";

import "../Styles/scss/LoginSignup.scss";

import { Link } from "react-router-dom";
import AuthService from "../services/auth.services";
import { Alert } from '@material-ui/lab';

const Signup = (props) => {

  //const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false)
  const [failure, setFailure] = useState(false)
  
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(2, "Tên người dùng phải chứa tối thiểu 2 kí tự")
        .required("Vui lòng nhập tên người dùng"),
      email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
      password: Yup.string()
        .min(6, "Mật khẩu tối thiểu 6 kí tự")
        .required("Vui lòng nhập mật khẩu!"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Xác thực mật khẩu không hợp lệ")
        .required("Vui lòng xác thực mật khẩu!"),
    }),

    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));

      AuthService.register(
        formik.values.username,
        formik.values.email,
        formik.values.password,
      ).then(
        (response) => {
          //setMessage(response.data.message);
          setSuccessful(true)
          setFailure(false)
          //console.log(response.data.message);
          //props.history.push("/login");
          //window.location.reload();
        },
        (error) => {
          // const resMessage =
          //   (error.response &&
          //     error.response.data &&
          //     error.response.data.message) ||
          //   error.message ||
          //   error.toString();
            setFailure(true)
            setSuccessful(false)
        }
      );
    },
  });

  return (
    <div>
      <Header />
      <div className="login-form">
        <div className="container">
          <h2 className="font-weight-bold">Đăng ký</h2>
          <form onSubmit={formik.handleSubmit}>
            {successful ? <Alert severity="success">Đăng ký thành công</Alert> : null}
            {failure ? <Alert severity="error">Email hoặc tên đăng nhập đã tồn tại</Alert> : null}
            <div className="input-signin">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control w-100"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <Alert severity="error">{formik.errors.email}</Alert>
              )}
            </div>
            <div className="input-signin">
              <label>Tên người dùng:</label>
              <input
                type="text"
                name="username"
                placeholder="Tên người dùng"
                className="form-control w-100"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.errors.username && formik.touched.username && (
                <Alert severity="error">{formik.errors.username}</Alert>
              )}
            </div>
            <div className="input-signin">
              <label>Mật khẩu:</label>
              <input
                type="password"
                className="form-control w-100"
                name="password"
                placeholder="Mật khẩu"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <Alert severity="error">{formik.errors.password}</Alert>
              )}
            </div>
            <div className="input-signin">
              <div className="label-align">
                <label>Nhập lại mật khẩu:</label>
              </div>
              <input
                type="password"
                name="confirm_password"
                placeholder="Nhập lại mật khẩu"
                value={formik.values.confirm_password}
                className="form-control w-100"
                onChange={formik.handleChange}
              />
              {formik.errors.confirm_password &&
                formik.touched.confirm_password && (
                  <Alert severity="error">{formik.errors.confirm_password}</Alert>
                )}
            </div>

            <button
              type="submit"
              className="btn btn-dark btn-position font-weight-bold w-100"
            >
              Đăng ký
            </button>
          </form>
          <Link to="/login" className="link-position">
            Quay lại
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
