import React, { useEffect, useState } from "react";
import AddPatient from "./AddPatient";
import {
  Button,
  Col,
  Input,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tooltip,
} from "antd";
import { getaxios } from "../../services/AxiosService";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import EditPatient from "./EditPatient";
const { Option } = Select;
const Patients: React.FC = () => {
  const [showAddPatient, setShowAddPatient] = useState<boolean>(false);
  const [showEditPatient, setShowEditPatient] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);
  const [patients, setPatients] = useState<any>([]);
  const [patientName, setPatientName] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bloodGroup, setBloodGroup] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [start, setStart] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [bloodGroups] = useState([
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
  ]);

  const [genders] = useState([
    { label: "Male", value: "Male" },
    { label: "FeMale", value: "FeMale" },
    { label: "Others", value: "Others" },
  ]);

  useEffect(() => {
    getAllPatients();
  }, [start]);
  const getAllPatients = async () => {
    setLoading(true);
    try {
      let obj = {
        start,
        limit,
        email,
        patientName,
        mobileNumber,
        bloodGroup,
        gender,
      };
      const res: any = await getaxios("http://localhost:3000/patients", obj);
      setLoading(false);
      setPatients(res?.data[0]);
      setTotalCount(res?.data[1][0].tot);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const closeAddEditPatient = () => {
    setShowAddPatient(false);
    setShowEditPatient(false);
    getAllPatients();
  };
  const handlePageChange = (page: number, pageSize: number) => {
    setStart((page - 1) * pageSize);
    setLimit(pageSize);
  };
  const searchPatients = () => {
    setStart(0);
    setLimit(5);
    getAllPatients();
  };

  const handleEdit = (id: number) => {
    setEditId(id);
    setShowEditPatient(true);
  };
  const handleDelete = (id: number) => {
    console.log(id);
  };
  const columns: any = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
    },
    {
      title: "Mobile",
      dataIndex: "mobileNumber",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
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
              title="Delete Doctor"
              description="Are you sure to delete this Doctor?"
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
    <div>
      <div className="header-content">
        <div className="">
          <h3> Patient List</h3>
        </div>
        <div className="">
          <Button type="primary" onClick={() => setShowAddPatient(true)}>
            Add Patient
          </Button>
        </div>
      </div>
      <div className="">
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
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={6}>
              <Input
                placeholder="Mobile"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={6}>
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={6}>
              <Select
                placeholder="Blood Group"
                onChange={(val: any) => setBloodGroup(val)}
                style={{ width: "100%" }}
              >
                <Option value="">{""}</Option>
                {bloodGroups.map((item: any) => (
                  <Option key={item?.value} value={item?.value}>
                    {item?.label}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>
              <Select
                placeholder="Gender"
                onChange={(val: any) => setGender(val)}
                style={{ width: "100%" }}
              >
                <Option value="">{""}</Option>
                {genders.map((item: any) => (
                  <Option key={item?.value} value={item?.value}>
                    {item?.label}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={6}>
              <Button
                onClick={searchPatients}
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

        {loading ? (
          <div>
            <Spin fullscreen size="large" />
          </div>
        ) : (
          <div className="">
            <Table
              dataSource={patients}
              columns={columns}
              pagination={false}
            ></Table>
            <Pagination
              align="end"
              total={totalCount}
              pageSize={limit}
              current={start / limit + 1}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
      {showAddPatient && (
        <AddPatient closeAddEditPatient={closeAddEditPatient} />
      )}
      {showEditPatient && (
        <EditPatient
          editId={editId}
          closeAddEditPatient={closeAddEditPatient}
        />
      )}
    </div>
  );
};

export default Patients;
