import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import MainLicenses from "./../components/licenses/MainLicenses";

const LicenseScreen = ({ match }) => {
  const keyword = match.params.keyword;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainLicenses keyword={keyword} />
      </main>
    </>
  );
};

export default LicenseScreen;
