import React, { useState } from "react";
import { Input, Select, Space } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

const SearchComponent = (props) => {
  const { data, setFilteredData, options } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [option, setOption] = useState(Object.keys(options)[0]);
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm === "") {
      setFilteredData(null);
    } else {
      const filteredData = data.filter((item) => {
        return item[option].toLowerCase().includes(searchTerm.trim());
      });
      setFilteredData(filteredData);
    }
  };
  const handleClear = () => {
    setSearchTerm("");
    setFilteredData(null);
  };
  return (
    <div>
      <Space.Compact>
        <Select
          style={{ width: "auto " }}
          defaultValue={Object.keys(options)[0]}
          name="option"
          onChange={(value) => {
            setOption(value);
          }}
        >
          {Object.entries(options).map(([k, v]) => {
            return (
              <Option key={k} value={k}>
                {v}
              </Option>
            );
          })}
        </Select>
        <Search
          placeholder={`Tìm kiếm theo ${options[option]}`}
          onChange={handleSearch}
          suffix={searchTerm && <CloseCircleOutlined onClick={handleClear} />}
          style={{ width: 200 }}
          allowClear
        />
      </Space.Compact>
    </div>
  );
};
export default SearchComponent;
