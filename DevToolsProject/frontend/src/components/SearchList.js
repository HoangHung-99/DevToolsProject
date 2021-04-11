import React, { useState } from "react";
//import { Spinner } from 'reactstrap'

import Header from "./layout/Header";
import SearchCardList from "../components/layout/SearchCardList";

import "../Styles/scss/SearchList.scss";

const SearchList = () => {
  const [result] = useState(true);

  return (
    <div>
      {result ? (
        <div className="searchList--found">
          <Header />
          <div className="container" style={{ marginTop: "40px" }}>
            <SearchCardList/>
          </div>
        </div>
      ) : (
        <div className="searchList--notfound">
          <Header />
          <div className="notfound-alert">
            <h1>Không tìm thấy kết quả nào! :((</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchList;
