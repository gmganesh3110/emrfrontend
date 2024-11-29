import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Pagination,
  Popconfirm,
  Space,
  Table,
  Tooltip,
  Row,
  Col,
  Input,
} from "antd";
import React, { useEffect, useState } from "react";
import AddVitals from "./AddVital";
import { deleteaxios, getaxios } from "../../services/AxiosService";
import EditVital from "./EditVital";
import { useSelector } from "react-redux";

const MasterVitals: React.FC = () => {
  const [showAddVitals, setShowAddVitals] = useState<boolean>(false);
  const [vitalsData, setVitalsData] = useState([]);
  const [start, setStart] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [showEditVital, setShowEditVital] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);
  const User = useSelector((state: any) => state.user);

  useEffect(() => {
    getAllVitals();
  }, [start]);

  const getAllVitals = async () => {
    let obj = {
      start,
      limit,
      name,
      code,
    };
    const res: any = await getaxios("http://localhost:3000/vitals", obj);
    setVitalsData(res.data[0]);
    setTotalCount(res?.data[1][0].tot);
  };

  const closeModals = () => {
    setShowEditVital(false);
    setShowAddVitals(false);
    getAllVitals();
  };
  const handlePageChange = (page: number, pageSize: number) => {
    setStart((page - 1) * pageSize);
    setLimit(pageSize);
  };

  const handleEdit = (id: number) => {
    setEditId(id);
    setShowEditVital(true);
  };
  const handleDelete = async (id: number) => {
    const response: any = await deleteaxios(
      `http://localhost:3000/vitals/${id}`,
      {
        modifiedBy: User.id,
      }
    );
    if (response) {
      getAllVitals();
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Shortcode",
      dataIndex: "shortCode",
    },
    {
      title: "Display Name",
      dataIndex: "displayName",
    },
    {
      title: "Measurement",
      dataIndex: "measurement",
    },
    {
      title: "Description",
      dataIndex: "description",
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
              title="Delete Vital"
              description="Are you sure to delete this Vital?"
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

  return (
    <>
      <div
        className=""
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginInline: "1rem",
        }}
      >
        <div className="">
          <h3>Vitals</h3>
        </div>
        <div className="">
          <Button onClick={() => setShowAddVitals(true)} type="primary">
            +&nbsp;Add Vitals
          </Button>
        </div>
      </div>
      <div
        className="search-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* First Row */}
        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          <Col span={6}>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={6}>
            <Input
              placeholder="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={6}>
            <Button
              onClick={getAllVitals}
              type="primary"
              style={{
                width: "100%",
                height: "100%",
                padding: "8px 0",
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
      </div>

      <div>
        <Table columns={columns} dataSource={vitalsData} rowKey="id" />
        <Pagination
          align="end"
          total={totalCount}
          pageSize={limit}
          current={start / limit + 1}
          onChange={handlePageChange}
        />
      </div>
      <div className="">
        {showAddVitals && <AddVitals closeModals={closeModals} />}
      </div>
      <div className="">
        {showEditVital && (
          <EditVital closeModals={closeModals} editId={editId} />
        )}
      </div>
    </>
  );
};

export default MasterVitals;
