import React, { useState } from "react";
import {
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MedicineBoxOutlined,
  BarChartOutlined,
  FileTextOutlined,
  DollarOutlined,
  TeamOutlined,
  UserOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: <Link to="/">Appointment</Link>,
    children: [
      {
        key: "1-1",
        icon: <ProfileOutlined />,
        label: <Link to="/">Appointments</Link>,
      },
      {
        key: "1-2",
        icon: <UserOutlined />,
        label: <Link to="/doctors">Doctors</Link>,
      },
      {
        key: "1-3",
        icon: <UserOutlined />,
        label: <Link to="/timeslots">Doctor TimeSlots</Link>,
      },
      {
        key: "1-4",
        icon: <TeamOutlined />,
        label: <Link to="/patients">Patients</Link>,
      },
      {
        key: "1-5",
        icon: <DollarOutlined />,
        label: <Link to="/patient-billing">Patient Billing</Link>,
      },
    ],
  },
  { key: "2", icon: <DesktopOutlined />, label: <Link to="/emr">EMR</Link> },
  { key: "3", icon: <ContainerOutlined />, label: <Link to="/lab">Lab</Link> },
  {
    key: "4",
    icon: <MedicineBoxOutlined />,
    label: <Link to="/pharmacy">Pharmacy</Link>,
  },
  {
    key: "5",
    icon: <FileTextOutlined />,
    label: <Link to="/out-patient">Out Patient</Link>,
  },
  {
    key: "6",
    icon: <DollarOutlined />,
    label: <Link to="/expenses">Expenses</Link>,
  },
  {
    key: "7",
    icon: <BarChartOutlined />,
    label: <Link to="/reports">Reports</Link>,
  },
  {
    key: "8",
    icon: <BarChartOutlined />,
    label: <Link to="/userrole">Master</Link>,
    children: [
      {
        key: "8-1",
        icon: <ProfileOutlined />,
        label: <Link to="/userrole">User Roles</Link>,
      },
      {
        key: "8-2",
        icon: <ProfileOutlined />,
        label: <Link to="/specializations">Specializations</Link>,
      },
    ],
  },
];

interface MenuItemsProps {
  children: React.ReactNode;
}

const MenuItems: React.FC<MenuItemsProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
      <div style={{ marginLeft: 20, flex: 1 }}>{children}</div>
    </div>
  );
};

export default MenuItems;
