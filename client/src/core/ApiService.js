import { CONFIG } from "../config.js";

export class ApiService {
    constructor(game) {
        this.game = game;
    }

    sendScore() {
        fetch(`${CONFIG.API_BASE_URL}/api/score`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ score: this.game.score })
        })
    }
}