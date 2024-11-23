import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Modal,
  message,
} from "antd";

import moment from "moment";
import { getaxios, patchaxios } from "../../services/AxiosService";
import { useSelector } from "react-redux";

interface EditPatientProps {
  closeAddEditPatient: () => void;
  editId: number;
}

const EditPatient: React.FC<EditPatientProps> = ({
  closeAddEditPatient,
  editId,
}) => {
  const [patientData, setPatientData] = useState<any>(null); 
  const [loading, setLoading] = useState<boolean>(true); 
  const User = useSelector((state: any) => state.user);

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

  // Fetch existing patient data
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response: any = await getaxios(
          `http://localhost:3000/patients/${editId}`
        );
        setPatientData(response.data[0][0]);
        setLoading(false);
      } catch (err) {
        console.error(err);
        message.error("Failed to fetch patient data.");
      }
    };

    fetchPatient();
  }, [editId]);

  const handleUpdatePatient = async (values: any) => {
    try {
      await patchaxios(`http://localhost:3000/patients/${editId}`, {
        ...values,
        dateOfBirth: moment(values.dateOfBirth).format("YYYY-MM-DD"),
        modifiedBy:User.id
      });
      message.success("Patient updated successfully!");
      closeAddEditPatient();
    } catch (err) {
      console.error(err);
      message.error("Failed to update patient.");
    }
  };

  return (
    <div>
      <Modal
        width={900} // Adjusted Modal Width
        open={true}
        footer={null}
        onCancel={closeAddEditPatient}
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
              onFinish={handleUpdatePatient}
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
                    <Select>
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
                    <Input />
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
                    <Input />
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
                    <Input />
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
                    <Select>
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
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Age"
                    name="age"
                    rules={[{ required: true, message: "Please enter age" }]}
                  >
                    <InputNumber style={{ width: "100%" }} />
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
                    <Input />
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
                    <Select>
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
                    <Select>
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
                    <Input.TextArea rows={2} />
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
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="State"
                    name="state"
                    rules={[{ required: true, message: "Please enter state" }]}
                  >
                    <Input />
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
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={24} style={{ textAlign: "right" }}>
                  <Button type="primary" htmlType="submit">
                    Update
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default EditPatient;
