import { Card, List, Image } from "antd";
import React from "react";

function Brand({ data }) {
  const handleCardClick = (brandName) => {};
  return (
    <div>
      <List
        style={{
          padding: 20,
        }}
        grid={{
          gutter: 16,
          column: 4,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 5,
          xxl: 3,
        }}
        renderItem={(brands, index) => {
          return (
            <Card
              size="small"
              className="itemCardBrand"
              key={index}
              cover={<Image className="itemCardImage" src={brands.logo} />}
              hoverable
              onClick={() => handleCardClick(brands)}
            >
              <p>{brands.brandName}</p>
            </Card>
          );
        }}
        dataSource={data !== null ? data : ""}
      ></List>
    </div>
  );
}
export default React.memo(Brand);
