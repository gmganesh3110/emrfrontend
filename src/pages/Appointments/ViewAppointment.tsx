import { Modal, Form, Row, Col, Typography, Spin } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getaxios } from "../../services/AxiosService";

const { Text } = Typography;

interface ViewAppointmentProps {
  apppointmentId: number;
  closeAppointmentView: () => void;
  doctorsList: any[];
}

const ViewAppointment: React.FC<ViewAppointmentProps> = ({
  apppointmentId,
  closeAppointmentView,
}) => {
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getAppointDetails = async () => {
    try {
      const res: any = await getaxios(
        "http://localhost:3000/appointments/" + apppointmentId
      );
      setAppointmentData(res.data[0][0]);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAppointDetails();
  }, []);

  return (
    <div>
      <Modal
        width={1300}
        open={true}
        onCancel={closeAppointmentView}
        title="View Appointment"
        footer={null}
      >
        {loading ? (
          <div>
            <Spin fullscreen />
          </div>
        ) : (
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Appointment Date">
                  <Text>
                    {moment(appointmentData.appDate).format("DD/MM/YYYY")}
                  </Text>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Doctor">
                  <Text>{appointmentData?.doctorName}</Text>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Patient ID">
                  <Text>{appointmentData?.patientId || "N/A"}</Text>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Patient Name">
                  <Text>{appointmentData?.patientName || "N/A"}</Text>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Timeslot">
                  <Text>{appointmentData?.timeSlot || "N/A"}</Text>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Visit Purpose">
                  <Text>{appointmentData?.visitPurpose || "N/A"}</Text>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Status">
                  <Text>{appointmentData?.appStatus}</Text>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default ViewAppointment;
