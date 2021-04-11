import React, { useState } from "react";
import { useFormik } from "formik";
// import * as Yup from "yup";

import Header from "../components/layout/Header";

import "../Styles/scss/LoginSignup.scss";

import { Link } from "react-router-dom";
import BookService from "../services/books.services";
import { Alert } from "@material-ui/lab";

const Signup = (props) => {
  //const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [failure, setFailure] = useState(false);

  const formik = useFormik({
    initialValues: {
      id_book: "",
      title: "",
      authors: "",
      //confirm_password: "",
    },

    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));

      BookService.createBooks(
        formik.values.id_book,
        formik.values.title,
        formik.values.authors
      ).then(
        (response) => {
          //setMessage(response.data.message);
          setSuccessful(true);
          setFailure(false);
        },
        (error) => {
          // const resMessage =
          //   (error.response &&
          //     error.response.data &&
          //     error.response.data.message) ||
          //   error.message ||
          //   error.toString();
          setFailure(true);
          setSuccessful(false);
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
            {successful ? (
              <Alert severity="success">Đăng ký thành công</Alert>
            ) : null}
            {failure ? (
              <Alert severity="error">
                Email hoặc tên đăng nhập đã tồn tại
              </Alert>
            ) : null}
            <div className="input-signin">
              <label>ID:</label>
              <input
                type="number"
                name="id_book"
                placeholder="ID"
                className="form-control w-100"
                value={formik.values.id_book}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <Alert severity="error">{formik.errors.email}</Alert>
              )}
            </div>
            <div className="input-signin">
              <label>Tên sách:</label>
              <input
                type="text"
                name="title"
                placeholder="Tiêu đề"
                className="form-control w-100"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
              {formik.errors.username && formik.touched.username && (
                <Alert severity="error">{formik.errors.username}</Alert>
              )}
            </div>
            <div className="input-signin">
              <label>Tác giả:</label>
              <input
                type="text"
                className="form-control w-100"
                name="authors"
                placeholder="Tác giả"
                value={formik.values.authors}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <Alert severity="error">{formik.errors.password}</Alert>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-dark btn-position font-weight-bold w-100"
            >
              Thêm
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
