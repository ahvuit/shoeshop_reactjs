import React, { useEffect, useState } from "react";
import { Row, Col, Avatar, Typography, Button } from "antd";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProfile } from "../../actions/profile";
import ProfileModal from "../../Components/User/Profile/ProfileModal";
import MyButton from "../../Components/Common/MyButton";
import ChangePassModal from "../../Components/User/Profile/ChangePassModal";

const { Title, Text } = Typography;

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
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
            <MyButton
              type="primary"
              bgColor="var(--primary-color)"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Chỉnh sửa
            </MyButton>
            <Button
              type="primary"
              style={{ background: "var(--primary-color)", marginLeft: 23 }}
              onClick={() => {
                setOpenModal1(true);
              }}
            >
              Đổi mật khảu
            </Button>
          </Col>
        </Row>
      </div>
      <ProfileModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        profile={profile}
      />
      <ChangePassModal
        openModal1={openModal1}
        setOpenModal1={setOpenModal1}
        profile={profile}
      />
    </>
  );
};

export default Profile;
