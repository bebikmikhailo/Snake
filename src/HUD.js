export class HUD {
    constructor(game) {
        this.game = game;

    }

    draw(context) {
        const score = document.querySelector(".score");
        score.textContent = String(this.game.score);
    }
}