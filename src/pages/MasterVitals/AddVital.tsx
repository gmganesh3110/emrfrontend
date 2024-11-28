import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";

const AddVitals: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset the form when the modal is closed
  };

  const onFinish = (values: any) => {
    console.log("Form Values:", values);
    // Add your logic here to save the data (e.g., API call)
    handleCancel(); // Close the modal after submission
  };

  return (
    <div>
      {/* Trigger Button to Open Modal */}
      <Button type="primary" onClick={showModal}>
        Add Vital
      </Button>

      {/* Modal Component */}
      <Modal
        title="Add Vital"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // We'll use the form's button instead of modal's default footer
      >
        {/* Form Inside the Modal */}
        <Form
          form={form}
          name="addVitals"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: "",
            shortcode: "",
            displayname: "",
            measurement: "",
            description: "",
          }}
        >
          {/* Name Field */}
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the vital name" },
              { max: 50, message: "Name cannot exceed 50 characters" },
            ]}
          >
            <Input placeholder="Enter the internal name (e.g., body_temperature)" />
          </Form.Item>

          {/* Shortcode Field */}
          <Form.Item
            label="Shortcode"
            name="shortcode"
            rules={[
              { required: true, message: "Please enter a shortcode" },
              { max: 10, message: "Shortcode cannot exceed 10 characters" },
            ]}
          >
            <Input placeholder="Enter a shortcode (e.g., BT)" />
          </Form.Item>

          {/* Display Name Field */}
          <Form.Item
            label="Display Name"
            name="displayname"
            rules={[
              { required: true, message: "Please enter the display name" },
              { max: 100, message: "Display name cannot exceed 100 characters" },
            ]}
          >
            <Input placeholder="Enter the display name (e.g., Body Temperature)" />
          </Form.Item>

          {/* Measurement Field */}
          <Form.Item
            label="Measurement"
            name="measurement"
            rules={[
              { required: true, message: "Please enter the measurement unit" },
              { max: 50, message: "Measurement cannot exceed 50 characters" },
            ]}
          >
            <Input placeholder="Enter the measurement unit (e.g., Celsius °C)" />
          </Form.Item>

          {/* Description Field */}
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter a description" },
              { max: 500, message: "Description cannot exceed 500 characters" },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter a brief description (e.g., Monitors fever, infection, etc.)"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddVitals;
