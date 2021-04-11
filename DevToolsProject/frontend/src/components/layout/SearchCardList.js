import React from "react";

import { CardListData } from "./CardListData";
import { Link } from "react-router-dom";

import * as FaIcons from "react-icons/fa";

const SearchCardList = ({ books }) => {
  return (
    <div className="row">
      {CardListData.map((item, index) => {
        return (
          <div className="col-md-3">
            <div className="card" style={{ width: "250px" }}>
              <img
                alt="..."
                src={item.image}
                width={180}
                height={170}
                className="card-img-top"
              />
              {/* <Link to="#" className="card-link"> */}
              <div className="card-body">
                <Link to="#" className="card-link">
                  <h5 className="card-title">
                    <strong>{item.title}</strong>
                  </h5>
                </Link>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <h5 className="card-text">{item.price}</h5>
                  <Link>
                    <FaIcons.FaPlusCircle />
                  </Link>
                </div>
              </div>
              {/* </Link> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchCardList;
