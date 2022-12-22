import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import EditLicenseMain from "./../components/licenses/EditLicenseMain";

const LicenseEditScreen = ({ match }) => {
  const licenseId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditLicenseMain licenseId={licenseId} />
      </main>
    </>
  );
};
export default LicenseEditScreen;
