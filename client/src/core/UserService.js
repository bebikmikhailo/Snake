import { CONFIG } from "../config.js";

export class UserService {
    constructor(game) {
        this.game = game;
    }

    async getBestScore() {
        const token = localStorage.getItem("token");
        const response = await fetch(`${CONFIG.API_BASE_URL}/api/user/best-score`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const result = await response.json()
            return result.bestScore;
        } else {
            console.log("Error retrieving data from the server");
        }
    }

    async setBestScore(bestScore) {
        const token = localStorage.getItem("token");
        const response = await fetch(`${CONFIG.API_BASE_URL}/api/user/best-score`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ bestScore })
        });

        if (!response.ok) {
            console.log("Error saving data on the server");
        }
    }
}