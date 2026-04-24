export class MenuManager {
    constructor(hud, game) {
        this.hud = hud;
        this.game = game;
        this.restartMenu = document.querySelector(".js-hud-menu");
        this.globalOverlay = document.querySelector(".js-global-overlay");
        this.authMenu = document.querySelector(".js-auth-menu");
        this.signUpFormWindow = document.querySelector(".js-sign-up-form-window");
        this.menuScore = document.querySelector(".menu-score");
        this.signInForm = document.querySelector(".js-sign-in-form");
        this.signUpForm = document.querySelector(".js-sign-up-form");
        this.signInMessageBlock = document.querySelector(".js-sign-in-message-block");
        this.signUpMessageBlock = document.querySelector(".js-sign-up-message-block");
        this.signUpMessageText = document.querySelector(".js-sign-up-message-block .js-message-text");

        this.initEventListeners();
    }

    initEventListeners() {
        document.querySelector(".js-menu-play-button").addEventListener("click", () => {
            this.hideMenu();
            this.game.isGameEnding ? this.game.restart() : this.game.start();
        });

        document.querySelector(".js-menu-sign-in-button").addEventListener("click", () => {
            this.authMenu.style.display = "block";
        });

        document.querySelector(".js-sign-in-back-button").addEventListener("click", () => {
            this.hideSignInForm();
        });

        document.querySelector(".js-create-acc-ref").addEventListener("click", () => {
            this.hideSignInMessageBlock();
            this.signUpFormWindow.style.display = "block";
        });

        document.querySelector(".js-sign-up-back-button").addEventListener("click", () => {
            this.hideSignUpForm();
        });

        document.querySelector(".js-sign-in-ref").addEventListener("click", () => {
            this.hideSignUpForm()
        });

        document.querySelector(".js-sign-in-close-message-button").addEventListener("click", () => {
            this.signInMessageBlock.style.display = "none";
        });

        document.querySelector(".js-sign-up-close-message-button").addEventListener("click", () => {
            this.signUpMessageBlock.style.display = "none";
        });
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

    hideSignInForm() {
        this.signInForm.reset();
        this.authMenu.style.display = "none";
        this.hideSignInMessageBlock();
    }

    hideSignUpForm() {
        this.signUpFormWindow.style.display = "none";
        this.hideSignUpMessageBlock();
    }

    displaySignInMessageBlock(message, type) {
        this.signInMessageBlock.textContent = message;

        if (type === "error" && !this.signInMessageBlock.classList.contains("error")) {
            this.signInMessageBlock.classList.replace("message", "error");
        } else if (type == "message" && !this.signInMessageBlock.classList.contains("message")) {
            this.signInMessageBlock.classList.replace("error", "message");
        }

        this.signInMessageBlock.style.display = "block";
    }

    hideSignInMessageBlock() {
        this.signInMessageBlock.style.display = "none";
    }

    displaySignUpMessageBlock(message, type) {
        this.signUpMessageText.textContent = message;

        if (type === "error" && !this.signUpMessageBlock.classList.contains("error")) {
            this.signUpMessageBlock.classList.replace("message", "error");
        } else if (type == "message" && !this.signUpMessageBlock.classList.contains("message")) {
            this.signUpMessageBlock.classList.replace("error", "message");
        }

        this.signUpMessageBlock.style.display = "block";
    }

    hideSignUpMessageBlock() {
        this.signUpMessageBlock.style.display = "none";
    }
}