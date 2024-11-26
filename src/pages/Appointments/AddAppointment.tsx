import { Form, Modal, Row, Col, Select, Input, Button, DatePicker } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { getaxios, postaxios } from "../../services/AxiosService";
import { useSelector } from "react-redux";
import timeStamps from "../../constants/Timeslots";

const { Option } = Select;

interface AddAppointmentProps {
  closeAppointment: () => void;
  doctorsList: any[];
}

const AddAppointment: React.FC<AddAppointmentProps> = ({
  closeAppointment,
  doctorsList,
}) => {
  const [form] = Form.useForm();
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [visitPurposes, setVisitPurposes] = useState<string[]>([
    "Consultation",
    "Follow-up",
    "Emergency",
  ]);
  const [date, setDate] = useState<moment.Moment | null>(moment());
  const [patientId, setPatientId] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");
  const [doctorId, setDoctorId] = useState<number>();
  const [timeslotId, setTimeslotId] = useState<number>();
  const [timeslotIntervalId, setTimeslotIntervalId] = useState<number>();
  const User = useSelector((state: any) => state.user);

  const getPatientDetails = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      try {
        const res: any = await getaxios(
          `http://localhost:3000/appointments/patients/${patientId}`
        );
        if (res && res.data && res.data.length > 0) {
          setPatientName(res.data[0][0]?.patientName || "");
          form.setFieldsValue({
            patientId: patientId,
            patientName: res.data[0][0]?.patientName,
          });
        } else {
          setPatientName("");
          console.error("No patient details found");
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    }
  };

  const handleSelectTimeslot = (e: any) => {
    const selectedSlot: any = timeSlots.find(
      (item: any) => (item.intervalId = e)
    );
    setTimeslotId(selectedSlot.timeslotId);
    setTimeslotIntervalId(selectedSlot?.intervalId);
  };

  const onFinish = async (values: any) => {
    let obj = {
      ...values,
      appointmentDate: moment(values.appointmentDate).format("YYYY-MM-DD"),
      doctorId,
      timeslotId,
      timeslotIntervalId,
      createdBy: User.id,
    };
    const res: any = await postaxios(
      "http://localhost:3000/appointments/create",
      obj
    );
    if (res) {
      closeAppointment();
    }
  };

  return (
    <Modal
      width={1300}
      open={true}
      onCancel={closeAppointment}
      title="New Appointment"
      footer={null}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={16}>
          {/* Date Picker */}
          <Col span={12}>
            <Form.Item
              label="Select Date"
              name="appointmentDate"
              rules={[{ required: true, message: "Please select a date" }]}
              initialValue={date} // Set default value for the date
            >
              <DatePicker
                value={date} // Set current date as the value
                onChange={(date) => setDate(date)} // Update the date state
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                placeholder="Select Date"
              />
            </Form.Item>
          </Col>

          {/* Select Doctor */}
          <Col span={12}>
            <Form.Item
              label="Select Doctor"
              name="doctorId"
              rules={[{ required: true, message: "Please select a doctor" }]}
            >
              <Select
                placeholder="Select Doctor"
                onChange={(e) => setDoctorId(e)}
              >
                {doctorsList.map((doctor) => (
                  <Option key={doctor.id} value={doctor.id}>
                    {doctor.doctorName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Patient ID */}
          <Col span={12}>
            <Form.Item
              label="Patient ID"
              name="patientId"
              rules={[
                { required: true, message: "Please enter the patient ID" },
              ]}
            >
              <Input
                onKeyUp={getPatientDetails}
                onChange={(e) => setPatientId(e.target.value)}
                placeholder="Enter Patient ID"
              />
            </Form.Item>
          </Col>

          {/* Patient Name */}
          <Col span={12}>
            <Form.Item
              label="Patient Name"
              name="patientName"
              rules={[
                { required: true, message: "Please enter the patient name" },
              ]}
            >
              <Input value={patientName} placeholder="Enter Patient Name" />
            </Form.Item>
          </Col>

          {/* Select Timeslot */}
          <Col span={12}>
            <Form.Item
              label="Select Timeslot"
              name="timeSlot"
              rules={[{ required: true, message: "Please select a timeslot" }]}
            >
              <Select
                placeholder="Select Timeslot"
                onChange={(e: any) => {
                  handleSelectTimeslot(e);
                }}
              >
                {timeStamps?.map((slot) => (
                  <Option key={slot?.time} value={slot?.time}>
                    {slot?.time}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Select Visit Purpose */}
          <Col span={12}>
            <Form.Item
              label="Visit Purpose"
              name="visitPurpose"
              rules={[
                { required: true, message: "Please select the visit purpose" },
              ]}
            >
              <Select placeholder="Select Visit Purpose">
                {visitPurposes?.map((purpose, index) => (
                  <Option key={index} value={purpose}>
                    {purpose}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Submit Button */}
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddAppointment;
