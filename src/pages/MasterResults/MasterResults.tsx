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
import { deleteaxios, getaxios } from "../../services/AxiosService";
import { useSelector } from "react-redux";
import AddResults from "./AddResults";
import EditResults from "./EditResults";

const MasterResults: React.FC = () => {
  const [showAddResults, setShowAddResults] = useState<boolean>(false);
  const [resultsData, setResultsData] = useState([]);
  const [start, setStart] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [showEditResult, setShowEditResult] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);
  const User = useSelector((state: any) => state.user);

  useEffect(() => {
    getAllResults();
  }, [start]);

  const getAllResults = async () => {
    let obj = {
      start,
      limit,
      name,
      code,
    };
    const res: any = await getaxios("http://localhost:3000/results", obj);
    setResultsData(res.data[0]);
    setTotalCount(res?.data[1][0].tot);
  };

  const closeModals = () => {
    setShowEditResult(false);
    setShowAddResults(false);
    getAllResults();
  };
  const handlePageChange = (page: number, pageSize: number) => {
    setStart((page - 1) * pageSize);
    setLimit(pageSize);
  };

  const handleEdit = (id: number) => {
    setEditId(id);
    setShowEditResult(true);
  };
  const handleDelete = async (id: number) => {
    const response: any = await deleteaxios(
      `http://localhost:3000/results/${id}`,
      {
        modifiedBy: User.id,
      }
    );
    if (response) {
      getAllResults();
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
          <h3>Results</h3>
        </div>
        <div className="">
          <Button onClick={() => setShowAddResults(true)} type="primary">
            +&nbsp;Add Results
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
              onClick={getAllResults}
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
        <Table
          columns={columns}
          dataSource={resultsData}
          rowKey="id"
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
      <div className="">
        {showAddResults && <AddResults closeModals={closeModals} />}
      </div>
      <div className="">
        {showEditResult && (
          <EditResults closeModals={closeModals} editId={editId} />
        )}
      </div>
    </>
  );
};

export default MasterResults;
