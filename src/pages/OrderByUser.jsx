import React, { useEffect } from "react";
import { message as msg } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./style.css";
import Order from "../Components/user/Order";
import { getAllOrderByUserId } from "../actions/order";

function OrderByUser({ prop1 }) {
  const { userId } = useParams();
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userId) {
      dispatch(getAllOrderByUserId(userId))
        .then(() => {})
        .catch(() => {
          msg.error("Get all order failed");
        });
    }
  }, [dispatch, userId]);

  return (
    <div>
      <Order data={orders} />
    </div>
  );
}
export default OrderByUser;
