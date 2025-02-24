import React from "react";
import RTSPPlayer from "../components/RTSPPlayer";

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
        <RTSPPlayer />
      </div>
    </main>
  );
};

export default HomeScreen;
