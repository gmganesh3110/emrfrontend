import { Button, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Specialization: React.FC = () => {
  const [specializations, setSpecializations] = useState([]);

  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "userRole",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
  ];
  useEffect(() => {
    getAllSpecilizations();
  }, []);
  const getAllSpecilizations = async () => {
    try {
      const res: any = await axios.get("http://localhost:3000/specializations");
      setSpecializations(res?.data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="header-content">
        <div className="">
          <h2>Specializations</h2>
        </div>
        <Button type="primary">
          <Link to="/addspecialization">Add Specialization</Link>
        </Button>
      </div>
      <div className="">
        <Table
          dataSource={specializations}
          columns={columns}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default Specialization;
