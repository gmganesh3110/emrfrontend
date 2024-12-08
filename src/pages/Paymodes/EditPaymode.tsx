import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import { getaxios, patchaxios } from "../../services/AxiosService";
import { useSelector } from "react-redux";
import "./Paymode.css";

interface EditPaymodeProps {
  handleClose: () => void;
  editId: number;
}

const EditPaymode: React.FC<EditPaymodeProps> = ({ handleClose, editId }) => {
  const User = useSelector((state: any) => state.user);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editId) {
      handleGetPaymode();
    }
  }, [editId]);

  const handleGetPaymode = async () => {
    setLoading(true);
    try {
      const res: any = await getaxios(
        `http://localhost:3000/paymodes/${editId}`
      );

      if (res?.status === 200) {
        const data = res.data[0][0];
        form.setFieldsValue({
          paymode: data.paymode,
          description: data.description,
        });
      } else {
        throw res;
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePaymode = async (values: any) => {
    setLoading(true);
    const res: any = await patchaxios(
      `http://localhost:3000/paymodes/${editId}`,
      { ...values, modifiedBy: User.id }
    );
    setLoading(false);
    if (res?.status === 200) {
      message.success("Paymode updated successfully");
      handleClose();
    } else {
      const errorMessage =
        res?.response?.data?.message ||
        "Something went wrong. Please try again.";
      message.error(errorMessage);
    }
  };

  return (
    <Modal open={true} onCancel={handleClose} footer={null}>
      <div>
        <Form
          form={form}
          onFinish={handleUpdatePaymode}
          layout="vertical"
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="Paymode"
            name="paymode"
            rules={[{ required: true, message: "Please enter the Paymode" }]}
          >
            <Input placeholder="Enter Paymode (e.g., Cash, Card, Online )" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Briefly describe the Paymode"
            />
          </Form.Item>
          <Form.Item className="align-right">
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default EditPaymode;
