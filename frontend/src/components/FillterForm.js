import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

import * as FaIcons from "react-icons/fa";

const FillterForm = (props) => {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef(null);

  const handleFillerForm = (e) => {
    setSearchTerm(e.target.values);

    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: e.target.value,
      };
      onSubmit(formValues);
    }, 300);
  };

  return (
    <div className="input-group search-bar" style={{ paddingRight: "5px" }}>
      <input
        type="text"
        className="form-control"
        placeholder="Tìm kiếm..."
        name="query"
        value={searchTerm}
        onChange={handleFillerForm}
      />
      {/* <div className="input-group-append">
        <button className="btn btn-dark">
          <FaIcons.FaSearch />
        </button>
      </div> */}
    </div>
  );
};

FillterForm.propTypes = {
  onSubmit: PropTypes.func,
};

FillterForm.defaultProps = {
  onSubmit: null,
};

export default FillterForm;
