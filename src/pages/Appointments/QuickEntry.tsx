import React, { useEffect, useState } from "react";
import { Modal, Tabs, Form, Input, Button, Row, Col, message } from "antd";
import { getaxios, postaxios } from "../../services/AxiosService"; // Assuming you have a postaxios service
import { useSelector } from "react-redux";

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
  const [form] = Form.useForm();
  const user = useSelector((state: any) => state?.user);
  useEffect(() => {
    getAppointmentVitals();
    getAppointmentResults();
  }, []);

  const getAppointmentVitals = async () => {
    try {
      const res: any = await getaxios(
        `http://localhost:3000/appointments/vitals/${apppointmentId}`
      );
      setVitalsList(res.data[0]);
    } catch (err) {
      message.error("Failed to fetch vitals data.");
    }
  };

  const getAppointmentResults = async () => {
    try {
      const res: any = await getaxios(
        `http://localhost:3000/appointments/results/${apppointmentId}`
      );
      setResultsList(res.data[0]);
    } catch (err) {
      message.error("Failed to fetch test results data.");
    }
  };

  const handleFinalSubmit = async (values: any) => {
    debugger;
    const vitalsData = vitalsList.map((vital: any) => ({
      appointmentId: apppointmentId,
      vitalId: vital.id,
      vitalValue: values[vital.shortCode],
      createdBy: user?.id,
    }));

    const resultsData = resultsList.map((result: any) => ({
      appointmentId: apppointmentId,
      resultId: result.id,
      resultValue: values[result.shortCode],
      createdBy: user?.id,
    }));

    const payload = {
      vitals: vitalsData,
      results: resultsData,
    };
    try {
      await postaxios(`http://localhost:3000/appointments/save`, payload);
      message.success("Data submitted successfully.");
      closeQuickEntryView();
    } catch (err) {
      message.error("Failed to submit data.");
    }
  };

  return (
    <div>
      <Modal
        title="Quick Entry"
        open={true}
        onCancel={closeQuickEntryView}
        footer={null}
        width={800}
      >
        <Tabs activeKey={currentTab} onChange={setCurrentTab}>
          {/* Vitals Tab */}
          <TabPane tab="Vitals" key="vitals">
            <Form
              layout="vertical"
              form={form}
              onFinish={handleFinalSubmit} // Final submit
            >
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
              <Button
                type="primary"
                onClick={() => setCurrentTab("testResults")}
              >
                Next
              </Button>
            </Form>
          </TabPane>

          {/* Test Results Tab */}
          <TabPane tab="Test Results" key="testResults">
            <Form layout="vertical" form={form} onFinish={handleFinalSubmit}>
              <Row gutter={16}>
                {resultsList.map((result: any) => (
                  <Col span={12} key={result.id}>
                    <Form.Item
                      label={`${result.displayName} (${result.measurement})`}
                      name={result.shortCode}
                      rules={[
                        {
                          required: true,
                          message: `Please enter ${result.displayName.toLowerCase()}`,
                        },
                      ]}
                    >
                      <Input placeholder={`Enter ${result.displayName}`} />
                    </Form.Item>
                  </Col>
                ))}
              </Row>
              <Button type="primary" htmlType="submit">
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
