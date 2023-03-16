import { Carousel, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllSales } from "../../actions/sale";

const saleItems = [
  {
    id: 1,
    title: "Sale 50%",
    content: "Sản phẩm thời trang nam",
    image: "https://sv3.anh365.com/images/2023/03/10/BannerPuma.png",
  },
  {
    id: 2,
    title: "Sale 30%",
    content: "Sản phẩm thời trang nữ",
    image: "https://placeimg.com/640/480/fashion",
  },
  {
    id: 3,
    title: "Sale 20%",
    content: "Phụ kiện thời trang",
    image: "https://placeimg.com/640/480/accessories",
  },
];
const handleButtonClick = (itemId) => {
  console.log("click: ", itemId); // In ra item.id tương ứng với button được click
};

const SlideShowSale = () => {
  const { sale } = useSelector((state) => state.sale);

  return (
    <div>
      {sale === null ? (
        <div>Loading...</div>
      ) : (
        <Carousel autoplay className="sale-carousel">
          {sale.map((item) => (
            <div key={item.salesId} className="sale-carousel-image-container">
              <div className="container_slideshow">
                <img src={item.banner} alt="" className="carousel-image" />
                <div className="middle">
                  {/* <div class="text">Buy now</div> */}
                  <Button
                    key={item.id}
                    onClick={() => handleButtonClick(item)}
                    className="text"
                  >
                    Buy Now
                  </Button>
                </div>
                <div className="sale-carousel-title">{item.salesName}</div>
                <div className="sale-carousel-content">{item.content}</div>
                <div className="sale-carousel-date">
                  Từ 20-03-2023 đến 30-03-2023
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default SlideShowSale;
