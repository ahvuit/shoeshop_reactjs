import { Card, List, Image, Typography, Badge, Rate } from "antd";
import React, { useEffect, useState, createRef, useRef } from "react";
import { Pagination } from "antd";
import { useParams, useNavigate } from "react-router-dom";

import FormattedCurrency from "../FormattedCurrency";

function Products({ data }) {
  const navigate = useNavigate();
  // state để lưu trữ các thông tin cần thiết cho phân trang,
  // ví dụ như số trang hiện tại, số lượng bản ghi trên mỗi trang, và danh sách các bản ghi
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const { categoryId } = useParams();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = data
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : null;
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
                <Card.Meta
                  title={
                    products.sales ? (
                      <Typography.Paragraph>
                        Price:
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
                ></Card.Meta>
              </Card>
            </Badge.Ribbon>
          );
        }}
        dataSource={currentItems !== null ? currentItems : ""}
      ></List>
      {categoryId ? (
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          pageSize={pageSize}
          total={data ? data.length : null}
          onChange={handlePageChange}
        />
      ) : (
        ""
      )}
    </div>
  );
}
export default React.memo(Products);
