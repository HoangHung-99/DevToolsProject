import React, { useState } from "react";
import ReactReadMoreReadLess from "react-read-more-read-less";

import Header from "../components/layout/Header";
import CarouselSlider from "../components/CarouselSlider";
import { CarouselData } from "../components/CarouselData";
import CardBook from "../components/layout/CardBook";
import Footer from "../components/layout/Footer";

import "../Styles/scss/Detail.scss";

import { Link } from "react-router-dom";
import { colors } from "@material-ui/core";
import * as FaIcons from "react-icons/fa";

const Detail = () => {
  const [readMore, setReadMore] = useState(false);
  const [booklist, setBooklist] = useState([]);

  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="carouselSlider">
          <CarouselSlider slide={CarouselData} />
        </div>
        <div className="row" style={{ marginTop: "40px" }}>
          <div className="col-md-8">
            <div className="title">
              <h2>
                <strong>Harry Potter</strong>
              </h2>
              <div className="title-detail">
                <p>
                  <strong>J.K Rowling</strong>
                </p>
              </div>
            </div>
            <h5>
              <strong>Giới thiệu</strong>
            </h5>
            <ReactReadMoreReadLess
              charLimit={200}
              readMoreText={"Xem thêm ▼"}
              readLessText={"Thu gọn ▲"}
              readMoreStyle={{ fontWeight: "bold", cursor: "pointer" }}
              readLessStyle={{ fontWeight: "bold", cursor: "pointer" }}
            >
              {
                'Nhưng làm thế nào để mô tả chu kỳ "Harry Potter"? Thể loại của tác phẩm không khó xác định như vẻ ngoài của nó. Nhưng trước tiên, một số thông tin về chính bộ phim. Tổng cộng, chu trình bao gồm 7 cuốn sách của câu chuyện chính, cộng với một phiên bản khác của kịch bản Hồi giáo Con bị nguyền rủa, mà độc giả Nga sẽ chỉ có thể đọc vào tháng 12 năm 2016. Cuốn tiểu thuyết đầu tiên, Harry Potter và Hòn đá Phù thủy, xuất hiện trên các kệ hàng vào năm 1997. Đồng thời, các nhà xuất bản trong một thời gian dài từ chối xuất bản. Và chỉ những bài đọc mở được sắp xếp bởi nhà văn đã giúp thuyết phục họ rằng cuốn sách rất phổ biến với trẻ em.'
              }
            </ReactReadMoreReadLess>
            <div className="card-list-title" style={{ marginTop: "20px" }}>
              <h4>
                <strong>Sách tương tự</strong>
              </h4>
              <Link to="#">Xem thêm</Link>
            </div>
            <CardBook books={booklist} />
          </div>
          <div className="col-md-4">
            <div className="container rightSide">
              <ul>
                <li><ul><Link><FaIcons.FaHeart/> Yêu thích</Link></ul></li>
                <li><Link><FaIcons.FaCartPlus/> Giỏ hàng</Link></li>
              </ul>
              <h3><strong>200.000</strong></h3>
              <div style={{marginTop: "20px"}}>
                <Link className="btn w-100 btn-dark font-weight-bold">Mua ngay</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Detail;
