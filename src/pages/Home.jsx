import React, { useEffect } from "react";
import { Divider, message as msg } from "antd";
import { useDispatch, useSelector } from "react-redux";

import SlideShowSale from "../Components/user/SlideShowSale";
import Product from "../Components/user/Product";
import { getAllProducts } from "../actions/product";
import Brand from "../Components/user/Brand";
import "./style.css";

const Home = () => {
  const { products } = useSelector((state) => state.product);
  const { brand } = useSelector((state) => state.brand);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => {
        msg.success("Get all product successful");
      })
      .catch(() => {
        msg.error("Get all product failed");
      });
  }, [dispatch]);

  const newProduct =
    products !== null ? products.filter((item) => item.rate).slice(0, 5) : "";
  const recommendProduct =
    products !== null
      ? products.filter((item) => item.price > 200).slice(0, 5)
      : "";
  const data = products !== null ? products.slice(0, 5) : "";

  return (
    <div className="container">
      <header className="jumbotron">
        <SlideShowSale />
        <Divider
          style={{
            color: "var(--primary-color)",
            borderColor: "var(--primary-color)",
          }}
        >
          Hãng giày
        </Divider>
        <Brand data={brand} />

        <Divider
          style={{
            color: "var(--primary-color)",
            borderColor: "var(--primary-color)",
          }}
        >
          Gợi ý cho bạn
        </Divider>
        <Product data={recommendProduct} />
        <Divider
          style={{
            color: "var(--primary-color)",
            borderColor: "var(--primary-color)",
          }}
        >
          Sản phẩm mới
        </Divider>
        <Product data={newProduct} />
        <Divider
          style={{
            color: "var(--primary-color)",
            borderColor: "var(--primary-color)",
          }}
        >
          Sản phẩm khuyến mãi
        </Divider>
        <Product data={data} />
      </header>
    </div>
  );
};
export default Home;
