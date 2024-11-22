import React from "react";
import AddPatient from "./AddPatient";

const Patients: React.FC = () => {
  const closeAddEditPatient = () => {};
  return (
    <div>
      <AddPatient closeAddEditPatient={closeAddEditPatient} />
    </div>
  );
};

export default Patients;
