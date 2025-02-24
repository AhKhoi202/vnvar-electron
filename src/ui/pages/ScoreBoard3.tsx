import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";

const ScoreBoard3 = () => {
  const captureRef = useRef(null);
  const [gameData, setGameData] = useState({
    "gameRules": "Pickleball",
    "players": [
      { "name": "HOÀNG SAO HỎA CÓ TÓC RẤT NGẮN", "score": 10 },
      { "name": "Player 2", "score": 5 },
      { "name": "Player 3", "score": 3 },
      { "name": "Player 4", "score": 2 }
    ]
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        ref={captureRef}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "60px",
            fontWeight: "bold",
            padding: "20px",
          }}
        >
          {gameData.gameRules}
        </div>
        <div 
          style={{ 
            display: "flex", 
            flexDirection: "column",
            alignItems: "stretch" // Ensures children stretch to match widest element
          }}
        >
          {gameData.players.map((player, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  backgroundColor: "#59a0d6",
                  color: "white",
                  fontSize: "40px",
                  fontWeight: "bold",
                  padding: "20px",
                  minWidth: "300px", // Minimum width of 300px
                  display: "inline-block", // Allows natural width based on content
                  textAlign: "left",
                  flexGrow: 1 // Allows it to stretch to match widest sibling
                }}
              >
                {player.name}
              </span>
              <span
                style={{
                  backgroundColor: "#17375e",
                  color: "white",
                  fontSize: "40px",
                  fontWeight: "bold",
                  padding: "20px",
                  width: "100px",
                  height: "100px",
                  textAlign: "center",
                }}
              >
                {player.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard3;