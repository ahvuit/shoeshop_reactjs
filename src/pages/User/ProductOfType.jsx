import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "../style.css";

import ProductPagination from "../../Components/User/Product/ProductPagination";
import ProductList from "../../Components/User/Product/ProductList";
import { getAllProducts } from "../../actions/product";

function ProductOfType({ prop1 }) {
  const { categoryId } = useParams();
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => {})
      .catch(() => {
        //msg.error("Get all product failed");
      });
  }, [dispatch]);
  let data1 = {};

  if (categoryId && categoryId.includes("brand")) {
    data1 =
      products !== null
        ? products
            .filter((item) => item.brandId === categoryId.slice(6))
            .sort((a, b) => b.active - a.active)
        : "";
  } else if (categoryId && categoryId.includes("sale")) {
    data1 =
      products !== null
        ? products
            .filter((product) => product.sales?.salesId === categoryId.slice(5))
            .sort((a, b) => b.active - a.active)
        : null;
  } else if (categoryId.includes("new")) {
    data1 =
      products !== null
        ? products
            .filter((item) => item.productNew)
            .sort((a, b) => b.active - a.active)
        : null;
  } else if (categoryId.includes("cate")) {
    data1 =
      products !== null
        ? products
            .filter((item) => item.categoryId === categoryId.slice(5))
            .sort((a, b) => b.active - a.active)
        : null;
  } else {
  }
  return (
    <div>
      <ProductList data={data} />
      <ProductPagination
        data1={data1}
        setData={setData}
        categoryId={categoryId}
      />
    </div>
  );
}
export default ProductOfType;
