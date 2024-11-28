import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tooltip } from "antd";
import React, { useState } from "react";
import AddVitals from "./AddVital";

const MasterVitals: React.FC = () => {
  const [vitalsData, setVitalsData] = useState([
    {
      id: 1,
      name: "body_temperature",
      shortcode: "BT",
      displayname: "Body Temperature",
      measurement: "Celsius (°C) / Fahrenheit (°F)",
      description: "Monitors fever, infection, or hypothermia.",
    },
    {
      id: 2,
      name: "heart_rate",
      shortcode: "HR",
      displayname: "Heart Rate",
      measurement: "Beats Per Minute (BPM)",
      description: "Tracks the number of heartbeats per minute.",
    },
    {
      id: 3,
      name: "blood_pressure",
      shortcode: "BP",
      displayname: "Blood Pressure",
      measurement: "mmHg",
      description: "Recorded as systolic/diastolic, e.g., 120/80.",
    },
    {
      id: 4,
      name: "respiratory_rate",
      shortcode: "RR",
      displayname: "Respiratory Rate",
      measurement: "Breaths Per Minute (RPM)",
      description: "Counts breaths to assess respiratory function.",
    },
    {
      id: 5,
      name: "oxygen_saturation",
      shortcode: "SpO2",
      displayname: "Oxygen Saturation",
      measurement: "Percentage (%)",
      description: "Tracks oxygen levels in the blood.",
    },
    // Add more rows as needed
  ]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Shortcode",
      dataIndex: "shortcode",
      key: "shortcode",
    },
    {
      title: "Display Name",
      dataIndex: "displayname",
      key: "displayname",
    },
    {
      title: "Measurement",
      dataIndex: "measurement",
      key: "measurement",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      render: (item: any) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              // onClick={() => handleEdit(item?.id)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Delete Doctor"
              description="Are you sure to delete this Doctor?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              // onConfirm={() => handleDelete(item?.id)}
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div
        className=""
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginInline: "1rem",
        }}
      >
        <div className="">
          <h3>Vitals</h3>
        </div>
        <div className="">
          <Button type="primary">+&nbsp;Add Vitals</Button>
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={vitalsData} rowKey="id" />
      </div>
      {false && <AddVitals />}
    </>
  );
};

export default MasterVitals;
