import React, { useEffect, useState } from "react";
import { Row, Col, Avatar, Typography, Button } from "antd";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProfile } from "../../actions/profile";
import ProfileModal from "./ProfileModal";

const { Title, Text } = Typography;

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile(currentUser?.userId))
      .then(() => {})
      .catch(() => {});
  }, [dispatch, currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
        <Row justify="center" style={{ marginTop: "2rem" }}>
          <Col span={8}>
            <Avatar size={128} src={profile.imageUrl || ""} />
            <Title style={{ marginTop: "1rem" }} level={3}>
              {profile.lastName || "N/A"} {profile.firstName || "N/A"}
            </Title>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "2rem" }}>
          <Col span={8}>
            <Text strong>Profile ID: </Text>
            <Text>{profile.profileId || ""}</Text>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "1rem" }}>
          <Col span={8}>
            <Text strong>Địa chỉ: </Text>
            <Text>{profile.address || "N/A"}</Text>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "1rem" }}>
          <Col span={8}>
            <Text strong>Điện thoại: </Text>
            <Text>{profile.phone || "N/A"}</Text>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "1rem" }}>
          <Col span={8}>
            <Text strong>Mã tài khoản: </Text>
            <Text>{profile.userId || ""}</Text>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "1rem" }}>
          <Col span={8}>
            <Button
              type="primary"
              style={{ background: "var(--primary-color)" }}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Chỉnh sửa
            </Button>
          </Col>
        </Row>
      </div>
      <ProfileModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        profile={profile}
      />
    </>
  );
};

export default Profile;
