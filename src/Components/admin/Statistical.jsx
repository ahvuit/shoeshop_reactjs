import React, { useState, useEffect } from "react";
import { Card, Row, Col, Statistic, Space } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import FormattedCurrency from "../FormattedCurrency";
import CurrentTime from "../dashboard/CurrentTime";
import RevenueChart from "../dashboard/RevenueChart";
import QuantityChart from "../dashboard/QuantityChart";
import PieChart from "../dashboard/PieChart";
import { getAllUsers } from "../../actions/user";
import { getAllOrders } from "../../actions/order";

const Statistical = () => {
  const [countUser, setCountUser] = useState(0);
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers())
      .then(() => {})
      .catch(() => {});
    dispatch(getAllOrders())
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);

  const countU = users?.filter((user) => user.utype === "USR") || 0;

  useEffect(() => {
    setCountUser(Object.keys(countU).length || 0);
  }, [countU]);

  const { orders1: order } = useSelector((state) => state.order);
  const o = order
    ?.filter((o) => o.orderModel.statusId === "6405f221abfbac7f699ebbbe")
    .reduce((sum, order) => sum + order.orderModel.total, 0);

  const data = [
    {
      title: "Khách hàng",
      value: `${countUser}`,
      icon: <UserOutlined />,
      color: "#ff0000",
    },
    {
      title: "Đơn hàng",
      value: `${Object.keys(order).length}`,
      icon: <ShoppingCartOutlined />,
      color: "#00ff00",
    },
    {
      title: "Doanh thu",
      value: FormattedCurrency({ amount: o }),
      icon: <DollarOutlined />,
      color: "#0000ff",
    },
  ];
  return (
    <>
      {" "}
      <CurrentTime />
      <div>
        <Row gutter={16}>
          {data.map((item) => (
            <Col xs={24} sm={8} md={12} lg={6} xl={6} key={item.title}>
              <Card
                bordered
                style={{ margin: 5, border: `1px solid ${item.color}` }}
              >
                <Space style={{ justifyContent: "space-between" }}>
                  <Statistic
                    title={item.title}
                    value={item.value}
                    prefix={item.icon}
                    suffix={item.prefix}
                    valueStyle={{ color: item.color }}
                  />
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <div>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <RevenueChart />
          </Col>
          <Col style={{}} xs={24} sm={24} md={12} lg={12} xl={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PieChart />
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <QuantityChart />
        </Col>
      </div>{" "}
    </>
  );
};
export default Statistical;
