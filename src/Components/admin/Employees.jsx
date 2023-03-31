import React, { useEffect, useState } from "react";
import { message as msg, Table, Space, Button ,Image,Modal , Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { InfoOutlined, ExclamationCircleFilled ,RetweetOutlined  } from "@ant-design/icons";
import { getAllUsers,updateUser } from "../../actions/user";
import AccountModal from "./AccountModal"; 
import UserModal from "./UserModal";
const { confirm } = Modal;
 
const columns = [
  {
    title: "Customer ID",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
    sorter: (a, b) => a.email.length - b.email.length,
  },
  {
    title: "Role",
    dataIndex: "utype",
    key: "utype",
    render: (utype) => {
      const color = utype==="ADM"  ? "blue" : "red";
      return <Tag color={color}>{utype==="ADM"? "Admin" : "Staff"}</Tag>;
    },
  },
  {
    title: "Active?",
    dataIndex: "active",
    key: "active",
    render: (active) => {
      const color = active  ? "green" : "red";
      return <Tag color={color}>{active? "Active" : "Inactive"}</Tag>;
    },
  },
  
];

const Customers = () => {
  const { users } = useSelector((state) => state.user);
  const userss= users?.filter((user)=>user.utype!=='USR');
  console.log('lUser: ',userss);
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const dispatch = useDispatch();
  const { user: userCurrent } = useSelector((state) => state.auth);
  const [user, setUser] = useState([]);
  const [action1, setAction1]=useState('');
  // const [action, setAction] = useState("");
  useEffect(() => {
    dispatch(getAllUsers())
      .then(() => {})
      .catch(() => {
        msg.error("Get all customer failed");
      });
  }, [dispatch]);
  const handleActive = (u, action) => {
    // const {active,...rest}=u
    let uActive = null;
    if (action === "active") {
      uActive = { ...u, active: !u.active };
    } else if(action==='reset') {
      uActive = { ...u, password: "000000" };
    }else if(action==='change'){
      //console.log('change: ',action);
      uActive={...u, utype: u.utype==='ADM'?'STF':'ADM' }
      console.log('u: ',uActive);
    }

    const content =
      action === "active"
        ? uActive?.active
          ? "Do you want Unblock this account?"
          : "Do you want Block this account?"
        :action==='reset'? "Do you want Reset Password this account?":'Do you want change role for this account?'; 
    confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleFilled />,
      content: content,
      onOk() {
        dispatch(updateUser(uActive.userId, { ...uActive }))
          .then(() => {
            msg.success("Update customer successful.");
          })
          .catch(() => {
            msg.error("Update customer failed");
          });
      },
      onCancel() {
      },
    });
  };
  const columnss = [
    ...columns,
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
        <Button
          style={{ background: "var(--primary-color)" }}
          type="primary"
          icon={<InfoOutlined />}
          onClick={() => {
            setOpenModal(true);
            setUser(record);
            setAction1("see");
          }}
        />
        {record.email !== userCurrent.email?<Button
          style={{ background: "green" }}
          type="primary"
          icon={<RetweetOutlined />}
          onClick={() => {
            // setOpenModal(true);    
            //setUser(record);
            const action = 'change';
            handleActive(record,action)
          }}
        />:''}
        
        <Button
          onClick={() => {
            const action = "reset";
            handleActive(record, action);
          }}
          
          type="primary"
          style={{ background: "#ffc107" }}
        >
          Reset Pass
        </Button>
          {record.email!==userCurrent.email?(<Button
              //disabled={record.email !== userCurrent.email }
              onClick={() => {
                const action = "active";
                handleActive(record,action);
                
              }}
              type="primary"
              style={{ background: record.active ? "#f00" : "#0f0" }}
            >
              {record?.active ? "Block  " : "UnBlock"}
            </Button>):('')}
            
      </Space>
      ),
    },
  ];

  const pagination = { pageSize: 5 };

  return (
    <>
      <Button
        style={{ background: "var(--primary-color)", margin: 10 }}
        type='primary'
        onClick={() => {
          // setOpenModal(true);
          //setUser([]);
           //setAction1("add");
           setOpenModal1(true);
          
        }}
      >
        Add
      </Button>
      <div style={{ overflowX: "auto" }}>
        {" "}
        <Table
          columns={columnss}
          dataSource={userss ? userss  : []}
          pagination={pagination}
          scroll={{
            y: "60vh",
          }}
          locale={{
            emptyText: "Your brands is empty",
          }}
          rowKey="userId"
        />
      </div>
      <UserModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        user={user}
        //setBrands={setBrands}
        action1={action1}
      />
      <AccountModal
        openModal1={openModal1}
        setOpenModal1={setOpenModal1}
        //user={user}
        //setBrands={setBrands}
        //action1={action1}
      />
    </>
  );
};
export default Customers;