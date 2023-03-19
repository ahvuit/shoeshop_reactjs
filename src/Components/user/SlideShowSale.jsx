import { Carousel, Button } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SlideShowSale = () => {
  const { sale } = useSelector((state) => state.sale);
  const navigate = useNavigate();
  const handleButtonClick = (itemId) => {
    navigate(`/sale/sale-${itemId.salesId}`);
  };
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
