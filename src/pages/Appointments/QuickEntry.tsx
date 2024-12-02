import React, { useEffect, useState } from "react";
import { Modal, Tabs, Form, Input, Button, Row, Col } from "antd";
import { getaxios } from "../../services/AxiosService";

const { TabPane } = Tabs;
interface QuickEntryProps {
  apppointmentId: number;
  closeQuickEntryView: () => void;
  doctorsList: any[];
}
const QuickEntry: React.FC<QuickEntryProps> = ({
  apppointmentId,
  closeQuickEntryView,
}) => {
  const [currentTab, setCurrentTab] = useState("vitals");
  const [vitalsList, setVitalsList] = useState([]);
  const [resultsList, setResultsList] = useState([]);
  useEffect(() => {
    getAppointmentVitals();
  }, []);
  useEffect(() => {
    getAppointmentResults();
  }, []);
  const getAppointmentVitals = async () => {
    const res: any = await getaxios(
      "http://localhost:3000/appointments/vitals/" + apppointmentId
    );
    setVitalsList(res.data[0]);
  };
  const getAppointmentResults = async () => {
    const res: any = await getaxios(
      "http://localhost:3000/appointments/results/" + apppointmentId
    );
    setResultsList(res.data[0]);
  };
  const onNext = () => setCurrentTab("testResults");
  const onSubmit = () => {
    console.log(apppointmentId, "AppointmentId");
  };

  return (
    <div>
      <Modal
        title="Quick Entry"
        open={true}
        onCancel={() => {
          closeQuickEntryView();
        }}
        footer={null}
        width={800}
      >
        <Tabs activeKey={currentTab} onChange={setCurrentTab}>
          {/* Vitals Tab */}
          <TabPane tab="Vitals" key="vitals">
            <Form layout="vertical">
              <Row gutter={16}>
                {vitalsList.map((vital: any) => (
                  <Col span={12} key={vital.id}>
                    <Form.Item
                      label={`${vital.displayName} (${vital.measurement})`}
                      name={vital.shortCode}
                      rules={[
                        {
                          required: true,
                          message: `Please enter ${vital.displayName.toLowerCase()}`,
                        },
                      ]}
                    >
                      <Input placeholder={`Enter ${vital.displayName}`} />
                    </Form.Item>
                  </Col>
                ))}
              </Row>
              <Button type="primary" onClick={onNext}>
                Next
              </Button>
            </Form>
          </TabPane>

          {/* Test Results Tab */}
          <TabPane tab="Test Results" key="testResults">
            <Form layout="vertical">
              <Row gutter={16}>
                {resultsList.map((vital: any) => (
                  <Col span={12} key={vital.id}>
                    <Form.Item
                      label={`${vital.displayName} (${vital.measurement})`}
                      name={vital.shortCode}
                      rules={[
                        {
                          required: true,
                          message: `Please enter ${vital.displayName.toLowerCase()}`,
                        },
                      ]}
                    >
                      <Input placeholder={`Enter ${vital.displayName}`} />
                    </Form.Item>
                  </Col>
                ))}
              </Row>
              <Button type="primary" onClick={onSubmit}>
                Submit
              </Button>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};

export default QuickEntry;
