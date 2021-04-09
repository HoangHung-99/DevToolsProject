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
        <div className="col-md-3" key={book.id_book}>
          <div className="card" style={{ width: "180px", height: "270px", marginTop: "10px" }}>
            <img
              alt="books-img"
              src={book.image}
              width={180}
              height={150}
              className="card-img-top"
            />
            <Link to="#" className="card-link">
              <div className="card-body">
                <h5 className="card-title">
                  <strong>{book.title}</strong>
                </h5>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <p className="card-text">{book.authors}</p>
                  <p className="card-text">{book.price}</p>
                  <Link>
                    <FaIcons.FaPlusCircle />
                  </Link>
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
