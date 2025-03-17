document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById('loginButton');
    const userInfo = document.getElementById('userInfo');

    if (loginButton) {
        loginButton.addEventListener("click", openLoginPopup);
    }

    if (userInfo) {
        userInfo.innerHTML = "";
    }

    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    if (signUpButton && signInButton && container) {
        signUpButton.addEventListener("click", () => {
            console.log("Switching to Sign-Up");
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener("click", () => {
            console.log("Switching to Sign-In");
            container.classList.remove("right-panel-active");
        });
    } else {
        console.error("One or more elements not found!");
    }

    function validateSignUp(event) {
        event.preventDefault();

        let name = document.getElementById("name").value.trim();
        let emailOrPhone = document.getElementById("signup-email-phone").value.trim();
        let password = document.getElementById("signup-password").value.trim();
        let confirmPassword = document.getElementById("signup-confirm-password").value.trim();
        
        let errorMessage = document.getElementById("signup-error-message");
        let emailError = document.getElementById("signup-email-phone-error");

        let valid = true;

        emailError.textContent = "";
        errorMessage.textContent = "";

        if (name === "") {
            errorMessage.textContent = "Name cannot be empty!";
            valid = false;
        }

        if (!validateEmailOrPhone(emailOrPhone)) {
            emailError.textContent = "Enter a valid email or phone number!";
            valid = false;
        }

        if (password !== confirmPassword) {
            errorMessage.textContent = "Passwords do not match!";
            valid = false;
        }

        if (valid) {
            localStorage.setItem("userName", name);
            localStorage.setItem("userEmail", emailOrPhone);
            localStorage.setItem("userPassword", password);

            alert("Sign-up successful! You can now sign in.");
            container.classList.remove("right-panel-active"); // Switch to Sign-In panel
        }
    }

    function validateSignIn(event) {
        event.preventDefault();

        let emailOrPhone = document.getElementById("signin-email-phone").value.trim();
        let password = document.getElementById("signin-password").value.trim();
        let signinError = document.getElementById("signin-error");

        signinError.textContent = "";

        let storedEmail = localStorage.getItem("userEmail");
        let storedPassword = localStorage.getItem("userPassword");

        if (!validateEmailOrPhone(emailOrPhone)) {
            signinError.textContent = "Enter a valid email or phone number!";
            return;
        }

        if (!storedEmail || !storedPassword) {
            signinError.textContent = "No account found. Please sign up first!";
            return;
        }

        if (emailOrPhone !== storedEmail || password !== storedPassword) {
            signinError.textContent = "Invalid email/phone or password!";
            return;
        }

        alert("Sign-in successful! Redirecting...");
        
        // Send login data to the main page
        window.opener.postMessage({ name: localStorage.getItem("userName"), email: emailOrPhone }, "http://127.0.0.1:5500");
        
        // Close login page
        window.close();
    }

    function validateEmailOrPhone(input) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phonePattern = /^[0-9]{10}$/;
        return emailPattern.test(input) || phonePattern.test(input);
    }
});
