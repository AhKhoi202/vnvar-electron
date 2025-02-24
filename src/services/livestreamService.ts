// src/services/livestreamService.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1/livestream";

export const livestreamService = {
    async startLivestream(rtspUrl: string, streamKey: string, showOverlay: boolean) {
        try {
            const response = await axios.post(`${API_BASE_URL}/start`, {
                rtspUrl,
                streamKey,
                showOverlay,
            });
            return response.data;
        } catch (error) {
            console.error("Error starting livestream:", error);
            throw error;
        }
    },

    async generateScoreboard(player1: string, player2: string, score1: number, score2: number, gameRules: string) {
        try {
            const response = await axios.post(`${API_BASE_URL}/generate-scoreboard`, {
                player1,
                score1,
                gameRules,
                score2,
                player2,
            });
            return response.data;
        } catch (error) {
            console.error("Error generating scoreboard:", error);
            throw error;
        }
    },

    async stopLivestream() {
        try {
            const response = await axios.post(`${API_BASE_URL}/stop`);
            return response.data;
        } catch (error) {
            console.error("Error stopping livestream:", error);
            throw error;
        }
    }
};
