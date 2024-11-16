import React, { useEffect, useState } from "react";
import {
  Select,
  TimePicker,
  Button,
  Table,
  Row,
  Col,
  Checkbox,
  message,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";

const { RangePicker } = TimePicker;

const TimeSlots: React.FC = () => {
  const [doctor, setDoctor] = useState<number | null>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [weeklySlots, setWeeklySlots] = useState<any>({});
  const [doctorTimeSlotData, setDoctorTimeSlotData] = useState<any>([]);
// 
  const daysOfWeek = [
    { id: 1, name: "Monday" },
    { id: 2, name: "Tuesday" },
    { id: 3, name: "Wednesday" },
    { id: 4, name: "Thursday" },
    { id: 5, name: "Friday" },
    { id: 6, name: "Saturday" },
    { id: 7, name: "Sunday" },
  ];

  const getTimeSlotDataforDoctor = async (doctorId: number) => {
    try {
      const res: any = await axios.get(
        `http://localhost:3000/timeslots/${doctorId}`
      );
      setDoctorTimeSlotData(res?.data[0]);
      const updatedSlots: any = {};
      res?.data[0]?.forEach((timeslot: any) => {
        const day = daysOfWeek.find((day) => day.id === timeslot.day)?.name;
        if (day) {
          if (!updatedSlots[day]) {
            updatedSlots[day] = {
              active: true,
              timeRanges: [],
            };
          }
          updatedSlots[day].timeRanges.push([
            moment(timeslot.startTime, "hh:mm A"),
            moment(timeslot.endTime, "hh:mm A"),
          ]);
        }
      });

      setWeeklySlots(updatedSlots);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  const getAllDoctors = async () => {
    try {
      const res: any = await axios.get(
        "http://localhost:3000/users/getalldoctors"
      );
      setDoctors(res?.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddTimeRange = (day: any) => {
    setWeeklySlots((prev: any) => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeRanges: [...(prev[day]?.timeRanges || []), []],
      },
    }));
  };

  const handleDeleteTimeRange = (day: any, index: any) => {
    setWeeklySlots((prev: any) => {
      const updatedRanges =
        prev[day]?.timeRanges.filter((_: any, i: any) => i !== index) || [];
      return {
        ...prev,
        [day]: {
          ...prev[day],
          timeRanges: updatedRanges,
        },
      };
    });
  };

  const handleSave = async (dayName: any) => {
      if (!doctor) {
        message.error("Please select a doctor.");
        return;
      }
  
      const dayObj = daysOfWeek.find((d) => d.name === dayName);
      const dayId = dayObj?.id;
      if (!dayId) {
        message.error("Invalid day selected.");
        return;
      }
  
      const timeRanges = weeklySlots[dayName]?.timeRanges || [];
      if (!timeRanges.every((range: any) => range.length === 2)) {
        message.error(`Please complete all time ranges for ${dayName}.`);
        return;
      }
  
      // Check for conflicts
      if (hasConflict(timeRanges)) {
        message.error(`Time ranges on ${dayName} have conflicts. Please adjust.`);
        return;
      }
  
      // Normalize the time ranges and map ids for existing slots
      const formattedRanges = timeRanges.map((range: any) => {
        const startTimeISO = range[0];
        const endTimeISO = range[1];
  
        // Format the ISO times to "hh:mm A" for comparison
        const formattedStartTime = moment(startTimeISO).format("hh:mm A");
        const formattedEndTime = moment(endTimeISO).format("hh:mm A");
  
        // Find existing slot in doctorTimeSlotData based on formatted time
        const existingSlot = doctorTimeSlotData.find(
          (slot: any) =>
            slot.day === dayId &&
            slot.doctorId === doctor &&
            moment(slot.startTime, "hh:mm A").format("hh:mm A") === formattedStartTime &&
            moment(slot.endTime, "hh:mm A").format("hh:mm A") === formattedEndTime
        );
  
        return {
          doctorId: doctor,
          day: dayId,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          id: existingSlot ? existingSlot.id : null, // Include id if found, else null
        };
      });
  
      try {
        // Call API to save (insert/update) the timeslots
        await axios.post("http://localhost:3000/timeslots", formattedRanges);
        message.success(`${dayName}'s time slots have been saved to the database!`);
      } catch (error) {
        message.error(`Failed to save ${dayName}'s time slots. Please try again.`);
        console.error(error);
      }
  };
  

  const handleRangeChange = (day: any, index: any, values: any) => {
    setWeeklySlots((prev: any) => {
      const updatedRanges = [...(prev[day]?.timeRanges || [])];
      updatedRanges[index] = values;
      return {
        ...prev,
        [day]: {
          ...prev[day],
          timeRanges: updatedRanges,
        },
      };
    });
  };

  const hasConflict = (ranges: any[]) => {
    const sortedRanges = ranges
      .filter((range) => range.length === 2)
      .sort((a, b) => a[0] - b[0]);
    for (let i = 0; i < sortedRanges.length - 1; i++) {
      if (sortedRanges[i][1] > sortedRanges[i + 1][0]) {
        return true;
      }
    }
    return false;
  };

  const weeklyColumns = [
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
      render: (day: any) => <strong>{day}</strong>,
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (_: any, record: any) => (
        <Checkbox
          checked={record.active}
          onChange={(e) =>
            setWeeklySlots((prev: any) => ({
              ...prev,
              [record.day]: {
                ...prev[record.day],
                active: e.target.checked,
                timeRanges: prev[record.day]?.timeRanges || [],
              },
            }))
          }
        />
      ),
    },
    {
      title: "Configure Time Slots",
      dataIndex: "configure",
      key: "configure",
      render: (_: any, record: any) =>
        record.active ? (
          <div>
            {(weeklySlots[record.day]?.timeRanges || []).map(
              (range: any, index: any) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <RangePicker
                    format="hh:mm A"
                    minuteStep={5}
                    value={range.length ? range : null}
                    onChange={(values) =>
                      handleRangeChange(record.day, index, values)
                    }
                    style={{ flex: 1 }}
                  />
                  <Button
                    icon={<DeleteOutlined />}
                    type="link"
                    danger
                    onClick={() => handleDeleteTimeRange(record.day, index)}
                  />
                </div>
              )
            )}
            <Button
              type="dashed"
              onClick={() => handleAddTimeRange(record.day)}
              style={{ width: "100%", marginBottom: "1rem" }}
            >
              + Add Time Range
            </Button>
            <Button
              type="primary"
              onClick={() => handleSave(record.day)}
              style={{ width: "100%" }}
            >
              Save {record.day} Time Slots
            </Button>
          </div>
        ) : (
          <span style={{ color: "#bbb" }}>Inactive</span>
        ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Select Doctor and Configure Weekly Time Slots</h2>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Select
            placeholder="Select Doctor"
            style={{ width: "100%" }}
            onChange={(value) => {
              setDoctor(value);
              getTimeSlotDataforDoctor(value);
            }}
          >
            {doctors.map((doc: any) => (
              <Select.Option key={doc.id} value={doc.id}>
                {doc.firstName}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>

      <h3 style={{ marginTop: "20px" }}>Configure Slots for Each Day</h3>
      <Table
        columns={weeklyColumns}
        dataSource={daysOfWeek.map((day: any) => ({
          day: day.name,
          id: day.id,
          active: weeklySlots[day.name]?.active || false,
          timeRanges: weeklySlots[day.name]?.timeRanges || [],
        }))}
        rowKey="id"
        pagination={false}
        bordered
      />
    </div>
  );
};

export default TimeSlots;
