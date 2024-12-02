import React, { useEffect, useState } from "react";
import { getaxios } from "../../services/AxiosService";
import {
  Col,
  Input,
  Modal,
  Row,
  Select,
  Form,
  DatePicker,
  InputNumber,
  message,
} from "antd";
import moment from "moment";
interface ViewPatientProps {
  viewPatientID: number;
  closePatientView: () => void;
}
const ViewPatient: React.FC<ViewPatientProps> = ({
  viewPatientID,
  closePatientView,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [patientData, setPatientData] = useState<any>(null);

  const [titles] = useState([
    { label: "Mr.", value: "Mr" },
    { label: "Mrs.", value: "Mrs" },
  ]);
  const [maritalStatuses] = useState([
    { label: "Single", value: "single" },
    { label: "Married", value: "married" },
    { label: "Widowed", value: "widowed" },
    { label: "Divorced", value: "divorced" },
  ]);
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
  const getAppointmentPatientDetails = async () => {
    try {
      const res: any = await getaxios(
        "http://localhost:3000/appointments/viewpatient/" + viewPatientID
      );
      setPatientData(res.data[0][0]);
      setLoading(false);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch patient data.");
    }
  };

  useEffect(() => {
    getAppointmentPatientDetails();
  }, []);

  return (
    <div>
      {" "}
      <Modal
        width={900} // Adjusted Modal Width
        open={true}
        footer={null}
        onCancel={closePatientView}
      >
        <div
          className="header-content"
          style={{ textAlign: "center", width: "100%" }}
        >
          <h2>Edit Patient Details</h2>
        </div>
        <div className="form-container">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Form
              onFinish={() => {}}
              layout="horizontal"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{
                ...patientData,
                dateOfBirth: moment(patientData.dateOfBirth), // Moment instance for DatePicker
              }}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                      { required: true, message: "Please select a title" },
                    ]}
                  >
                    <Select >
                      {titles.map((item) => (
                        <Select.Option key={item.value} value={item.value}>
                          {item.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      { required: true, message: "Please enter first name" },
                    ]}
                  >
                    <Input readOnly />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      { required: true, message: "Please enter last name" },
                    ]}
                  >
                    <Input readOnly />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="F/H Name"
                    name="relationName"
                    rules={[
                      { required: true, message: "Please enter relation name" },
                    ]}
                  >
                    <Input readOnly />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Date of Birth"
                    name="dateOfBirth"
                    rules={[
                      {
                        required: true,
                        message: "Please select date of birth",
                      },
                    ]}
                  >
                    <DatePicker
                    readOnly
                      format={"DD/MM/YYYY"}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[
                      { required: true, message: "Please select gender" },
                    ]}
                  >
                    <Select disabled>
                      {genders.map((item) => (
                        <Select.Option key={item.value} value={item.value}>
                          {item.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Mobile Number"
                    name="mobileNumber"
                    rules={[
                      { required: true, message: "Please enter mobile number" },
                    ]}
                  >
                    <Input readOnly />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Age"
                    name="age"
                    rules={[{ required: true, message: "Please enter age" }]}
                  >
                    <InputNumber readOnly style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter email" },
                      { type: "email", message: "Enter a valid email" },
                    ]}
                  >
                    <Input readOnly />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Blood Group"
                    name="bloodGroup"
                    rules={[
                      { required: true, message: "Please select blood group" },
                    ]}
                  >
                    <Select disabled>
                      {bloodGroups.map((item) => (
                        <Select.Option key={item.value} value={item.value}>
                          {item.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Marital Status"
                    name="maritalStatus"
                    rules={[
                      {
                        required: true,
                        message: "Please select marital status",
                      },
                    ]}
                  >
                    <Select disabled>
                      {maritalStatuses.map((item) => (
                        <Select.Option key={item.value} value={item.value}>
                          {item.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                      { required: true, message: "Please enter address" },
                    ]}
                  >
                    <Input.TextArea readOnly rows={2} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="City"
                    name="city"
                    rules={[{ required: true, message: "Please enter city" }]}
                  >
                    <Input readOnly />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="State"
                    name="state"
                    rules={[{ required: true, message: "Please enter state" }]}
                  >
                    <Input readOnly />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Country"
                    name="country"
                    rules={[
                      { required: true, message: "Please enter country" },
                    ]}
                  >
                    <Input readOnly />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ViewPatient;
