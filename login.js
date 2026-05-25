// LOGIN FORM

const loginForm = document.querySelector("form");

const passwordInput = document.querySelector(".password-field input");

const eyeIcon = document.querySelector(".password-field span");

/* SHOW / HIDE PASSWORD */

eyeIcon.addEventListener("click", () => {

    if(passwordInput.type === "password"){

        passwordInput.type = "text";

        eyeIcon.textContent = "🙈";
    }

    else{

        passwordInput.type = "password";

        eyeIcon.textContent = "👁";
    }

});

/* FORM VALIDATION */

loginForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const email = document.querySelector('input[type="email"]').value;

    const password = passwordInput.value;

    if(email === "" || password === ""){

        alert("Please fill all fields!");

        return;
    }

    alert("Login Successful 🎉");

    loginForm.reset();

});