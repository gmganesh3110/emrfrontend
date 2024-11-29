import React, { useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { getaxios, putaxios } from "../../services/AxiosService";
import { useSelector } from "react-redux";

interface EditVitalProps {
  editId: number; // The ID of the vital to be edited
  closeModals: () => void;
}

const EditVital: React.FC<EditVitalProps> = ({ editId, closeModals }) => {
  const [form] = Form.useForm();
  const User = useSelector((state: any) => state.user);

  // Fetch the vital details for the given editId
  useEffect(() => {
    fetchVital();
  }, []);
  const fetchVital = async () => {
    try {
      const response: any = await getaxios(
        `http://localhost:3000/vitals/${editId}`
      );
      if (response) {
        form.setFieldsValue(response.data[0][0]); 
      }
    } catch (error) {
      message.error("Failed to load vital details.");
    }
  };
  const onFinish = async (values: any) => {
    try {
      const res = await putaxios(`http://localhost:3000/vitals/${editId}`, {
        ...values,
        modifiedBy: User.id,
      });
      if (res) {
        message.success("Vitals updated successfully");
        closeModals();
      }
    } catch (error) {
      message.error("Failed to update vital.");
    }
  };

  return (
    <div>
      <Modal
        width={700}
        title="Edit Vital"
        open={true}
        onCancel={closeModals}
        footer={null}
      >
        <Form
          form={form}
          name="editVitals"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: "",
            shortcode: "",
            displayName: "",
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
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditVital;
