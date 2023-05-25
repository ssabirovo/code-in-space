import React from "react";
import Navbar from "../../components/navbar/navbar";
import Frame from "../../components/frame/frame";
// import cls from "./workshop.module.scss";

interface WorkshopProps {}

const Workshop: React.FC<WorkshopProps> = () => {
  return (
    <>
      <Navbar />
      <Frame />
    </>
  );
};

export default Workshop;
