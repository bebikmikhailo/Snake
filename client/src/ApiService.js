export class ApiService {
    constructor(game) {
        this.game = game;
    }

    sendScore() {
        fetch("http://localhost:3000/api/score", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ score: this.game.score })
        })
    }
}