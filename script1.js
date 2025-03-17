document.addEventListener("DOMContentLoaded", function () {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    if (signUpButton && signInButton && container) {
        signUpButton.addEventListener("click", () => {
            console.log("Switching to Sign-Up"); // Debugging log
            container.classList.add("left-panel-active");
        });

        signInButton.addEventListener("click", () => {
            console.log("Switching to Sign-In"); // Debugging log
            container.classList.remove("right-panel-active");
        });
    } else {
        console.error("One or more elements not found!");
    }
});

// Sign-Up Validation
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

// Sign-In Validation
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
    window.location.href = "https://demo.thingsboard.io/account/profile";
}

// Validate Email or Phone
function validateEmailOrPhone(input) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[0-9]{10}$/;
    return emailPattern.test(input) || phonePattern.test(input);
}
// After successful login
// Retrieve the logged-in user's email from localStorage
let userEmail = localStorage.getItem("userEmail");
let userName = localStorage.getItem("userName"); // If you store names

if (userEmail) {
    window.parent.postMessage({ name: userName, email: userEmail }, "http://127.0.0.1:5503");
}

















<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Double Slider Sign in/up Form</title>
  <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css'>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>

<div class="container" id="container">
    <!-- Sign Up Form -->
    <div class="form-container sign-up-container">
        <form action="#" onsubmit="return validateSignUp(event)">
            <h1>Create Account</h1>
            <div class="social-container">
                <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email or phone number for registration</span>
            <input type="text" id="name" placeholder="Name" required />
            <input type="text" id="signup-email-phone" placeholder="Email or Phone Number" required />
            <span id="signup-email-phone-error" style="color: red;"></span>
            <input type="password" id="signup-password" placeholder="Password" required />
            <input type="password" id="signup-confirm-password" placeholder="Confirm Password" required />
            <span id="signup-error-message" style="color: red;"></span>
            <button type="submit">Sign Up</button>
        </form>
    </div>

    <!-- Sign In Form -->
    <div class="form-container sign-in-container">
        <form action="#" onsubmit="return validateSignIn(event)">
            <h1>Sign in</h1>
            <div class="social-container">
                <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input type="text" id="signin-email-phone" placeholder="Email or Phone Number" required />
            <span id="signin-error" style="color: red;"></span>
            <input type="password" id="signin-password" placeholder="Password" required />
            <span id="signin-password-error" style="color: red;"></span>
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
        </form>
    </div>

    <div class="overlay-container">
        <div class="overlay">
            <div class="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>Optimize, monitor, and take control of your energy usage</p>
                <button class="ghost" id="signIn">Sign In</button>
            </div>
            <div class="overlay-panel overlay-right">
                <h1>Get Started!</h1>
                <p>Configure your system for intelligent energy management</p>
                <button class="ghost" id="signUp">Sign Up</button>
            </div
        </div>
    </div>
</div>

<script src="./script1.js"></script>
</body>
</html>
