import React, { useEffect, useState } from "react";
import { message as msg } from "antd";
import { selectedProduct } from "../../actions/product";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Image, Rate, Button, Radio, Typography } from "antd";
import { ShoppingCartOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

const ProductDetail = () => {
  const shoe = {
    name1 : "Nike Air Zoom Pegasus 38",
    image1: "https://via.placeholder.com/400x400.png?text=Shoe+Image",
    price: 129.99,
    rate: 4.5,
    description:
      "The Nike Air Zoom Pegasus 38 continues to put a spring in your step, using the same responsive foam as its predecessor. The mesh upper enhances ventilation and support where you need it. This product is made from at least 50% recycled content by weight.",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: ["#000000", "#434343", "#636363", "#9C9C9C", "#C5C5C5", "#EFEFEF"],
    quantity: 10,
  };
  const {  price, rate, description, sizes, colors, quantity } =
    shoe;
    
  const { productId } = useParams();
  const { product } = useSelector((state) => state.product);
  const {name,image}= product; 
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId && productId !== "") {
      dispatch(selectedProduct(productId))
        .then(() => {
          msg.success(`Get  product details have id : ${productId}`);
          //msg.success(message);
        })
        .catch(() => {
          msg.error(`Get product have id ${productId} failed`);
        });
    }
  }, [dispatch, productId]);
  const [size, setSize] = useState(null);
  const handleSizeChange = (e) => {
    const selectedSize = e.target.value;
    setSize(selectedSize);
    console.log(`Selected size: ${selectedSize}`);
  };
  const handleBuyButtonClick = () => {
    console.log(`Buy button clicked for ${name}`);
  };
  const sizeButtonStyle = (s) => {
    if (size === s) {
      return {
        background: 'pink',
        color: '#fff',
        borderColor: '#f00',
      };
    }
    return {};
  };
  return (
    <div style={{ padding: 10 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
          <Image src={image} alt={name} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card>
            <Title level={3}>{name}</Title>
            <Rate disabled allowHalf defaultValue={rate} />
            <Title level={4} type="danger">
              ${price.toFixed(2)}
            </Title>
            <Text type="secondary">{description}</Text>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Text strong>Size:</Text>
                <br />
                <Radio.Group
                // buttonStyle="solid"
                  onChange={handleSizeChange}
                  value={size}
                //   defaultValue={sizes[0]}
                >
                  {sizes.map((size) => (
                    <Radio.Button key={size} value={size} style={sizeButtonStyle(size)}>
                      {size}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Text strong>Color:</Text>
                <br />
                {colors.map((color) => (
                  <Button
                    type="text"
                    key={color}
                    style={{
                      background: color,
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                    }}
                  />
                ))}
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Text strong>Quantity:</Text>
                <br />
                <Text>{quantity}</Text>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <Button style={{ background:'pink', color:'white' }} size="large" disabled={!size} onClick={handleBuyButtonClick}>
                  <ShoppingCartOutlined />
              &nbsp; Add to Cart
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default ProductDetail;
