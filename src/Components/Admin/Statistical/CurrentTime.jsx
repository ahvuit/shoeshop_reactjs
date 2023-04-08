import React, { useState, useEffect } from "react";
import { Statistic } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date()); // update state with current time
    }, 1000); // update every second
    return () => clearInterval(intervalId); // cleanup function to clear interval
  }, []);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const formattedTime = currentTime.toLocaleString([], options);

  return (
    <div style={{ marginBottom: 20 }}>
      <Statistic value={formattedTime} prefix={<ClockCircleOutlined />} />
    </div>
  );
};
export default CurrentTime;
