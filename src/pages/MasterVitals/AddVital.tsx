import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { postaxios } from "../../services/AxiosService";
import { useSelector } from "react-redux";

interface AddVitalsProps {
  closeModals: () => void;
}

const AddVitals: React.FC<AddVitalsProps> = ({ closeModals }) => {
  const [form] = Form.useForm();
  const User = useSelector((state: any) => state.user);
  const handleCancel = () => {
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    const res: any = await postaxios("http://localhost:3000/vitals", {...values,createdBy:User.id});
    if (res) {
      message.success("Vitals added successfully")
      closeModals()
    }
  };

  return (
    <div>
      <Modal
        width={700}
        title="Add Vital"
        open={true}
        onCancel={handleCancel}
        footer={null}
      >
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
            label="ShortCode"
            name="shortCode"
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
            name="displayName"
            rules={[
              { required: true, message: "Please enter the display name" },
              {
                max: 100,
                message: "Display name cannot exceed 100 characters",
              },
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
