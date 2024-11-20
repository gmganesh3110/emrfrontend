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
import { getaxios, patchaxios } from "../../services/AxiosService";
import { useSelector } from "react-redux";
import moment from "moment";

interface EditDoctorProps {
  closeAddEditDoctor: () => void;
  doctorId: number;
}

const EditDoctor: React.FC<EditDoctorProps> = ({
  closeAddEditDoctor,
  doctorId,
}) => {
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const User = useSelector((state: any) => state.user);
  const [form] = Form.useForm();

  useEffect(() => {
    getAllSpecializations();
    if (doctorId) {
      handleGetDoctor();
    }
  }, []);

  const getAllSpecializations = async () => {
    try {
      const res: any = await getaxios(
        "http://localhost:3000/users/allspecializations"
      );
      setSpecializations(res?.data[0] || []);
    } catch (err) {
      message.error("Failed to load specializations");
    }
  };

  const handleGetDoctor = async () => {
    setLoading(true);
    try {
      const res: any = await getaxios(
        `http://localhost:3000/users/doctor/${doctorId}`
      );
      if (res?.status === 200) {
        const data = res.data[0][0];
        form.setFieldsValue({
          firstName: data.firstName,
          lastName: data.lastName,
          mobileNumber: data.mobileNumber,
          email: data.email,
          dateOfBirth: moment(data.dateOfBirth,'YYYY-MM-DD') ,
          age: data.age,
          specialization: data.specialization,
          experience: data.experience,
          qualifications: data.qualifications,
          address: data.address,
        });
      } else {
        throw new Error("Failed to fetch doctor details");
      }
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Failed to fetch doctor details"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDoctor = async (values: any) => {
    try {
      const res: any = await patchaxios(
        `http://localhost:3000/users/updatedoctor/${doctorId}`,
        { ...values, doctorId, modifiedBy: User.id }
      );
      if (res?.status === 200) {
        message.success("Doctor updated successfully");
        closeAddEditDoctor();
      } else {
        throw new Error("Failed to update doctor");
      }
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Failed to update doctor"
      );
    }
  };

  return (
    <Modal width={1000} open={true} footer={null} onCancel={closeAddEditDoctor}>
      <div className="header-content" style={{ textAlign: "center" }}>
        <h2>Edit Doctor</h2>
      </div>
      <div className="form-container">
        <Form
          form={form}
          onFinish={handleUpdateDoctor}
          layout="horizontal"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "Please enter first name" }]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Please enter last name" }]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Mobile Number"
                name="mobileNumber"
                rules={[
                  { required: true, message: "Please enter mobile number" },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Enter a valid email" },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Date of Birth"
                name="dateOfBirth"
                rules={[
                  { required: true, message: "Please select date of birth" },
                ]}
              >
                <DatePicker  style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Age"
                name="age"
                rules={[{ required: true, message: "Please enter age" }]}
              >
                <InputNumber autoComplete="off" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Specialization"
                name="specialization"
                rules={[
                  { required: true, message: "Please select specialization" },
                ]}
              >
                <Select placeholder="Select Specialization">
                  {specializations.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.specialization}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Years of Experience"
                name="experience"
                rules={[{ required: true, message: "Please enter experience" }]}
              >
                <InputNumber
                  autoComplete="off"
                  min={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Qualifications"
                name="qualifications"
                rules={[
                  { required: true, message: "Please enter qualifications" },
                ]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: "Please enter address" }]}
              >
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default EditDoctor;
