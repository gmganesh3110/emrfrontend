import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
} from "antd";
import React, { useEffect, useState } from "react";
import "./DoctorList.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDoctor: React.FC = () => {
  const navigate = useNavigate();
  const [specializations, setSpecializations] = useState([]);
  useEffect(() => {
    getAllSpecializations();
  }, []);
  const getAllSpecializations = async () => {
    try {
      const res: any = await axios.get(
        "http://localhost:3000/users/allspecializations"
      );
      setSpecializations(res?.data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddDoctor = async (values: any) => {
    try {
      const res: any = await axios.post(
        "http://localhost:3000/users/adddoctor",
        values
      );
      if (res) {
        navigate("/doctors");
      }
    } catch (err) {}
  };
  return (
    <div>
      <div className="header-content">
        <h2>Add Doctor</h2>
      </div>
      <div className="form-container">
        <Form onFinish={handleAddDoctor}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "Please Enter First Name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Please Enter Last Name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Mobile Number"
                name="mobileNumber"
                rules={[
                  { required: true, message: "Please Enter Mobile Number" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please Enter Email" },
                  { type: "email", message: "Enter a valid Email" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please Enter Password" }]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please Confirm Password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Date of Birth"
                name="dateOfBirth"
                rules={[
                  { required: true, message: "Please Enter Date of Birth" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Age"
                name="age"
                rules={[{ required: true, message: "Please Enter Age" }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Specialization"
                name="specialization"
                rules={[
                  { required: true, message: "Please Select Specialization" },
                ]}
              >
                <Select placeholder="Select Specialization">
                  <Select.Option value="">Select Specialization </Select.Option>
                  {specializations.map((item: any) => (
                    <Select.Option value={item?.id}>
                      {item?.specialization}
                    </Select.Option>
                  ))}
                  {/* <Select.Option value="Cardiology">Cardiology</Select.Option>
                  <Select.Option value="Neurology">Neurology</Select.Option>
                  <Select.Option value="Orthopedics">Orthopedics</Select.Option>
                  <Select.Option value="Pediatrics">Pediatrics</Select.Option>
                  <Select.Option value="Radiology">Radiology</Select.Option>
                  <Select.Option value="Other">Other</Select.Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Years of Experience"
                name="experience"
                rules={[{ required: true, message: "Please Enter Experience" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Qualifications"
                name="qualifications"
                rules={[
                  { required: true, message: "Please Enter Qualifications" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: "Please Enter Address" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddDoctor;
