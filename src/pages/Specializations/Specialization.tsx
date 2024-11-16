import { Button, Input, Pagination, Space, Spin, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { getaxios } from "../../services/AxiosService";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddSpecialization from "./AddSpecialization";
import "./Specialization.css";
import EditSpecialization from "./EditSpecialization";

const Specialization: React.FC = () => {
  const [specializations, setSpecializations] = useState([]);
  const [specialization, setSpecialization] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAddSpecialization, setShowAddSpecialization] =
    useState<boolean>(false);
  const [showEditSpecialization, setShowEditSpecialization] =
    useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);
  const [start, setStart] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);

  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "userRole",
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
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(item?.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleEdit = (id: any) => {
    setEditId(id);
    setShowEditSpecialization(true);
  };

  const handleDelete = (id: any) => {
    console.log(id);
  };

  useEffect(() => {
    getAllSpecializations();
  }, [start, limit]);

  const getAllSpecializations = async () => {
    setIsLoading(true);
    const res: any = await getaxios("http://localhost:3000/specializations", {
      start,
      limit,
      specialization,
    });
    if (res.status === 200) {
      setIsLoading(false);
      setSpecializations(res?.data[0]);
      setTotalCount(res?.data[1][0]?.tot);
    } else {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowAddSpecialization(false);
    setEditId(0);
    setShowEditSpecialization(false);
    getAllSpecializations();
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setStart((page - 1) * pageSize);
    setLimit(pageSize);
  };

  const searchSpecializations = () => {
    setStart(0);
    setLimit(5);
    getAllSpecializations();
  };
  return (
    <div>
      <div className="">
        <div className="header-content">
          <div className="">
            <h2>Specializations</h2>
          </div>
          <Button type="primary" onClick={() => setShowAddSpecialization(true)}>
            Add Specialization
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
                placeholder="Search Specializations"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                style={{ width: "300px" }}
              />
              <Button onClick={searchSpecializations} type="primary">
                Search
              </Button>
            </div>

            <div className="">
              <Table
                style={{ height: "75vh" }}
                dataSource={specializations}
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
      {showAddSpecialization && <AddSpecialization handleClose={handleClose} />}
      {showEditSpecialization && (
        <EditSpecialization editId={editId} handleClose={handleClose} />
      )}
    </div>
  );
};

export default Specialization;
