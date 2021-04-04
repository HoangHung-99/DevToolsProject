import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import firebase from "firebase/app";
import BookService from "../services/books.services";

import CarouselSlider from "../components/CarouselSlider";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
//import CardList from "../components/layout/CardList";

import "../Styles/scss/HomePage.scss";

import { CarouselData } from "../components/CarouselData";
import { SidebarData } from "../components/layout/SidebarData";
import { Link, Redirect } from "react-router-dom";

import * as FaIcons from "react-icons/fa";
import CardBook from "../components/layout/CardBook";
//import axios from "axios";

function App() {
  //const [data, setData] = useState([]);
  //const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [isRedirect, setIsRedirect] = useState(false);

  useEffect(() => {
    const unregisterAuthObserved = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (!user) {
          return;
        }
      });

    return () => unregisterAuthObserved();
  }, []);

  useEffect(() => {
    async function fetchBooks() {
      try {
        // const requestUrl = "http://localhost:5000/api/book/get";
        const requestUrl = "http://js-post-api.herokuapp.com/api/posts";
        const res = await fetch(requestUrl);
        const resJson = await res.json();
        console.log({ resJson });

        const { data } = resJson;
        setResult(data);
        console.log(result);
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }
    fetchBooks();
  }, []);

  

  const formik = useFormik({
    initialValues: {
      query: "",
    },

    onSubmit: () => {
      //setLoading(true);
      BookService.search(formik.values.query)
        .then((res) => {
          setIsRedirect(true);
          setResult(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div>
      <Header />
      <div className="container">
        <div className="carouselSlider">
          <CarouselSlider slide={CarouselData} />
        </div>
        <div className="row home-content">
          <div className="col-md-3 side-bar">
            <h5 className="sidebar-title text-center">
              <strong>Danh mục sách</strong>
            </h5>
            <ul className="typeList">
              {SidebarData.map((item, index) => {
                return (
                  <li>
                    <Link to="#">{item.typeName}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-md-9">
            <div
              className="input-group search-bar"
              style={{ paddingRight: "5px" }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm..."
                name="query"
                value={formik.values.query}
                onChange={formik.handleChange}
              />

              {isRedirect && (
                <Redirect
                  to={{
                    pathname: `/searchlist/${formik.values.query}`,
                    state: { result },
                  }}
                />
              )}
              <form onClick={formik.handleSubmit}>
                <div className="input-group-append">
                  <button
                    type="submit"
                    //href="/searchlist"

                    className="btn btn-dark"
                  >
                    <FaIcons.FaSearch />
                  </button>
                </div>
              </form>
            </div>
            <div className="card-list-title">
              <h4>
                <strong>Bán chạy nhất</strong>
              </h4>
              <Link to="#">Xem thêm</Link>
            </div>
            {/* {data && data.length > 0 && !loading ? (
              <div>Loading...</div>
            ) : (
              <div>
                <CardList books={data}/>
              </div>
            )} */}

            <div className="card-list-title" style={{ marginTop: "20px" }}>
              <h4>
                <strong>Sách nổi bật</strong>
              </h4>
              <Link to="#">Xem thêm</Link>
            </div>
            <CardBook books={result} />

            <div className="card-list-title" style={{ marginTop: "20px" }}>
              <h4>
                <strong>Sách khuyến mãi</strong>
              </h4>
              <Link to="#">Xem thêm</Link>
            </div>
            <CardBook books={result}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
