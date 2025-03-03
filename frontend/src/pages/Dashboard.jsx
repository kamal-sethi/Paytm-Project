import React from "react";
import AddBar from "../components/AddBar";
import Balance from "../components/Balance";
import Users from "../components/Users";

const Dashboard = () => {
  return (
    <>
      <AddBar />
      <Balance label={"5000"} />
      <Users />
    </>
  );
};

export default Dashboard;
