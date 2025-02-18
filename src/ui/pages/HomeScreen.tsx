import React from "react";
import RTSPInput from "../components/RTSPInput";

const HomeScreen: React.FC = () => {
  return (
    <main className="">
      <h1>VNVAR Live</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RTSPInput />
      </div>
    </main>
  );
};

export default HomeScreen;
