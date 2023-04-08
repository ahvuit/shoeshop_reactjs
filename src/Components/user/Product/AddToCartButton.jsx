import { Button } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../actions/cart";
import { ShoppingCartOutlined } from "@ant-design/icons";

const AddToCartButton = (props) => {
  let { product, size } = props;
  if (product.sales) {
    product = {
      ...product,
      price: product.price - (product.price * product.sales.percent) / 100,
    };
  }
  const { productId, name, image, quantity, price } = product;
  const selectedFields = { productId, name, image, quantity, price };
  const dispatch = useDispatch();
  return (
    <Button
      style={{ background: "var(--primary-color)", color: "white" }}
      size="large"
      disabled={!size || !product.active}
      onClick={() => {
        dispatch(addToCart(selectedFields, parseInt(size)));
      }}
    >
      <ShoppingCartOutlined />
      &nbsp; Thêm vào giỏ hàng
    </Button>
  );
};
export default AddToCartButton;
