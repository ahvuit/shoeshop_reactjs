import React, { useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";

import { getAllOrders } from "../../actions/order";
import { getAllProducts } from "../../actions/product";
const QuantityChart = () => {
  const { orders1: orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders())
      .then(() => {})
      .catch(() => {});
    dispatch(getAllProducts())
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);

  const o = orders
    ?.filter((a) => a.orderModel.statusId === "6405f221abfbac7f699ebbbe")
    .map((order) => order.listOrderDetails)
    .reduce((acc, val) => acc.concat(val), [])
    .map((order) => {
      const product = products?.find((p) => p.productId === order.productId);
      return { ...order, ...product };
    })
    .reduce((acc, order) => {
      const { brandName, quantity } = order;
      if (!acc[brandName]) {
        acc[brandName] = quantity;
      } else {
        acc[brandName] += quantity;
      }
      return acc;
    }, {});

  const quantityByBrandArray = Object.entries(o).map(([name, quantity]) => ({
    name,
    quantity,
  }));
  return (
    <>
      <div style={{ textAlign: "center", margin: 5 }}>Số lượng bán tháng</div>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={quantityByBrandArray} margin={5}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default QuantityChart;
