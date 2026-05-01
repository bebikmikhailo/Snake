import { CONFIG } from "../config.js";

export class UserService {
    constructor(game) {
        this.game = game;
    }


    async get(path) {
        const token = localStorage.getItem("token");
        const response = await fetch(`${CONFIG.API_BASE_URL}/api/${path}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const result = await response.json()
            return result;
        } else {
            console.log("Error retrieving data from the server");
        }
    }

    async getWithOutToken(path) {
        const response = await fetch(`${CONFIG.API_BASE_URL}/api/${path}`, {
            method: "GET"
        });

        if (response.ok) {
            const result = await response.json()
            return result;
        } else {
            console.log("Error retrieving data from the server");
        }
    }

    async getBestScore() {
        return (await this.get("user/best-score")).bestScore;
    }

    async getStatistic() {
        return (await this.get("user/statistic")).statistic;
    }

    async getBestPlayersByScore(number) {
        return (await this.getWithOutToken(`users/best-players?number=${number}`)).players;
    }

    
    async post(data, path) {
        const token = localStorage.getItem("token");
        const response = await fetch(`${CONFIG.API_BASE_URL}/api/user/${path}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data })
        });
        
        if (!response.ok) {
            console.log("Error saving data on the server");
        }
    }

    async saveGameResults() {
        const user = await this.getStatistic();
    
        const games_count = user.games_count + 1;
        const total_eaten_food_count = user.total_eaten_food_count + this.game.score;
        const best_score = (this.game.score > user.best_score) ? this.game.score : user.best_score;
    
        const result = {
            games_count,
            total_eaten_food_count,
            best_score
        };
    
        this.post(result, "statistic");
    }
}