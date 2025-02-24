import { WebSocketPayload } from "../ui/pages/LiveScreenWS";

interface WebSocketResponse {
  type: "startStream" | "generateScoreBoard" | "stopStream";
  status: "success" | "error";
  error?: string;
}

class WebSocketClient {
  private ws: WebSocket | null = null;
  private static instance: WebSocketClient;

  private constructor() {
    this.connect();
  }

  public static getInstance(): WebSocketClient {
    if (!WebSocketClient.instance) {
      WebSocketClient.instance = new WebSocketClient();
    }
    return WebSocketClient.instance;
  }

  private connect() {
    this.ws = new WebSocket("ws://localhost:5000");

    this.ws.onopen = () => {
      console.log("WebSocket connected");
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.ws.onclose = () => {
      console.log("WebSocket disconnected");
    };
  }

  public onMessage(callback: (data: WebSocketResponse) => void) {
    if (this.ws) {
      this.ws.onmessage = (event) => {
        const response: WebSocketResponse = JSON.parse(event.data);
        callback(response);
      };
    }
  }

  public sendMessage(message: WebSocketPayload) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn("WebSocket chưa sẵn sàng");
    }
  }

  public close() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
    }
  }

  public isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

export const wsClient = WebSocketClient.getInstance();