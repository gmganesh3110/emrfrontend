import React, { useState } from "react";
import { Row, Col, Select, Input, DatePicker, Button, Card, Table } from "antd";

const Appointments: React.FC = () => {
  const [doctorList, setDoctorList] = useState([
    { label: "Dr. John Doe", value: "1" },
    { label: "Dr. Jane Smith", value: "2" },
    { label: "Dr. Alice Brown", value: "3" },
  ]);

  const [appointmentData, setAppointmentData] = useState([
    { 
      key: "1", 
      time: "10:00 AM", 
      inTime: "10:05 AM", 
      outTime: "10:30 AM", 
      patientId: "P001", 
      patientName: "John Doe", 
      visitPurpose: "General Checkup", 
      appStatus: "Booked", 
      billing: "$100", 
      nextVisit: "2024-12-01",
      actions: "View Details"
    },
    { 
      key: "2", 
      time: "11:00 AM", 
      inTime: "11:10 AM", 
      outTime: "11:45 AM", 
      patientId: "P002", 
      patientName: "Jane Smith", 
      visitPurpose: "Follow-up Consultation", 
      appStatus: "Review", 
      billing: "$120", 
      nextVisit: "2024-12-15",
      actions: "View Details"
    },
    { 
      key: "3", 
      time: "02:00 PM", 
      inTime: "02:05 PM", 
      outTime: "02:25 PM", 
      patientId: "P003", 
      patientName: "Alice Brown", 
      visitPurpose: "Emergency Consultation", 
      appStatus: "In Progress", 
      billing: "$200", 
      nextVisit: "2024-12-20",
      actions: "View Details"
    },
    { 
      key: "4", 
      time: "03:00 PM", 
      inTime: "03:05 PM", 
      outTime: "03:30 PM", 
      patientId: "P004", 
      patientName: "Bob Martin", 
      visitPurpose: "Routine Checkup", 
      appStatus: "Cancelled", 
      billing: "$80", 
      nextVisit: "2025-01-01",
      actions: "View Details"
    },
  ]);

  const [searchFilters, setSearchFilters] = useState({
    doctor: undefined,
    patientName: "",
    patientId: "",
    date: null,
  });

  const handleFilterChange = (key: string, value: any) => {
    setSearchFilters({ ...searchFilters, [key]: value });
  };

  const handleSearch = () => {
    console.log("Search filters", searchFilters);
  };

  const columns = [
    { 
      title: 'Time', 
      dataIndex: 'time', 
      key: 'time', 
    },
    { 
      title: 'In Time', 
      dataIndex: 'inTime', 
      key: 'inTime',
    },
    { 
      title: 'Out Time', 
      dataIndex: 'outTime', 
      key: 'outTime', 
    },
    { 
      title: 'Patient ID', 
      dataIndex: 'patientId', 
      key: 'patientId',
    },
    { 
      title: 'Patient Name', 
      dataIndex: 'patientName', 
      key: 'patientName',
    },
    { 
      title: 'Visit Purpose', 
      dataIndex: 'visitPurpose', 
      key: 'visitPurpose',
    },
    { 
      title: 'App Status', 
      dataIndex: 'appStatus', 
      key: 'appStatus', 
    },
    { 
      title: 'Billing', 
      dataIndex: 'billing', 
      key: 'billing',
    },
    { 
      title: 'Next Visit', 
      dataIndex: 'nextVisit', 
      key: 'nextVisit', 
    },
    { 
      title: 'Actions', 
      dataIndex: 'actions', 
      key: 'actions', 
      render: (text: string) => <Button type="link">{text}</Button>,
    },
  ];

  const statusCounts = {
    Booked: appointmentData.filter(status => status.appStatus === "Booked").length,
    Review: appointmentData.filter(status => status.appStatus === "Review").length,
    "In Progress": appointmentData.filter(status => status.appStatus === "In Progress").length,
    Cancelled: appointmentData.filter(status => status.appStatus === "Cancelled").length,
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={24}>
        {/* Left Section - Search Filters */}
        <Col span={16}>
          <Card title="Search Filters" bordered={false}>
            <Row gutter={16}>
              <Col span={12}>
                <DatePicker
                  value={searchFilters.date}
                  onChange={(date) => handleFilterChange("date", date)}
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                  placeholder="Select Date"
                />
              </Col>
              <Col span={12}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Select Doctor"
                  value={searchFilters.doctor}
                  onChange={(value) => handleFilterChange("doctor", value)}
                >
                  {doctorList.map((doctor) => (
                    <Select.Option key={doctor.value} value={doctor.value}>
                      {doctor.label}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col span={12}>
                <Input
                  placeholder="Enter Patient Name"
                  value={searchFilters.patientName}
                  onChange={(e) =>
                    handleFilterChange("patientName", e.target.value)
                  }
                  style={{ width: "100%" }}
                />
              </Col>
              <Col span={12}>
                <Input
                  placeholder="Enter Patient ID"
                  value={searchFilters.patientId}
                  onChange={(e) =>
                    handleFilterChange("patientId", e.target.value)
                  }
                  style={{ width: "100%" }}
                />
              </Col>

              <Col span={8} style={{ marginTop: "16px" }}>
                <Button
                  type="primary"
                  onClick={handleSearch}
                  style={{ width: "100%" }}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Right Section - Appointment Status Overview */}
        <Col span={8}>
          <Card title="Appointment Status Overview" bordered={false}>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td>Booked</td>
                  <td>{statusCounts.Booked}</td>
                  <td>Review</td>
                  <td>{statusCounts.Review}</td>
                </tr>
                <tr>
                  <td>In Progress</td>
                  <td>{statusCounts["In Progress"]}</td>
                  <td>Cancelled</td>
                  <td>{statusCounts.Cancelled}</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </Col>
      </Row>

      {/* Table displaying appointment data */}
      <Table columns={columns} dataSource={appointmentData} style={{ marginTop: "20px" }} />
    </div>
  );
};

export default Appointments;
