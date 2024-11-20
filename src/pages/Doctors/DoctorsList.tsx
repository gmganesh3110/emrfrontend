import {
  Button,
  Col,
  Input,
  message,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import "./DoctorList.css";
import AddDoctor from "./AddDoctor";
import { deleteaxios, getaxios } from "../../services/AxiosService";
import { Option } from "antd/es/mentions";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import EditDoctor from "./EditDoctor";
import { useSelector } from "react-redux";
const DoctorsList: React.FC = () => {
  const [doctorlist, setDoctorslist] = useState([]);
  const [showAddDoctor, setShowAddDoctor] = useState<boolean>(false);
  const [showEditDoctor, setShowEditDoctor] = useState<boolean>(false);
  const [start, setStart] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [doctorName, setDoctorName] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [specialization, setSpecialization] = useState<string>("");
  const [specializations, setSpecializations] = useState([]);
  const [doctorId, setDoctorId] = useState<number>(0);
  const User = useSelector((state: any) => state.user);
  useEffect(() => {
    getAllSpecializations();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "FirstName",
      dataIndex: "firstName",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
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
      title: "DOB",
      dataIndex: "dateOfBirth",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
    },
    {
      title: "Experience",
      dataIndex: "experience",
    },
    {
      title: "Qualifications",
      dataIndex: "qualifications",
    },
    {
      title: "Address",
      dataIndex: "address",
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

  const handleEdit = (id: number) => {
    setShowEditDoctor(true);
    setDoctorId(id);
  };
  const handleDelete = async (id: number) => {
    const res: any = await deleteaxios(
      `http://localhost:3000/users/deletedoctor/${id}`,
      { modifiedBy: User.id }
    );
    if (res) {
      message.success("Specialization Deleted successfully");
      getAllDoctors();
    } else {
      const errorMessage =
        res?.response?.data?.message ||
        "Something went wrong. Please try again.";
      message.error(errorMessage);
    }
  };
  useEffect(() => {
    getAllDoctors();
  }, [start]);
  const getAllDoctors = async () => {
    try {
      let obj = {
        start,
        limit,
        email,
        doctorName,
        specialization: specialization || 0,
        mobileNumber,
      };
      const res: any = await getaxios(
        "http://localhost:3000/users/getalldoctors",
        obj
      );
      setDoctorslist(res?.data[0]);
      setTotalCount(res?.data[1][0].tot);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddDoctor = () => {
    setShowAddDoctor(true);
  };
  const closeAddEditDoctor = () => {
    setShowAddDoctor(false);
    setShowEditDoctor(false);
    setDoctorId(0); 
    getAllDoctors()

  };
  const handlePageChange = (page: number, pageSize: number) => {
    setStart((page - 1) * pageSize);
    setLimit(pageSize);
  };
  const getAllSpecializations = async () => {
    try {
      const res: any = await getaxios(
        "http://localhost:3000/users/allspecializations"
      );
      setSpecializations(res?.data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  const searchDoctors = () => {
    setStart(0);
    setLimit(5);
    getAllDoctors();
  };
  return (
    <div className="doctorlist-container">
      <div className="">
        <div className="doctorlist-header">
          <div className="">
            <h3>Doctors</h3>
          </div>
          <div className="">
            <Button onClick={handleAddDoctor} type="primary">
              Add Doctor
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
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
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
                placeholder="Specialization"
                onChange={(val: any) => setSpecialization(val)}
                style={{ width: "100%" }}
              >
                <Option value=""></Option>
                {specializations.map((item: any) => (
                  <Option key={item?.id} value={item?.id}>
                    {item?.specialization}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ width: "100%" }}>
            <Col span={6}>
              <Button
                onClick={searchDoctors}
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

        <div className="">
          <Table
            dataSource={doctorlist}
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
      </div>
      {showAddDoctor && <AddDoctor closeAddEditDoctor={closeAddEditDoctor} />}
      {showEditDoctor && (
        <EditDoctor
          doctorId={doctorId}
          closeAddEditDoctor={closeAddEditDoctor}
        />
      )}
    </div>
  );
};

export default DoctorsList;
