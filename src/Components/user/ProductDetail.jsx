import React, { useEffect, useState } from "react";
import { message as msg } from "antd";
import { selectedProduct, remove_SelectedProduct } from "../../actions/product";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Image, Rate, Button, Radio, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import authHeader from "../../services/auth-header"; 
const { Title, Text } = Typography;

const ProductDetail = () => {
  const shoe = {
    name1: "Nike Air Zoom Pegasus 38",
    image1: "https://via.placeholder.com/400x400.png?text=Shoe+Image",
    price: 129.99,
    rate: 4.5,
    description:
      "The Nike Air Zoom Pegasus 38 continues to put a spring in your step, using the same responsive foam as its predecessor. The mesh upper enhances ventilation and support where you need it. This product is made from at least 50% recycled content by weight.",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: ["#000000", "#434343", "#636363", "#9C9C9C", "#C5C5C5", "#EFEFEF"],
    quantity: 10,
  };
  const { price, rate, description, sizes, colors, quantity } = shoe;

  const { productId } = useParams();
  const { product } = useSelector((state) => state.product);
  console.log('product: ',product);
  
  const getAllProducts = () => {
    return fetch(`http://localhost:8080/api/insertProduct`, {
      method: "POST",
      mode: "cors",
      headers: authHeader(),
      body: JSON.stringify({
        "name": "Nike Jordan 1 Green1",
        "description": null,
        "brandId": "640d230a0f43ab511dd9e7bf",
        "categoryId": "640bde0789780c42791c75ff",
        "price": 300.0,
        "rate": null,
        "productNew": null,
        "purchase": null,
        "stock": null,
        "active": null,
        "image": null,
        "createdDate": null,
        "dateUpdated": null,
        "updateBy": null,
        "productId": null
    })
      }
      )
      .then((res) => res.json())
  .then((json) => {
    console.log('json: ',json);
    return json;
  });
  };
  useEffect(()=>{
getAllProducts()
  })


  const dispatch = useDispatch();
  useEffect(() => {
    if (productId && productId !== "") {
      dispatch(selectedProduct(productId))
        .then(() => {
          //msg.success(`Get  product details have id : ${productId}`);
          //msg.success(message);
        })
        .catch(() => {
          //msg.error(`Get product have id ${productId} failed`);
        });
    }
    return () => {
      dispatch(remove_SelectedProduct());
    };
  }, [dispatch, productId]);
  const [size, setSize] = useState(null);
  const handleSizeChange = (e) => {
    const selectedSize = e.target.value;
    setSize(selectedSize);
    console.log(`Selected size: ${selectedSize}`);
  };
  const handleBuyButtonClick = () => {
    console.log(`Buy button clicked for ${productId}`);
  };
  const sizeButtonStyle = (s) => {
    if (size === s) {
      return {
        background: "pink",
        color: "#fff",
        borderColor: "#f00",
      };
    }
    return {};
  };
  return (
    <div style={{ padding: 10 }}>
      {product === null ? (
        <div>Loading ....</div>
      ) : (<div>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Image src={product.image} alt={product.name} />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card>
              <Title level={3}>{product.name}</Title>
              <Rate disabled allowHalf defaultValue={product.rate} />
              <Title level={4} type="danger">
                ${parseFloat(product.price).toFixed(2)}
              </Title>
              <Text type="secondary">{product.description}</Text>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Text strong>Size:</Text>
                  <br />
                  <Radio.Group
                    // buttonStyle="solid"
                    onChange={handleSizeChange}
                    value={size}
                    //   defaultValue={sizes[0]}
                  >
                    {sizes.map((size) => (
                      <Radio.Button
                        key={size}
                        value={size}
                        style={sizeButtonStyle(size)}
                      >
                        {size}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </Col>
                {/* <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
                </Col> */}
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Text strong>Quantity:</Text>
                  <br />
                  <Text>{product.stock}</Text>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={24}
                  xl={24}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <div style={{ textAlign: "center" }}>
                    <Button
                      style={{ background: "pink", color: "white" }}
                      size="large"
                      disabled={!size}
                      onClick={handleBuyButtonClick}
                    >
                      <ShoppingCartOutlined />
                      &nbsp; Add to Cart
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row></div>
      )}
    </div>
  );
};
export default ProductDetail;
