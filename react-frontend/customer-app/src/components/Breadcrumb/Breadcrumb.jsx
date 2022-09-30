import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = (props) => {
  return (
    <>
      <div className="mt-1 mb-2">
        <Link to="/">Trang chủ</Link> /{" "}
        <span className="font-weight-bold">Đồ {props.name}</span>
      </div>
    </>
  );
};

export default Breadcrumb;
