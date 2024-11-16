import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Appointments from "./pages/Appointments/Appointments";
import MenuItems from "./layout/MenuLayout";
import DoctorsList from "./pages/Doctors/DoctorsList";
import AddDoctor from "./pages/Doctors/AddDoctor";
import UserRoleList from "./pages/UserRole/UserRoleList";
import AddUserRole from "./pages/UserRole/AddUserRole";
import Specialization from "./pages/Specializations/Specialization";
import Timeslots from "./pages/Timeslots/Timeslots";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MenuItems>
                <Appointments />
              </MenuItems>
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <MenuItems>
                <DoctorsList />
              </MenuItems>
            </ProtectedRoute>
          }
        />
        <Route
          path="/adddoctor"
          element={
            <ProtectedRoute>
              <MenuItems>
                <AddDoctor />
              </MenuItems>
            </ProtectedRoute>
          }
        />
        <Route
          path="/userrole"
          element={
            <ProtectedRoute>
              <MenuItems>
                <UserRoleList />
              </MenuItems>
            </ProtectedRoute>
          }
        />
        <Route
          path="/adduserrole"
          element={
            <ProtectedRoute>
              <MenuItems>
                <AddUserRole />
              </MenuItems>
            </ProtectedRoute>
          }
        />
        <Route
          path="/specializations"
          element={
            <ProtectedRoute>
              <MenuItems>
                <Specialization />
              </MenuItems>
            </ProtectedRoute>
          }
        />
        <Route
          path="/timeslots"
          element={
            <ProtectedRoute>
              <MenuItems>
                <Timeslots />
              </MenuItems>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
