import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import firebase from "firebase/app";
import BookServices from "../services/books.services";

import CarouselSlider from "../components/CarouselSlider";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
//import CardList from "../components/layout/CardList";

import "../Styles/scss/HomePage.scss";

import { CarouselData } from "../components/CarouselData";
import { SidebarData } from "../components/layout/SidebarData";
import { Link } from "react-router-dom";

import CardBook from "../components/layout/CardBook";
import FillterForm from "../components/FillterForm";
import booksServices from "../services/books.services";
//import axios from "axios";

function App() {
  const [booklist, setBooklist] = useState([]);
  const [filter, setFilter] = useState(
    {
      _limit: 10,
      _page: 1,
      title: "",
      authors: "",
      description: "",
    }
    // BookServices.findBooks()
  );
  const [query, setQuery] = useState("");

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
        const requestUrl = "http://localhost:5000/api/book/get";
        // const requestUrl = "http://js-post-api.herokuapp.com/api/posts?postId=1";
        const res = await fetch(requestUrl);
        const resJson = await res.json();
        //console.log({ resJson });

        setBooklist(resJson);
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }

    fetchBooks();
  }, []);

  //console.log(booklist);

  // const formik = useFormik({
  //   initialValues: {
  //     title: "",
  //     authors: "",
  //     description: "",
  //   },

  //   handleFillerChange: (newFilters) => {
  //     console.log("New filters: ", newFilters);
  //     // setFilter({
  //     //   ...filter,
  //     //   title: newFilters.searchTerm,
  //     //   authors: newFilters.searchTerm,
  //     //   description: newFilters.searchTerm
  //     // })

  //     BookServices.findBooks({
  //       ...filter,
  //       title: newFilters.searchTerm,
  //       description: newFilters.searchTerm,
  //       authors: newFilters.searchTerm,
  //     }).then(
  //       (res) => {
  //         setFilter(filter);
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  //     console.log(filter);
  //     console.log(BookServices.findBooks());
  //   },
  // });

  const handleFillerChange = (newFilters) => {
    console.log("New filters: ", newFilters);

    BookServices.findBooks({
      ...filter,
      params: newFilters.searchTerm,
    });
    console.log(filter);
    console.log(BookServices.findBooks());
  };

  const search = (rows) => {
    return (rows.filter((row) => row.title.toLowerCase().indexOf(query) > -1) &&
    rows.filter((row) => row.authors.toLowerCase().indexOf(query) > -1))
  };

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
            {/* <FillterForm onSubmit={handleFillerChange} /> */}
            <div
              className="input-group search-bar"
              style={{ paddingRight: "5px" }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm..."
                name="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {/* <div className="input-group-append">
        <button className="btn btn-dark">
          <FaIcons.FaSearch />
        </button>
      </div> */}
            </div>
            <div className="card-list-title">
              <h4>
                <strong>Bán chạy nhất</strong>
              </h4>
              <Link to="#">Xem thêm</Link>
            </div>
            <CardBook books={search(booklist)} />
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
            <CardBook books={booklist} />

            <div className="card-list-title" style={{ marginTop: "20px" }}>
              <h4>
                <strong>Sách khuyến mãi</strong>
              </h4>
              <Link to="#">Xem thêm</Link>
            </div>
            <CardBook books={booklist} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
