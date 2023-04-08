import { Table as TB } from "antd";

const Table = (props) => {
  const { data, columns, pagination, emptyText, rowKey } = props;
  return (
    <TB
      dataSource={data}
      columns={columns}
      pagination={pagination}
      locale={{
        emptyText: `${emptyText}`,
      }}
      rowKey={rowKey}
    />
  );
};
export default Table;
