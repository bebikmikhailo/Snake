export class AccountMenuManager {
    constructor(hud) {
        this.hud = hud;

        this.accountMenu = document.querySelector(".js-account-menu");
        this.initEventListeners();
    }

    initEventListeners() {
        document.querySelector(".js-account-menu-back-button").addEventListener("click", () => {
            this.hideAccMenuAndDisplayMainMenu();
        });


        document.querySelector(".js-account-menu-logout-button").addEventListener("click", () => {
            this.unauthorizeUser();
            this.hideAccMenuAndDisplayMainMenu();
        });
    }

    hideAccountMenu() {
        this.accountMenu.style.display = "none";
    }

    hideAccMenuAndDisplayMainMenu() {
        this.hideAccountMenu();
        this.hud.menuManager.displayMenu();
    }

    unauthorizeUser() {
        localStorage.removeItem("token");
        localStorage.removeItem("bestScore");
        this.hud.menuManager.setUserInfo();
        this.hud.loadReguralAndBestScore();
    }
    
}