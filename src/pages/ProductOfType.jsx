import React, { useEffect } from "react";
import { message as msg} from "antd";
import "./style.css";
import Product from "../Components/user/Product";
import { getAllProducts } from "../actions/product";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ProductOfType({ prop1 }) {
  //Lấy id từ URL
  const { categoryId } = useParams();

  

  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => {
        //msg.success("Get all product successful");
        //msg.success(message);
      })
      .catch(() => {
        msg.error("Get all product failed");
      });
  }, [dispatch]);
  let data = {};

  if (categoryId && categoryId.includes("brand")) {
    data =
      products !== null
        ? products
            .filter((item) => item.brandId === categoryId.slice(6))
            .slice(0, 5)
        : "";
    
  } else if (categoryId && categoryId.includes("sale")) {
    data =
      products !== null
        ? products.filter(
            (product) => product.sales?.salesId === categoryId.slice(5)
          )
        : null;
    } else if (categoryId.includes("new")) {
      data = products!== null ? products.filter((item)=>item.productNew):null
  } else {
   
  }
  return (
    <div>
      <Product data={data} />
    </div>
  );
}
export default ProductOfType; //React.memo();
