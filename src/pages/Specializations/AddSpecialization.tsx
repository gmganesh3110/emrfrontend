import React from "react";
import { Button, Form, Input, message, Modal } from "antd";
import { postaxios } from "../../services/AxiosService";
import "./Specialization.css";
import { useSelector } from "react-redux";

interface AddSpecializationProps {
  handleClose: () => void;
}

const AddSpecialization: React.FC<AddSpecializationProps> = ({
  handleClose,
}) => {
  const User = useSelector((state: any) => state.user);
  const handleAddSpecialization = async (values: any) => {
    const res: any = await postaxios("http://localhost:3000/specializations", {
      ...values,
      createdBy: User.id,
    });

    if (res?.status === 201) {
      message.success("Specialization added successfully");
      handleClose();
    } else {
      const errorMessage =
        res?.response?.data?.message ||
        "Something went wrong. Please try again.";
      message.error(errorMessage);
    }
  };

  return (
    <div>
      <Modal open={true} onCancel={handleClose} footer={null}>
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
              rules={[
                { required: true, message: "Please enter a description" },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Briefly describe the Specialization"
              />
            </Form.Item>
            <Form.Item className="align-right">
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

export default AddSpecialization;
