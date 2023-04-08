import { Card, List, Image, Typography, Badge, Rate } from "antd";
import React, { createRef, useRef } from "react";
import { useNavigate } from "react-router-dom";

import FormattedCurrency from "../../Common/FormattedCurrency";

function Products({ data }) {
  const navigate = useNavigate();
  const myRef = useRef({});

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
        renderItem={(products) => {
          myRef.current[products.productId] = createRef();
          return (
            <Badge.Ribbon
              className={
                products.sales ? "itemCardRibbon" : "itemCardRibbonHide"
              }
              text={`${products.sales?.percent} %`}
            >
              <Card
                style={{ opacity: products.active ? 1 : 0.2 }}
                ref={myRef.current[products.productId]}
                className="itemCard"
                title={products.name}
                key={products.productId}
                id={products.productId}
                cover={<Image className="itemCardImage" src={products.image} />}
                actions={[
                  <>
                    <Rate disabled allowHalf defaultValue={products.rate} />
                  </>,
                ]}
                onClick={() => navigate(`/product/${products.productId}`)}
              >
                {products.active ? (
                  <Card.Meta
                    title={
                      products.sales ? (
                        <Typography.Paragraph>
                          Giá:{" "}
                          <Typography.Text type="danger">
                            <FormattedCurrency
                              amount={
                                products.price -
                                (products.price * products.sales.percent) / 100
                              }
                            />{" "}
                            {"    "}
                          </Typography.Text>
                          <Typography.Text delete>
                            <FormattedCurrency amount={products.price} />
                          </Typography.Text>
                        </Typography.Paragraph>
                      ) : (
                        <Typography.Paragraph>
                          Price:
                          <Typography.Text type="danger">
                            <FormattedCurrency amount={products.price} />
                          </Typography.Text>
                        </Typography.Paragraph>
                      )
                    }
                    description={
                      <Typography.Paragraph
                        ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                      >
                        {" "}
                        {products.description}
                      </Typography.Paragraph>
                    }
                  />
                ) : (
                  <div>
                    <Typography.Text type="danger">
                      Ngừng kinh doanh
                    </Typography.Text>
                  </div>
                )}
              </Card>
            </Badge.Ribbon>
          );
        }}
        dataSource={data !== null ? data : ""}
      >
        {data !== null && data.length === 0 && (
          <Typography.Text>No products available.</Typography.Text>
        )}
      </List>
    </div>
  );
}
export default React.memo(Products);
