import React, { useEffect, useState } from "react";
import { message as msg } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "../style.css";
import OrderList from "../../Components/User/Order/OrderList";
import { getAllOrderByUserId } from "../../actions/order";
import OrderDetailsModal from "../../Components/User/Order/OrderModal";

function OrderByUser({ prop1 }) {
  const { userId } = useParams();
  const { orders } = useSelector((state) => state.order);
  const [openModal, setOpenModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [statusId, setStatusId] = useState("");
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
      <OrderList data={orders} setOpenModal={setOpenModal} setStatusId={setStatusId} setOrderId={setOrderId} />
      <OrderDetailsModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        orderId={orderId}
        statusId={statusId}
      />
    </div>
  );
}
export default OrderByUser;
