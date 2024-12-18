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
import { CalendarOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import ViewPatient from "./ViewPatient";
import ViewAppointment from "./ViewAppointment";
import QuickEntry from "./QuickEntry";
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
  const [showViewPatient, setShowViewPatient] = useState<boolean>(false);
  const [viewPatientId, setViewPatientId] = useState<number>(0);
  const [showAddAppointment, setShowAppointment] = useState<boolean>(false);
  const [showQuickEntry, setShowQuickEntry] = useState<boolean>(false);
  const [appointmentId, setAppoimentId] = useState<number>(0);
  const [showViewAppointment, setShowViewAppointment] =
    useState<boolean>(false);

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
      date: moment(date).format("YYYY-MM-DD"),
      status,
      doctorId: doctor || 0,
      patientId: patientId || 0,
      patientName,
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
  const handleViewPatient = (patientId: number) => {
    setShowViewPatient(true);
    setViewPatientId(patientId);
  };

  const closePatientView = () => {
    setShowViewPatient(false);
    setViewPatientId(0);
  };

  const handleViewAppointment = (appointmentId: number) => {
    setShowViewAppointment(true);
    setAppoimentId(appointmentId);
  };

  const closeAppointmentView = () => {
    setShowViewAppointment(false);
    setAppoimentId(0);
  };
  const closeQuickEntryView = () => {
    setShowQuickEntry(false);
    setAppoimentId(0);
  };

  const handleShowQuickEntry = (appointmentId: number) => {
    setShowQuickEntry(true);
    setAppoimentId(appointmentId);
  };

  const columns = [
    {
      title: "AppointmentID",
      dataIndex: "id",
    },
    {
      title: "Time",
      dataIndex: "timeSlot",
    },
    {
      title: "InTime",
      dataIndex: "inTime",
    },
    {
      title: "OutTime",
      dataIndex: "outTime",
    },
    {
      title: "PatientID",
      dataIndex: "patientId",
    },
    {
      title: "Doctor",
      dataIndex: "doctorName",
    },
    {
      title: "PatientName",
      dataIndex: "patientName",
    },
    {
      title: "Visit Purpose",
      dataIndex: "visitPurpose",
    },
    {
      title: "App Status",
      dataIndex: "appStatus",
    },
    {
      title: "Billing",
      dataIndex: "billing",
      render: (item: any) => {
        return (
          <div>
            <Button type="primary">Bill</Button>
          </div>
        );
      },
    },
    {
      title: "Next Visit",
      dataIndex: "nextVisit",
    },
    {
      title: "Actions",
      render: (item: any) => (
        <Space>
          <Tooltip title="Quick Entry">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleShowQuickEntry(item?.id)}
            />
          </Tooltip>
          <Tooltip title="View Patient">
            <Button
              type="default"
              icon={<EyeOutlined />}
              onClick={() => handleViewPatient(item?.patientId)}
            />
          </Tooltip>
          <Tooltip title="View Appointment">
            <Button
              type="dashed"
              icon={<CalendarOutlined />}
              onClick={() => handleViewAppointment(item?.id)}
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
          columns={columns}
          dataSource={appointmentsList}
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
      <div className="">
        {showViewPatient && (
          <ViewPatient
            viewPatientID={viewPatientId}
            closePatientView={closePatientView}
          />
        )}
      </div>
      <div className="">
        {showViewAppointment && (
          <ViewAppointment
            apppointmentId={appointmentId}
            closeAppointmentView={closeAppointmentView}
            doctorsList={doctorsList}
          />
        )}
      </div>
      <div className="">
        {showQuickEntry && (
          <QuickEntry
            apppointmentId={appointmentId}
            closeQuickEntryView={closeQuickEntryView}
            doctorsList={doctorsList}
          />
        )}
      </div>
    </div>
  );
};

export default Appointments;
