import { Card, List, Image, Typography, Badge, Rate, Button } from "antd";
import React, { useEffect, useState,createRef,useRef } from "react";
import { Pagination } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

// import { getAllProducts } from "../../actions/product";

function Products({ data }) {
  const navigate = useNavigate();
  // state để lưu trữ các thông tin cần thiết cho phân trang,
  // ví dụ như số trang hiện tại, số lượng bản ghi trên mỗi trang, và danh sách các bản ghi
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);  
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
   const handleCardClick = (productId) => {
      console.log(`Clicked card with productId ${productId}`);
    };
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
            <Badge.Ribbon  className={products.sales ? "itemCardRibbon" : "itemCardRibbonHide"}  text={`${products.sales?.percent} %`}    >
              {/* <Link to={`/product/${products.productId}`}> */}
              <Card
              ref={myRef.current[products.productId]}
                className="itemCard"
                title={products.name}
                key={products.productId}
                id={products.productId}
                
                cover={<Image className="itemCardImage" src={products.image} />}
                actions={[ <><Rate disabled allowHalf defaultValue={products.rate} /><Button type="link" >Add to Cart</Button></>]}
                onClick={() => navigate(`/product/${products.productId}`)}
              >
                <Card.Meta
                  title={
                    products.sales ? (
                      <Typography.Paragraph>
                        Price:
                        <Typography.Text type="danger">
                          $
                          {parseFloat(
                            products.price -
                              (products.price * products.sales.percent) / 100
                          ).toFixed(2)}{" "}
                          {"    "}
                        </Typography.Text>
                        <Typography.Text delete>
                          ${parseFloat(products.price).toFixed(2)}
                        </Typography.Text>
                      </Typography.Paragraph>
                    ) : (
                      <Typography.Paragraph>
                        Price:
                        <Typography.Text type="danger">
                          ${parseFloat(products.price).toFixed(2)}
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
              {/* </Link> */}
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
