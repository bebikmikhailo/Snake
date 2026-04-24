import { CONFIG } from "../config.js";

export class AuthManager {
    constructor(hud) {
        this.hud = hud;
        this.signInForm = document.querySelector(".js-sign-in-form");
        this.signUpForm = document.querySelector(".js-sign-up-form");
        this.initEventListeners();
    }


    initEventListeners() {
        this.signInForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(this.signInForm);

            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(`${CONFIG.API_BASE_URL}/api/auth/sign-in`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                });

                console.log(await JSON.parse(response));

            } catch(err) {
                console.log(err);
            }

        });


        this.signUpForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(this.signUpForm);

            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch(`${CONFIG.API_BASE_URL}/api/auth/sign-up`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                });


                let messageType = "message";

                if (!response.ok) {
                    messageType = "error";
                }

                this.hud.menuManager.displaySignInMessageBlock((await response.json()).message, messageType);
                this.signUpForm.reset();
                this.hud.menuManager.hideSignUpForm();

            } catch(err) {
                console.log(err);
                this.hud.menuManager.displaySignUpMessageBlock("Network error. Try again later.", "error");
            }

        });
    }

}