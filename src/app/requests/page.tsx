import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import LoginAndLibrary from "../LoginAndLibrary"
import MyRequestClient from "./MyRequestsClient"

const DataRequestsPanel = () => {

  return (
    <>
      <Header />
      <MyRequestClient />
    </>
  );
};

export default DataRequestsPanel;
