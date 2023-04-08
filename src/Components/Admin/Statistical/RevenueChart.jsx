import React, { useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";

import FormattedCurrency from "../../Common/FormattedCurrency";
import { getAllOrders } from "../../../actions/order";

const RevenueChart = () => {
  const { orders1: order } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders())
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);

  const deliveryTotals = order?.reduce((acc, order) => {
    const { deliveryDate, total } = order.orderModel;
    const deMonth = deliveryDate.slice(0, 7);
    acc[deMonth] = (acc[deMonth] || 0) + total;
    return acc;
  }, {});

  const orderTotalsByMonthArray = Object.entries(deliveryTotals).map(
    ([name, revenue]) => ({
      name: name,
      revenue: revenue,
    })
  );

  return (
    <>
      <div style={{ textAlign: "center", margin: 5 }}>Doanh thu tháng</div>
      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart
          width={600}
          height={300}
          data={orderTotalsByMonthArray}
          margin={5}
        >
          {/* <CartesianGrid strokeDasharray="0 0" /> */}
          <XAxis dataKey="name" />
          <YAxis
            tickFormatter={(value) => FormattedCurrency({ amount: value })}
          />
          <Tooltip
            formatter={(value) => FormattedCurrency({ amount: value })}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default RevenueChart;
