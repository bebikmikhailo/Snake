import { AuthManager } from "./AuthManager.js";
import { MenuManager } from "./MenuManager.js";

export class HUD {
    constructor(game) {
        this.game = game;
        this.authManager = new AuthManager(this);
        this.menuManager = new MenuManager(this, this.game);
        
        this.hudBarScore = document.querySelector(".js-hud-bar-score");
    }

    draw(context) {
        this.hudBarScore.textContent = String(this.game.score);
    }

    displayMenu() {
        this.menuManager.displayMenu();
    }

    hideMenu() {
        this.menuManager.hideMenu();
    }
}