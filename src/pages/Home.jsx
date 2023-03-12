import React, {useEffect} from "react";
import { Divider,message as msg } from "antd";
import "./style.css";
import SlideShowSale from '../components/user/SlideShowSale'
import Product from '../components/user/Product'
import { getAllProducts } from "../actions/product";
import { useDispatch, useSelector } from "react-redux";
import Brand from '../components/user/Brand'

const Home = () => {
  const { products } = useSelector((state) => state.product);
  const {brand} = useSelector((state)=>state.brand)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => {
        msg.success("Get all product successful");
        //msg.success(message);
      })
      .catch(() => {
        msg.error("Get all product failed");
      });
  }, [dispatch]);

 const newProduct = products !==null? products.filter(item =>
    item.rate
  ).slice(0, 5):('')
 const recommendProduct = products !==null? products.filter(item =>
    item.price>200
  ).slice(0, 5):('')
  // console.log( 'gtfryewtfryw', products);
  const data = products !==null? products.slice(0, 5):'';
  console.log('brand: ',brand);
 
  return (
    <div className="container">
      <header className="jumbotron">
        
        <SlideShowSale/>
        <Divider style={{ color: "red", borderColor: "red" }}>
          Brand
        </Divider>
        <Brand data={brand} />
        
        <Divider style={{ color: "red", borderColor: "red" }}>
          Recommend for you
        </Divider>
        <Product data={recommendProduct} />
        <Divider style={{ color: "red", borderColor: "red" }}>
          New Product
        </Divider>
        <Product data={newProduct} />
        <Divider style={{ color: "red", borderColor: "red" }}>
          Sale Product
        </Divider>
        <Product data={data} />

      </header>
    </div>
  );
};
export default Home;
