import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import AddLicenseMain from "./../components/licenses/AddLicenseMain";

const AddLicense = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddLicenseMain />
      </main>
    </>
  );
};

export default AddLicense;
