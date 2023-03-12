import { Carousel, Button } from "antd";

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
    console.log('click: ',itemId); // In ra item.id tương ứng với button được click
  }

const SlideShowSale = () => {
  return (
    <Carousel autoplay className="sale-carousel">
      {saleItems.map((item) => (
        <div key={item.id} className="sale-carousel-image-container">
          <div className="container_slideshow">
            <img src={item.image} alt="" className="carousel-image" />
            <div className="middle">
              {/* <div class="text">Buy now</div> */}
              <Button key={item.id} onClick={() => handleButtonClick(item)} className="text">
                Buy Now
              </Button>
            </div>
            <div className="sale-carousel-title">{item.title}</div>
            <div className="sale-carousel-content">{item.content}</div>
            <div className="sale-carousel-date">
              Từ 20-03-2023 đến 30-03-2023
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default SlideShowSale;
