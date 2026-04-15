export class HUD {
    constructor(game) {
        this.game = game;
        this.restartMenu = document.querySelector(".js-hud-menu");
        this.globalOverlay = document.querySelector(".js-global-overlay");
        this.menuScore = document.querySelector(".menu-score");       

        document.querySelector(".js-menu-play-button").addEventListener("click", () => {
            this.hideMenu();
            if (this.game.isGameEnding == false) {
                this.game.start();
            } else {
                this.game.restart();
            }
        });



    }

    draw(context) {
        const hudBarScore = document.querySelector(".js-hud-bar-score");
        hudBarScore.textContent = String(this.game.score);
    }


    displayMenu() {
        this.menuScore.textContent = String(this.game.score);
        this.globalOverlay.style.display = "block";
        setTimeout(() => {
            this.restartMenu.style.display = "grid";    
        }, 100);
    }

    hideMenu() {
        this.menuScore.textContent = "0";
        this.restartMenu.style.display = "none";
        this.globalOverlay.style.display = "none";
    }

}