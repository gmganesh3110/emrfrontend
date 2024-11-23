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
} from "antd";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

interface AddPatientProps {
  closeAddEditPatient: () => void;
}

const AddPatient: React.FC<AddPatientProps> = ({ closeAddEditPatient }) => {
  const navigate = useNavigate();
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

  const handleAddPatient = async (values: any) => {
    try {
      const res: any = await axios.post("http://localhost:3000/patients", {
        ...values,
        dateOfBirth: moment(values.dateOfBirth).format("YYYY-MM-DD"),
        createdBy: User.id,
      });
      if (res) {
        navigate("/patients");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Modal
        width={900} // Adjusted Modal Width for a more compact layout
        open={true}
        footer={null}
        onCancel={closeAddEditPatient}
      >
        <div className="header-content" style={{ textAlign: "center",width:'100%' }}>
          <h2>Patient Registration</h2>
        </div>
        <div className="form-container">
          <Form
            onFinish={handleAddPatient}
            layout="horizontal"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Title"
                  name="title"
                  rules={[{ required: true, message: "Please select a title" }]}
                >
                  <Select placeholder="Select Title">
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
                    { required: true, message: "Please Enter First Name" },
                  ]}
                >
                  <Input autoComplete="off" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    { required: true, message: "Please Enter Last Name" },
                  ]}
                >
                  <Input autoComplete="off" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="F/H Name"
                  name="relationName"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Father's or Husband's Name",
                    },
                  ]}
                >
                  <Input autoComplete="off" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Date of Birth"
                  name="dateOfBirth"
                  rules={[
                    { required: true, message: "Please Enter Date of Birth" },
                  ]}
                >
                  <DatePicker format={"DD/MM/YYYY"} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Gender"
                  name="gender"
                  rules={[{ required: true, message: "Please Select Gender" }]}
                >
                  <Select placeholder="Select Gender">
                    {genders.map((item: any) => (
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
                    { required: true, message: "Please Enter Mobile Number" },
                  ]}
                >
                  <Input autoComplete="off" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Age"
                  name="age"
                  rules={[{ required: true, message: "Please Enter Age" }]}
                >
                  <InputNumber autoComplete="off" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please Enter Email" },
                    { type: "email", message: "Enter a valid Email" },
                  ]}
                >
                  <Input autoComplete="off" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Blood Group"
                  name="bloodGroup"
                  rules={[
                    { required: true, message: "Please Select Blood Group" },
                  ]}
                >
                  <Select placeholder="Select Blood Group">
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
                    { required: true, message: "Please Select Marital Status" },
                  ]}
                >
                  <Select placeholder="Select Marital Status">
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
                  rules={[{ required: true, message: "Please Enter Address" }]}
                >
                  <Input.TextArea rows={2} autoComplete="off" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="City"
                  name="city"
                  rules={[{ required: true, message: "Please Enter City" }]}
                >
                  <Input autoComplete="off" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="State"
                  name="state"
                  rules={[{ required: true, message: "Please Enter State" }]}
                >
                  <Input autoComplete="off" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Country"
                  name="country"
                  rules={[{ required: true, message: "Please Enter Country" }]}
                >
                  <Input autoComplete="off" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default AddPatient;
