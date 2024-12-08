import {
  Button,
  Input,
  message,
  Pagination,
  Popconfirm,
  Space,
  Spin,
  Table,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { deleteaxios, getaxios } from "../../services/AxiosService";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import AddPaymode from "./AddPaymode";
import "./Paymode.css";
import { useSelector } from "react-redux";
import EditPaymode from "./EditPaymode";

const Paymodes: React.FC = () => {
  const [paymodes, setPamodes] = useState([]);
  const [paymode, setPaymode] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAddPaymode, setShowAddPaymode] = useState<boolean>(false);
  const [showEditPaymode, setShowEditPaymode] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);
  const [start, setStart] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);
  const User = useSelector((state: any) => state.user);

  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Paymode",
      dataIndex: "paymode",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Actions",
      render: (item: any) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => handleEdit(item?.id)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Delete Paymode"
              description="Are you sure to delete this Paymode?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => handleDelete(item?.id)}
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleEdit = (id: any) => {
    setEditId(id);
    setShowEditPaymode(true);
  };

  const handleDelete = async (id: any) => {
    const res: any = await deleteaxios(`http://localhost:3000/paymodes/${id}`, {
      modifiedBy: User.id,
    });
    if (res) {
      message.success("Paymode Deleted successfully");
      handleClose();
    } else {
      const errorMessage =
        res?.response?.data?.message ||
        "Something went wrong. Please try again.";
      message.error(errorMessage);
    }
  };

  useEffect(() => {
    getAllPaymodes();
  }, [start]);

  const getAllPaymodes = async () => {
    setIsLoading(true);
    const res: any = await getaxios("http://localhost:3000/paymodes", {
      start,
      limit,
      paymode,
    });
    if (res.status === 200) {
      setIsLoading(false);
      setPamodes(res?.data[0]);
      setTotalCount(res?.data[1][0]?.tot);
    } else {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowAddPaymode(false);
    setEditId(0);
    setShowEditPaymode(false);
    getAllPaymodes();
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setStart((page - 1) * pageSize);
    setLimit(pageSize);
  };

  const searchPaymodes = () => {
    setStart(0);
    setLimit(5);
    getAllPaymodes();
  };
  return (
    <div>
      <div className="">
        <div className="header-content">
          <div className="">
            <h2>Paymode</h2>
          </div>
          <Button type="primary" onClick={() => setShowAddPaymode(true)}>
            Add Paymode
          </Button>
        </div>
        {isLoading ? (
          <div className="text-center">
            <Spin fullscreen size="large" />
          </div>
        ) : (
          <div>
            <div
              className="search-container"
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Input
                placeholder="Search Paymode"
                value={paymode}
                onChange={(e) => setPaymode(e.target.value)}
                style={{ width: "300px" }}
              />
              <Button onClick={searchPaymodes} type="primary">
                Search
              </Button>
            </div>

            <div className="">
              <Table
                style={{ height: "75vh" }}
                dataSource={paymodes}
                columns={columns}
                pagination={false}
              />
              <Pagination
                align="end"
                total={totalCount}
                pageSize={limit}
                current={start / limit + 1}
                onChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
      {showAddPaymode && <AddPaymode handleClose={handleClose} />}
      {showEditPaymode && (
        <EditPaymode editId={editId} handleClose={handleClose} />
      )}
    </div>
  );
};

export default Paymodes;
