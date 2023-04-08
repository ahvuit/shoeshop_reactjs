import { Pagination } from "antd";
import { useEffect, useState } from "react";

const ProductPagination=(props)=>{
    const {categoryId,data1,setData}=props;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = data1
    ? data1.slice(indexOfFirstItem, indexOfLastItem)
    : null;
    useEffect(()=>{setData(currentItems)},[currentItems])
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId]);
    const handlePageChange = (page) => {
    setCurrentPage(page);
  };
    return(
        <>{categoryId ? (
            <Pagination
              defaultCurrent={1}
              current={currentPage}
              pageSize={pageSize}
              total={data1 ? data1.length : null}
              onChange={handlePageChange}
            />
          ) : (
            ""
          )}</>
    );
}
export default ProductPagination;