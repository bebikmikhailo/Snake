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

        document.querySelector(".js-menu-sign-in-button").addEventListener("click", () => {
            document.querySelector(".js-auth-menu").style.display = "block";
        });

        document.querySelector(".js-sign-in-back-button").addEventListener("click", () => {
            document.querySelector(".js-auth-menu").style.display = "none";
        });

        document.querySelector(".js-create-acc-ref").addEventListener("click", () => {
            document.querySelector(".js-sign-up-form").style.display = "block";
        })

        document.querySelector(".js-sign-up-back-button").addEventListener("click", () => {
            document.querySelector(".js-sign-up-form").style.display = "none";
        });

        document.querySelector(".js-sign-in-ref").addEventListener("click", () => {
            document.querySelector(".js-sign-up-form").style.display = "none";
        })

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