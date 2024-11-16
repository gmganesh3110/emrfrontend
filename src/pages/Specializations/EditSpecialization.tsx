import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import { getaxios, patchaxios } from "../../services/AxiosService";
import { useSelector } from "react-redux";
import "./Specialization.css";

interface AddSpecializationProps {
  handleClose: () => void;
  editId: number;
}

const AddSpecialization: React.FC<AddSpecializationProps> = ({
  handleClose,
  editId,
}) => {
  const User = useSelector((state: any) => state.user);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editId) {
      handleGetSpecialization();
    }
  }, [editId]);

  const handleGetSpecialization = async () => {
    setLoading(true);
    try {
      const res: any = await getaxios(
        `http://localhost:3000/specializations/${editId}`
      );

      if (res?.status === 200) {
        const data = res.data[0][0];
        form.setFieldsValue({
          specialization: data.specialization,
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

  const handleUpdateSpecialization = async (values: any) => {
    setLoading(true);
    const res: any = await patchaxios(
      `http://localhost:3000/specializations/${editId}`,
      { ...values, modifiedBy: User.id }
    );
    setLoading(false);
    if (res?.status === 200) {
      message.success("Specialization updated successfully");
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
          onFinish={handleUpdateSpecialization}
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

export default AddSpecialization;
