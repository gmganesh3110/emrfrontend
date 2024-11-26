import React, { useEffect, useState } from "react";
import { getaxios, postaxios } from "../../services/AxiosService";
import {
  Button,
  Col,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Switch,
  Table,
  TimePicker,
} from "antd";
import moment from "moment";
import "./Timeslots.css";
import { useSelector } from "react-redux";
const { Option } = Select;

const Timeslots: React.FC = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [doctorId, setDoctorId] = useState<number | null>(null);
  const [showAddTimeslot, setShowAddTimeslot] = useState<boolean>(false);
  const [fromTime, setFromTime] = useState<string | null>(null);
  const [toTime, setToTime] = useState<string | null>(null);
  const [appointmentsCount, setAppointmentsCount] = useState<number>(0);
  const [timeslots, setTimeslots] = useState<any[]>([]);
  const [timeInterval, setTimeInterval] = useState(null);

  const User = useSelector((state: any) => state.user);

  // Table columns configuration
  const columns = [
    {
      title: "From",
      dataIndex: "startTime",
    },
    {
      title: "To",
      dataIndex: "endTime",
    },
    {
      title: "Appointments Count",
      dataIndex: "appointmentsCount",
    },
    ...[
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ].map((day) => ({
      title: day,
      dataIndex: day.toLowerCase(),
      render: (value: boolean, _: any, index: number) => (
        <Switch
          checked={value}
          onChange={(checked) =>
            handleDayToggle(day.toLowerCase(), index, checked)
          }
        />
      ),
    })),
  ];

  useEffect(() => {
    if (doctorId) {
      getDoctorTimeslots();
    }
  }, [doctorId]);

  useEffect(() => {
    getTimeSlotDoctors();
  }, []);

  // Fetch timeslots for a selected doctor
  const getDoctorTimeslots = async () => {
    try {
      const res: any = await getaxios(
        `http://localhost:3000/timeslots/${doctorId}`
      );
      if (res?.data?.length) {
        setTimeslots(res.data[0]);
      } else {
        message.warning("No timeslots found for the selected doctor.");
        setTimeslots([]);
      }
    } catch (error: any) {
      message.error(error.message || "Failed to load timeslots.");
    }
  };

  // Fetch all doctors
  const getTimeSlotDoctors = async () => {
    try {
      const res: any = await getaxios(
        "http://localhost:3000/timeslots/getdoctors"
      );
      if (res?.data?.length) {
        setDoctors(res.data[0]);
      } else {
        message.warning("No doctors available.");
      }
    } catch (error: any) {
      message.error(error.message || "Failed to load doctors.");
    }
  };

  const handleDayToggle = (day: string, index: number, checked: boolean) => {
    const updatedTimeslots = [...timeslots];
    updatedTimeslots[index][day] = checked;
    setTimeslots(updatedTimeslots);
  };

  const handleSave = async () => {
    console.log("Saving timeslots:", timeslots);
    const res: any = await postaxios(
      "http://localhost:3000/timeslots",
      timeslots
    );
    if (res) {
      message.success("Timeslots added successfully");
    } else {
      message.warning("Something went wrong");
    }
  };

  const handleAddTimeslot = () => {
    if (!fromTime || !toTime || appointmentsCount <= 0) {
      message.error("Please fill all fields correctly.");
      return;
    }

    const start = moment(fromTime, "HH:mm A");
    const end = moment(toTime, "HH:mm A");

    // Ensure the time difference is exactly 1 hour or less
    if (end.diff(start, "minutes") > 60 || end.diff(start, "minutes") <= 0) {
      message.error("Timeslot duration should be exactly 1 hour or less.");
      return;
    }

    // Check for overlap with existing timeslots
    const hasOverlap = timeslots.some((slot) => {
      const existingStart = moment(slot.startTime, "HH:mm A");
      const existingEnd = moment(slot.endTime, "HH:mm A");
      return start.isBefore(existingEnd) && end.isAfter(existingStart);
    });

    if (hasOverlap) {
      message.error("This timeslot overlaps with an existing one.");
      return;
    }

    const newTimeslot = {
      startTime: fromTime,
      endTime: toTime,
      appointmentsCount,
      timeInterval,
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      doctorId,
      createdBy: User.id,
    };

    setTimeslots([...timeslots, newTimeslot]);
    handleModalClose();
  };

  // Reset modal state
  const handleModalClose = () => {
    setShowAddTimeslot(false);
    setFromTime(null);
    setToTime(null);
    setAppointmentsCount(0);
  };

  return (
    <div>
      <div className="header-content">
        <h3>Doctor's Timeslot</h3>
      </div>

      {/* Timeslot Header Content */}
      <div
        className="timeslot-header-content"
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Select
          placeholder="Select Doctor"
          style={{ width: "300px" }}
          onChange={(val) => setDoctorId(val)}
        >
          {doctors.map((doctor: any) => (
            <Option key={doctor.id} value={doctor.id}>
              {doctor.doctorName}
            </Option>
          ))}
        </Select>
        <Button type="primary" onClick={() => setShowAddTimeslot(true)}>
          +Add Timeslot
        </Button>
      </div>

      {/* Timeslots Table */}
      <Table
        columns={columns}
        dataSource={timeslots}
        rowKey={(_, index: any) => index.toString()}
        pagination={false}
      />

      {/* Save Button */}
      <div
        className="save-btn-content"
        style={{ marginTop: "20px", textAlign: "right" }}
      >
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
      </div>

      {/* Add Timeslot Modal */}
      <Modal
        width={500}
        open={showAddTimeslot}
        onCancel={handleModalClose}
        title="Add Timeslot"
        okText="Add"
        onOk={handleAddTimeslot}
        bodyStyle={{
          padding: "20px",
        }}
      >
        <div>
          {/* From Time */}
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <label className="form-label">From Time</label>
              <TimePicker
                use12Hours
                format="h:mm A"
                value={fromTime ? moment(fromTime, "HH:mm A") : null}
                onChange={(val) =>
                  setFromTime(val ? val.format("HH:mm A") : null)
                }
                style={{ width: "100%" }}
              />
            </Col>
          </Row>

          {/* To Time */}
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <label className="form-label">To Time</label>
              <TimePicker
                use12Hours
                format="h:mm A"
                value={toTime ? moment(toTime, "HH:mm A") : null}
                onChange={(val) =>
                  setToTime(val ? val.format("HH:mm A") : null)
                }
                style={{ width: "100%" }}
              />
            </Col>
          </Row>

          {/* Appointments Count */}
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <label className="form-label">Appointments Count</label>
              <InputNumber
                min={1}
                value={appointmentsCount}
                onChange={(val) => setAppointmentsCount(val || 0)}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>

          {/* Time Interval */}
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <label className="form-label">Time Interval</label>
              <Select
                value={timeInterval}
                onChange={(val) => setTimeInterval(val)}
                placeholder="Select Interval"
                style={{ width: "100%" }}
              >
                <Option value="5">5 Minutes</Option>
                <Option value="10">10 Minutes</Option>
                <Option value="15">15 Minutes</Option>
              </Select>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default Timeslots;
