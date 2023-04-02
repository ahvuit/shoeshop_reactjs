import { Carousel, Button } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useEffect } from "react";
const SlideShowSale = () => {
  const { sale } = useSelector((state) => state.sale);
 
    const s = sale?.filter((ss) => {
      const date1 = moment(ss.endDay).format("YYYY-MM-DD")
      const date2 = moment(ss.startDay).format("YYYY-MM-DD")
    const current = moment()
   const h= current.diff(date1, "hours", true)
   const h2= current.diff(date2, "hours", true)
   return h<=0 && h2>=0
      
    });
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
          {s.map((item) => (
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
                  {item.startDay?`Từ ${moment(item.startDay).format('DD-MM-YYYY')} `:''}
                  {item.endDay? `đến ${moment(item.endDay).format('DD-MM-YYYY')}`:''}
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
