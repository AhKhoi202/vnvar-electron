import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const RTSPPlayer: React.FC = () => {
  const [rtspUrl, setRtspUrl] = useState("");
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (rtspUrl.trim() !== "" && rtspUrl.startsWith("rtsp://")) {
      navigate(`/liveScreenws?rtsp=${encodeURIComponent(rtspUrl)}`);
    }
    else {
      throw new Error("Not support RTSP link")
    }
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <label htmlFor="rtsp-input">Nhập URL RTSP</label>
      <input
        id="rtsp-input"
        type="text"
        placeholder="rtsp://your-camera-url"
        value={rtspUrl}
        onChange={(e) => setRtspUrl(e.target.value)}
        style={{ width: "300px", padding: "5px" }}
      />
      <button onClick={handleConfirm} style={{ marginLeft: "10px" }}>
        Xác nhận
      </button>
    </div>
  );
};

export default RTSPPlayer;
