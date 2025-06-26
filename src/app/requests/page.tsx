import React from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import LoginAndLibrary from "../LoginAndLibrary"
import MyRequestClient from "./MyRequestsClient"

const DataRequestsPanel = () => {
  
  const requests:any = [];

  return (
    <>
      <Header />
      <MyRequestClient requests={requests}/>
    </>
  );
};

export default DataRequestsPanel;
