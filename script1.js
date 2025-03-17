// Function to check if user is logged in before sending data
function checkLoginStatus() {
    let userEmail = localStorage.getItem("userEmail");
    let userName = localStorage.getItem("userName");
    let isLoggedIn = localStorage.getItem("isLoggedIn"); // Check login status

    if (userEmail && isLoggedIn === "true") {
        window.parent.postMessage({ name: userName, email: userEmail }, "http://127.0.0.1:5503");
    }
}

document.addEventListener("DOMContentLoaded", function () { 
    console.log("Script Loaded Successfully"); // Debugging log

    // Ensure elements exist before accessing them
    function getElement(id) {
        let element = document.getElementById(id);
        if (!element) console.warn(`Element with ID '${id}' not found.`);
        return element;
    }

    const loginButton = getElement('loginButton');  
    const userInfo = getElement('userInfo');  

    if (loginButton) {  
        loginButton.addEventListener("click", openLoginPopup);  
    }  

    if (userInfo) {  
        userInfo.innerHTML = "";  
    }  

    // Switch Between Sign-Up and Sign-In Panels
    const signUpButton = getElement("signUp");
    const signInButton = getElement("signIn");
    const container = getElement("container");

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

    // Sign-Up Validation
    function validateSignUp(event) {
        event.preventDefault();

        let name = getElement("name").value.trim();
        let emailOrPhone = getElement("signup-email-phone").value.trim();
        let password = getElement("signup-password").value.trim();
        let confirmPassword = getElement("signup-confirm-password").value.trim();
        
        let errorMessage = getElement("signup-error-message");
        let emailError = getElement("signup-email-phone-error");

        let valid = true;

        if (emailError) emailError.textContent = "";
        if (errorMessage) errorMessage.textContent = "";

        if (name === "") {
            if (errorMessage) errorMessage.textContent = "Name cannot be empty!";
            valid = false;
        }

        if (!validateEmailOrPhone(emailOrPhone)) {
            if (emailError) emailError.textContent = "Enter a valid email or phone number!";
            valid = false;
        }

        if (password !== confirmPassword) {
            if (errorMessage) errorMessage.textContent = "Passwords do not match!";
            valid = false;
        }

        if (valid) {
            localStorage.setItem("userName", name);
            localStorage.setItem("userEmail", emailOrPhone);
            localStorage.setItem("userPassword", password);
            localStorage.setItem("isLoggedIn", "true");

            alert("Sign-up successful! You can now sign in.");
            container.classList.remove("right-panel-active"); // Switch to Sign-In panel
        }
    }

    // Sign-In Validation
    function validateSignIn(event) {
        event.preventDefault();

        let emailOrPhone = getElement("signin-email-phone").value.trim();
        let password = getElement("signin-password").value.trim();
        let signinError = getElement("signin-error");

        if (signinError) signinError.textContent = "";

        let storedEmail = localStorage.getItem("userEmail");
        let storedPassword = localStorage.getItem("userPassword");

        if (!validateEmailOrPhone(emailOrPhone)) {
            if (signinError) signinError.textContent = "Enter a valid email or phone number!";
            return;
        }

        if (!storedEmail || !storedPassword) {
            if (signinError) signinError.textContent = "No account found. Please sign up first!";
            return;
        }

        if (emailOrPhone !== storedEmail || password !== storedPassword) {
            if (signinError) signinError.textContent = "Invalid email/phone or password!";
            return;
        }

        localStorage.setItem("isLoggedIn", "true");
        alert("Sign-in successful! Redirecting...");
        window.location.href = "https://demo.thingsboard.io/account/profile";
    }

    // Validate Email or Phone
    function validateEmailOrPhone(input) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phonePattern = /^[0-9]{10}$/;
        return emailPattern.test(input) || phonePattern.test(input);
    }

    // After successful login, send user data
    let userEmail = localStorage.getItem("userEmail");
    let userName = localStorage.getItem("userName");
    let isLoggedIn = localStorage.getItem("isLoggedIn");

    if (userEmail && isLoggedIn === "true") {
        window.parent.postMessage({ name: userName, email: userEmail }, "http://127.0.0.1:5503");
    }
});
