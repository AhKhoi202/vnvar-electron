import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { livestreamService } from "../../services/livestreamService";

const LiveScreen: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const rtspUrl = queryParams.get("rtsp");

  const [streamKey, setStreamKey] = useState("");
  const [player1, setPlayer1] = useState("PLAYER 1");
  const [player2, setPlayer2] = useState("PLAYER 2");
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [gameRules, setGameRules] = useState("RATE TO 11");
  const [isLive, setIsLive] = useState(false);
  const [message, setMessage] = useState("");
  const [showOverlay, setShowOverlay] = useState(false); // Thêm state để theo dõi checkbox
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isLive) {
        handleStopLiveStream();
        // Hiển thị hộp thoại xác nhận trước khi rời trang
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isLive]);

  // Handle navigation away from page
  useEffect(() => {
    return () => {
      handleStopLiveStream();
    };
  }, []);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      handleStopLiveStream();
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isLive]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStartLiveStream = async () => {
    console.log("Bắt đầu live");
    if (!rtspUrl || !streamKey) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    try {
      await livestreamService.startLivestream(rtspUrl, streamKey, showOverlay);
      setMessage("Live stream đã bắt đầu");
      setIsLive(true);
      if (showOverlay) {
        await handleUpdateScoreboard();
      }
    } catch (error) {
      console.error("Lỗi khi bắt đầu livestream", error);
      setMessage("Lỗi khi bắt đầu livestream");
    }
  };

  const handleUpdateScoreboard = async () => {
    console.log("Cập nhật tỉ số");
    try {
      await livestreamService.generateScoreboard(
        player1,
        player2,
        score1,
        score2,
        gameRules
      );
      setMessage("Tỉ số đã được cập nhật");
    } catch (error) {
      console.error("Lỗi khi cập nhật tỉ số", error);
      setMessage("Lỗi khi cập nhật tỉ số");
    }
  };

  const handleStopLiveStream = async () => {
    try {
      await livestreamService.stopLivestream();
      setIsLive(false);
      setMessage("Live stream đã dừng");
    } catch (error) {
      console.error("Lỗi khi dừng livestream:", error);
      setMessage("Lỗi khi dừng livestream");
    }
  };

  if (!rtspUrl) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        Không tìm thấy URL RTSP.
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
    <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}>RTSP Stream</h2>
    <p style={{ fontSize: "18px", color: "#555" }}>Đang phát: {rtspUrl}</p>
    <p style={{ fontSize: "16px", color: "#777" }}>Thời gian hiện tại: {currentTime}</p>
    {message && <p style={{ color: "#e74c3c" }}>{message}</p>}
  
    {!isLive && (
      <>
        <label style={{ fontSize: "16px", color: "#333" }}>
          <input
            type="checkbox"
            checked={showOverlay}
            onChange={() => setShowOverlay(!showOverlay)}
            style={{ marginRight: "8px" }}
          />
          Hiển thị tỉ số trên livestream
        </label>
        <br />
      </>
    )}
  
    {showOverlay && (
      <>
        <input
          type="text"
          placeholder="Tên người chơi 1"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "300px",
            margin: "10px 0",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <br />
        <input
          type="number"
          placeholder="Điểm người chơi 1"
          value={score1}
          onChange={(e) => setScore1(Number(e.target.value))}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "300px",
            margin: "10px 0",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Tên người chơi 2"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "300px",
            margin: "10px 0",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <br />
        <input
          type="number"
          placeholder="Điểm người chơi 2"
          value={score2}
          onChange={(e) => setScore2(Number(e.target.value))}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "300px",
            margin: "10px 0",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Luật chơi"
          value={gameRules}
          onChange={(e) => setGameRules(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "300px",
            margin: "10px 0",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <br />
      </>
    )}
  
    {!isLive && (
      <>
        <input
          type="text"
          placeholder="Stream Key"
          value={streamKey}
          onChange={(e) => setStreamKey(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "300px",
            margin: "10px 0",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
        <br />
        <button
          onClick={handleStartLiveStream}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          Bắt đầu Live Stream
        </button>
      </>
    )}
  
    {isLive && (
      <>
        <button
          onClick={handleUpdateScoreboard}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          Cập nhật
        </button>
        <br />
        <button
          onClick={handleStopLiveStream}
          style={{
            padding: "10px 20px",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            marginLeft: "10px",
            transition: "background-color 0.3s ease",
          }}
        >
          Dừng Live Stream
        </button>
      </>
    )}
  </div>
  )
};

export default LiveScreen;
