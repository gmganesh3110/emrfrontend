import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Select,
  Input,
  DatePicker,
  Button,
  Card,
  Table,
  Space,
  Tooltip,
} from "antd";
import { getaxios } from "../../services/AxiosService";
import moment from "moment";
import AddAppointment from "./AddAppointment";
import {
  CalendarOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
const { Option } = Select;

const Appointments: React.FC = () => {
  const [date, setDate] = useState<moment.Moment | null>(moment());
  const [doctor, setDoctor] = useState<string>("");
  const [doctorsList, setDoctorsList] = useState([]);
  const [status, setStatus] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");
  const [patientId, setPatientId] = useState<string>("");
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [appointmentsCount, setAppointmentsCount] = useState({
    Booked: 0,
    Reviewed: 0,
    Cancelled: 0,
    InProgress: 0,
  });
  const [showAddAppointment, setShowAppointment] = useState<boolean>(false);

  const statusList = [
    {
      label: "Booked",
    },
    {
      label: "Reviewed",
    },
    {
      label: "In Progress",
    },
    {
      label: "Cancelled",
    },
  ];

  useEffect(() => {
    getAllDoctors();
  }, []);

  useEffect(() => {
    getAllAppointments();
  }, []);

  const getAllAppointments = async () => {
    let obj = {
      date:moment(date).format("YYYY-MM-DD"),
      status,
      doctorId:doctor||0,
      patientId:patientId||0,
      patientName
    };
    const res: any = await getaxios("http://localhost:3000/appointments", obj);
    setAppointmentsList(res.data[0]);
  };

  const getAllDoctors = async () => {
    const res: any = await getaxios(
      "http://localhost:3000/appointments/doctors"
    );
    setDoctorsList(res.data[0]);
  };

  const closeAppointment = () => {
    setShowAppointment(false);
  };

  const columns = [
    {
      title: "Appointment ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Time",
      dataIndex: "timeSlot",
      key: "time",
    },
    {
      title: "InTime",
      dataIndex: "inTime",
      key: "inTime",
    },
    {
      title: "OutTime",
      dataIndex: "outTime",
      key: "outTime",
    },
    {
      title: "PatientID",
      dataIndex: "patientId",
      key: "patientId",
    },
    {
      title: "Doctor",
      dataIndex: "doctorName",
      key: "doctorName",
    },
    {
      title: "PatientName",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Visit Purpose",
      dataIndex: "visitPurpose",
      key: "visitPurpose",
    },
    {
      title: "App Status",
      dataIndex: "appStatus",
      key: "appStatus",
    },
    {
      title: "Billing",
      dataIndex: "billing",
      key: "billing",
    },
    {
      title: "Next Visit",
      dataIndex: "nextVisit",
      key: "nextVisit",
    },
    {
      title: "Actions",
      render: (item: any) => (
        <Space>
          <Tooltip title="Quick Entry">
            <Button
              type="primary"
              icon={<EditOutlined />}
              // onClick={() => handleEdit(item?.id)}
            />
          </Tooltip>
          <Tooltip title="View Patient">
            <Button
              type="default"
              icon={<EyeOutlined />}
              // onClick={() => handleViewPatient(item?.id)}
            />
          </Tooltip>
          <Tooltip title="View Appointment">
            <Button
              type="dashed"
              icon={<CalendarOutlined />}
              // onClick={() => handleViewAppointment(item?.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={24}>
        {/* Left Section - Search Filters */}
        <Col span={16}>
          <Card title="Search Filters" bordered={false}>
            <Row gutter={[16, 16]}>
              {/* Row 1: Date Picker and Doctor Selection */}
              <Col span={12}>
                <DatePicker
                  value={date ? moment(date, "DD/MM/YYYY") : null}
                  onChange={(date) => setDate(moment(date, "DD/MM/YYYY"))}
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                  placeholder="Select Date"
                />
              </Col>
              <Col span={12}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Select Doctor"
                  value={doctor}
                  onChange={(value) => setDoctor(value)}
                >
                  <Option value="">Select Doctor</Option>
                  {doctorsList?.map((doctor: any) => (
                    <Option key={doctor?.id} value={doctor?.id}>
                      {doctor?.doctorName}
                    </Option>
                  ))}
                </Select>
              </Col>

              {/* Row 2: Patient ID, Patient Name, and Status */}
              <Col span={8}>
                <Input
                  placeholder="Enter Patient ID"
                  value={patientId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPatientId(e.target.value)
                  }
                  style={{ width: "100%" }}
                />
              </Col>
              <Col span={8}>
                <Input
                  placeholder="Enter Patient Name"
                  value={patientName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPatientName(e.target.value)
                  }
                  style={{ width: "100%" }}
                />
              </Col>
              <Col span={8}>
                <Select
                  placeholder="Select Status"
                  value={status}
                  onChange={(value: string) => setStatus(value)}
                  style={{ width: "100%" }}
                >
                  <Option value="">Select Status</Option>
                  {statusList?.map((status: any) => (
                    <Option key={status?.label} value={status?.label}>
                      {status?.label}
                    </Option>
                  ))}
                </Select>
              </Col>

              {/* Row 3: Search Button */}
              <Col span={24} style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  onClick={getAllAppointments}
                  style={{ width: "150px" }}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Right Section - Appointment Status Overview */}
        <Col span={8}>
          <Card title="Appointments Status" bordered={false}>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td>Booked</td>
                  <td>{appointmentsCount?.Booked}</td>
                  <td>Reviewed</td>
                  <td>{appointmentsCount?.Reviewed}</td>
                </tr>
                <tr>
                  <td>In Progress</td>
                  <td>{appointmentsCount?.InProgress}</td>
                  <td>Cancelled</td>
                  <td>{appointmentsCount?.Cancelled}</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </Col>
      </Row>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "1rem",
        }}
      >
        <Button type="primary" onClick={() => setShowAppointment(true)}>
          + Appointment
        </Button>
      </div>
      <div className="">
        <Table
          scroll={{ x: "max-content", y: 500 }} // Horizontal and vertical scrolling
          columns={columns.map((column, index) => ({
            ...column,
            onCell: (record:any) => ({
              style: {
                textAlign: index === columns.length - 1 ? "right" : "left", // Align last column values to the right
              },
            }),
          }))}
          dataSource={appointmentsList}
          style={{ marginTop: "20px" }}
          pagination={false}
        />
      </div>
      <div className="">
        {showAddAppointment && (
          <AddAppointment
            closeAppointment={closeAppointment}
            doctorsList={doctorsList}
          />
        )}
      </div>
    </div>
  );
};

export default Appointments;
