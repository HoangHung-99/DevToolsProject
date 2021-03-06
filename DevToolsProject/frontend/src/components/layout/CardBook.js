import React from "react";
// import BookService from "../../services/books.services";
// import axios from "axios";
import PropTypes from "prop-types";

// import { CardListData } from "./CardListData";
import { Link } from "react-router-dom";

import * as FaIcons from "react-icons/fa";

const CardBook = (props) => {
  const { books } = props;

  return (
    <div className="row">
      {books.map((book) => (
        <div className="col-md-4" key={book.id_book} style={{ marginTop: "15px" }}>
          <div className="card" style={{ width: "230px", height: "300px" }}>
            <img
              alt="books-img"
              src={book.image}
              width={180}
              height={150}
              className="card-img-top"
            />
            <Link to="#" className="card-link">
              <div className="card-body">
                <h5 className="card-title text-dark text-truncate">
                  <strong>{book.title}</strong>
                </h5>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", gap: "10px" }}>
                    <p className="card-text text-dark">{book.authors}</p>
                    -
                    <p className="card-text text-dark"><strong>{book.price}</strong>vnd</p>
                  </div>
                </div>
                <div
                  className="btn-card"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "15px",
                  }}
                >
                  <button className="btn btn-dark">
                    <FaIcons.FaHeart />
                  </button>
                  <button className="btn btn-dark">
                    <FaIcons.FaCartPlus />
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

CardBook.propTypes = {
  books: PropTypes.array,
};

CardBook.defaultProps = {
  books: [],
};

export default CardBook;
