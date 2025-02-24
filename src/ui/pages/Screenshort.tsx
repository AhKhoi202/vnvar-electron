import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";

const Screenshort = () => {
  const captureRef = useRef(null);
  const [content, setContent] = useState({
    left: "player 1",
    score1: "0",
    score2: "0",
    title: "RACE TO 11",
    right: "player2",
  });


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#111",
      }}
    >
      <div
        ref={captureRef}
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            color: "white",
            fontSize: "40px",
            fontWeight: "bold",
            padding: "20px",
            width: "800px",
          }}
        >
          {content.left}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "orange",
            color: "white",
            fontSize: "40px",
            fontWeight: "bold",
            padding: "20px",
            width: "100px",
          }}
        >
          {content.score1}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            color: "white",
            fontSize: "40px",
            fontWeight: "bold",
            padding: "20px",
            width: "320px",
          }}
        >
          {content.title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "orange",
            color: "white",
            fontSize: "40px",
            fontWeight: "bold",
            padding: "20px",
            width: "100px",
          }}
        >
          {content.score2}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            color: "white",
            fontSize: "40px",
            fontWeight: "bold",
            padding: "20px",
            width: "800px",
          }}
        >
          {content.right}
        </div>
      </div>
    </div>
  );
};

export default Screenshort;
