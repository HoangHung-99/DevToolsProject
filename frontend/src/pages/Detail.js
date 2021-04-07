import React, { useState } from "react";
import Header from "../components/layout/Header";

import CarouselSlider from "../components/CarouselSlider";
import { CarouselData } from "../components/CarouselData";

import "../Styles/scss/Detail.scss";
import { Link } from "react-router-dom";

const Detail = () => {
  const [readMore, setReadMore] = useState(false);

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
          <div className="col-md-7">
            <div className="title">
              <h2>
                <strong>Harry Potter</strong>
              </h2>
              <div className="title-detail">
                <p>
                  <strong>J.K Rowling</strong>
                </p>
                -<p>200.000vnd</p>
              </div>
            </div>
            <h5>
              <strong>Giới thiệu</strong>
            </h5>
            <div
              style={
                !readMore
                  ? {
                      overflow: "hidden",
                      width: "100%",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                    }
                  : null
              }
            >
              Nhưng làm thế nào để mô tả chu kỳ "Harry Potter"? Thể loại của tác
              phẩm không khó xác định như vẻ ngoài của nó. Nhưng trước tiên, một
              số thông tin về chính bộ phim. Tổng cộng, chu trình bao gồm 7 cuốn
              sách của câu chuyện chính, cộng với một phiên bản khác của kịch
              bản Hồi giáo Con bị nguyền rủa, mà độc giả Nga sẽ chỉ có thể đọc
              vào tháng 12 năm 2016. Cuốn tiểu thuyết đầu tiên, Harry Potter và
              Hòn đá Phù thủy, xuất hiện trên các kệ hàng vào năm 1997. Đồng
              thời, các nhà xuất bản trong một thời gian dài từ chối xuất bản.
              Và chỉ những bài đọc mở được sắp xếp bởi nhà văn đã giúp thuyết
              phục họ rằng cuốn sách rất phổ biến với trẻ em.
              <Link
                onClick={handleReadMore}
                className="font-weight-bold"
                style={{ color: " rgb(247, 153, 12)", hover: "#000" }}
              >
                {readMore ? "Thu gọn" : "Xem thêm"}
              </Link>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
