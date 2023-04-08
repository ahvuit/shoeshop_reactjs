import React, { useEffect } from "react";
import { Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";

import SlideShowSale from "../../Components/User/SlideShowSale";
import ProductList from "../../Components/User/Product/ProductList";
import { getAllProducts } from "../../actions/product";
import Brand from "../../Components/User/Brand/BrandList";
import "../style.css";

const Home = () => {
  const { products } = useSelector((state) => state.product);
  const { brand } = useSelector((state) => state.brand);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => {
        //msg.success("Get all product successful");
      })
      .catch(() => {
        //msg.error("Get all product failed");
      });
  }, [dispatch]);

  const newProduct =
    products !== null
      ? products.filter((item) => item.productNew && item.active).slice(0, 5)
      : "";
  const recommendProduct =
    products !== null
      ? products
          .filter((item) => item.price > 2000000 && item.active)
          .slice(0, 5)
      : "";
  const data =
    products !== null
      ? products
          .filter((item) => item.sales !== null && item.active)
          .slice(0, 5)
      : "";

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
        <ProductList data={recommendProduct} />
        {/* <Product data={recommendProduct} /> */}
        <Divider
          style={{
            color: "var(--primary-color)",
            borderColor: "var(--primary-color)",
          }}
        >
          Sản phẩm mới
        </Divider>
        <ProductList data={newProduct} />
        <Divider
          style={{
            color: "var(--primary-color)",
            borderColor: "var(--primary-color)",
          }}
        >
          Sản phẩm khuyến mãi
        </Divider>
        <ProductList data={data} />
        {/* <Product data={data} /> */}
      </header>
    </div>
  );
};
export default Home;
