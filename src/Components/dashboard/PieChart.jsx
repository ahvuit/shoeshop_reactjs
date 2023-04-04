import React, { useEffect } from "react";
import { PieChart, Cell, Pie, Tooltip, Legend } from "recharts";
import { useSelector, useDispatch } from "react-redux";

import { getAllOrders } from "../../actions/order";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#ccc"];

const renderLegend = (props) => {
  const { payload } = props;
  return (
    <ul style={{ listStyle: "none" }}>
      {payload.map((entry, index) => (
        <li key={`item-${index}`}>
          <span style={{ backgroundColor: entry.color }} />
        </li>
      ))}
    </ul>
  );
};

const CircleChart = () => {
  const { orders1: order } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders())
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);
  const statusCounts = Object.values(
    order.reduce((acc, cur) => {
      if (acc[cur.orderModel.statusName]) {
        acc[cur.orderModel.statusName]++;
      } else {
        acc[cur.orderModel.statusName] = 1;
      }
      return acc;
    }, {})
  ).map((value, index) => {
    const statusName = Object.keys(
      order.reduce((acc, cur) => {
        if (!acc[cur.orderModel.statusName]) {
          acc[cur.orderModel.statusName] = true;
        }
        return acc;
      }, {})
    )[index];
    return { name: statusName, value };
  });
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={statusCounts}
        cx="50%"
        cy="50%"
        labelLine={false}
        label={({ name, value }) => `${name}: ${value}`}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {statusCounts.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend content={renderLegend} />
    </PieChart>
  );
};

export default CircleChart;
