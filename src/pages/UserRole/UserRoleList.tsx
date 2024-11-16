import { Button, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserRole.css";
const UserRoleList: React.FC = () => {
  const [userRoles, setUserRoles] = useState([]);
  const columns: any = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User Role",
      dataIndex: "userRole",
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
    getAllUserRoles();
  }, []);
  const getAllUserRoles = async () => {
    try {
      const res: any = await axios.get("http://localhost:3000/user-roles");
      setUserRoles(res?.data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="">
      <div className="header-content">
        <div>
          <h2>User Roles</h2>
        </div>
        <div className="">
          <Button type="primary">
            <Link to="/adduserrole">Add User Role</Link>
          </Button>
        </div>
      </div>
      <div className="">
        <Table pagination={false} columns={columns} dataSource={userRoles} />
      </div>
    </div>
  );
};

export default UserRoleList;
