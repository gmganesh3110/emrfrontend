import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Appointments from "./pages/Appointments/Appointments";
import MenuItems from "./layout/MenuLayout";
import DoctorsList from "./pages/Doctors/DoctorsList";
import AddDoctor from "./pages/Doctors/AddDoctor";
import UserRoleList from "./pages/UserRole/UserRoleList";
import AddUserRole from "./pages/UserRole/AddUserRole";
import Specialization from "./pages/Specializations/Specialization";
import AddSpecialization from "./pages/Specializations/AddSpecialization";
import Timeslots from "./pages/Timeslots/Timeslots";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <MenuItems>
              <Appointments />
            </MenuItems>
          }
        />
        <Route
          path="/doctors"
          element={
            <MenuItems>
              <DoctorsList />
            </MenuItems>
          }
        />
        <Route
          path="/adddoctor"
          element={
            <MenuItems>
              <AddDoctor />
            </MenuItems>
          }
        />
        <Route
          path="/userrole"
          element={
            <MenuItems>
              <UserRoleList />
            </MenuItems>
          }
        />
        <Route
          path="/adduserrole"
          element={
            <MenuItems>
              <AddUserRole />
            </MenuItems>
          }
        />
        <Route
          path="/specializations"
          element={
            <MenuItems>
              <Specialization />
            </MenuItems>
          }
        />
        <Route
          path="/addspecialization"
          element={
            <MenuItems>
              <AddSpecialization />
            </MenuItems>
          }
        />
        <Route
          path="/timeslots"
          element={
            <MenuItems>
              <Timeslots />
            </MenuItems>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
