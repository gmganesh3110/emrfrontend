import { Button, Form, Input } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddUserRole: React.FC = () => {
  const navigate = useNavigate();
  const handleAddRole = async (values: any) => {
    try {
      const res: any = await axios.post("http://localhost:3000/user-roles", values);
      if (res) {
        navigate("/userrole");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="header-content">
        <h2>Add User Role</h2>
      </div>
      <div>
        <Form
          onFinish={handleAddRole}
          layout="vertical"
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="Role Name"
            name="userRole"
            rules={[{ required: true, message: "Please enter the role name" }]}
          >
            <Input placeholder="Enter role name (e.g., Doctor, Nurse, Admin)" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea rows={4} placeholder="Briefly describe the role" />
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

export default AddUserRole;
