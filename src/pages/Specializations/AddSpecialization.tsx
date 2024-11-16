import React from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddSpecialization: React.FC = () => {
  const navigate = useNavigate();
  const handleAddSpecialization = async (values: any) => {
    console.log(values);
    const res: any = await axios.post(
      "http://localhost:3000/specializations",
      values
    );
    if (res) {
      navigate("/specializations");
    }
  };
  return (
    <div className="">
      <div>
        <Form
          onFinish={handleAddSpecialization}
          layout="vertical"
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="Specialization"
            name="specialization"
            rules={[
              { required: true, message: "Please enter the Specialization" },
            ]}
          >
            <Input placeholder="Enter Specialization (e.g., Cardiology, Neurology, Orthopedics)" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Briefly describe the Specialization"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddSpecialization;
