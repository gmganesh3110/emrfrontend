import React from "react";
import { Button, Form, Input, message, Modal } from "antd";
import { postaxios } from "../../services/AxiosService";
import "./Paymode.css";
import { useSelector } from "react-redux";

interface AddPaymodeProps {
  handleClose: () => void;
}

const AddPaymode: React.FC<AddPaymodeProps> = ({
  handleClose,
}) => {
  const User = useSelector((state: any) => state.user);
  const handleAddPaymode = async (values: any) => {
    const res: any = await postaxios("http://localhost:3000/paymodes", {
      ...values,
      createdBy: User.id,
    });

    if (res?.status === 201) {
      message.success("Paymode added successfully");
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
            onFinish={handleAddPaymode}
            layout="vertical"
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              label="Paymode"
              name="paymode"
              rules={[
                { required: true, message: "Please enter the Paymode" },
              ]}
            >
              <Input placeholder="Enter Paymode (e.g., Card, Cash, Online, UPI)" />
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
                placeholder="Briefly describe the Paymode"
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

export default AddPaymode;
