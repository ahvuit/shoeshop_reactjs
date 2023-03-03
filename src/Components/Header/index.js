import { Menu } from "antd";
import { HomeFilled } from "@ant-design/icons";
import {useNavigate} from 'react-router-dom';

const AppHeader = () => {
  const navigate = useNavigate()
  const onMenuClick=item=>{
    navigate(`/${item.key}`)
  }
  return (
    <div className="appHeader">
      <Menu
      onClick={onMenuClick}
        mode="horizontal"
        items={[
          { label: <HomeFilled />, key: "" },
          {
            label: "Men",
            key: "men",
            children: [
              { label: "Men's Shirt", key: "men-shirt" },
              { label: "Men's Shoes", key: "men-shoes" },
              { label: "Men's Watch", key: "men-watch" },
              { label: "Men's Bags", key: "men-bags" },
            ],
          },
          { label: "Women", key: "women",children: [
            { label: "Women's Shirt", key: "women-shirt" },
            { label: "Women's Shoes", key: "women-shoes" },
            { label: "Women's Watch", key: "women-watch" },
            { label: "Women's Bags", key: "women-bags" },
            { label: "Women's Jewelry", key: "women-jewelry" },
          ], },
          { label: "Fragrances", key: "fragrances" },
        ]}
      />
    </div>
  );
};
export default AppHeader;
