import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import "./DoctorList.css";
import { Link } from "react-router-dom";
import axios from "axios";
const DoctorsList: React.FC = () => {
  const [doctorlist, setDoctorslist] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
    },
    {
      title: "DOB",
      dataIndex: "dateOfBirth",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
    },
    {
      title: "Experience",
      dataIndex: "experience",
    },
    {
      title: "Qualifications",
      dataIndex: "qualifications",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  useEffect(() => {
    getAllDoctors();
  }, []);
  const getAllDoctors = async () => {
    try {
      const res: any = await axios.get(
        "http://localhost:3000/users/getalldoctors"
      );
      setDoctorslist(res?.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="doctorlist-container">
      <div className="doctorlist-header">
        <div className="">
          <h2>Doctors List</h2>
        </div>
        <div className="">
          <Button type="primary">
            <Link to="/adddoctor" type="primary">
              Add Doctor
            </Link>
          </Button>
        </div>
      </div>
      <div className="">
        <Table
          dataSource={doctorlist}
          columns={columns}
          pagination={false}
        ></Table>
      </div>
    </div>
  );
};

export default DoctorsList;
