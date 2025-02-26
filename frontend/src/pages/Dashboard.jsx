import React from "react";
import AddBar from "../components/AddBar";
import Balance from "../components/Balance";

const Dashboard = () => {
  return (
    <>
      <AddBar />
      <Balance label={'5000'}/>
    </>
  );
};

export default Dashboard;
