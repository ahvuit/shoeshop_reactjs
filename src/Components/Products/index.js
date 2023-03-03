import { Card, List, Image, Typography, Rate } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { getAllProducts } from "../../API";

function Products() {
  const [items, setItems] = useState([]);

  const getUser = () => {
    return fetch("http://localhost:5000/api/getAllUser", {
      headers: { Authentication: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDE1NDE5Y2Y2NzIyNmNiNTllMDI3YiIsImlhdCI6MTY3NzgwODc1NCwiZXhwIjoxNjc3ODk1MTU0fQ.6ZOSO1heIct8sQ7rscADp_FP6yXi9rnzDPZ46D2TzwI' },
    }).then((res) => res.json());
  };
  useEffect(() => {
    getUser().then((json) => console.log(json));
  });
  useEffect(() => {
    getAllProducts().then((res) => {
      setItems(res.products);
    });
  }, []);
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
          xl: 6,
          xxl: 3,
        }}
        renderItem={(products, index) => {
          return (
            <Card
              className="itemCard"
              title={products.title}
              key={index}
              cover={
                <Image className="itemCardImage" src={products.thumbnail} />
              }
            >
              <Card.Meta
                title={
                  <Typography.Paragraph>
                    Price: ${products.price}
                    {"  "}
                    <Typography.Text delete type="danger">
                      $
                      {parseFloat(
                        products.price +
                          (products.price * products.discountPercentage) / 100
                      ).toFixed(2)}
                    </Typography.Text>
                  </Typography.Paragraph>
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
              <Rate allowHalf defaultValue={products.rating} />
              <HeartTwoTone
                twoToneColor="#eb2f96"
                style={{
                  paddingLeft: 20,
                }}
              />
            </Card>
          );
        }}
        dataSource={items}
      ></List>
    </div>
  );
}
export default Products;
